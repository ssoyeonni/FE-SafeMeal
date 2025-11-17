import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "../../api/recipeApi";
import {
  getReviews,
  postReview,
  deleteReview,
  updateReview,
} from "../../api/reviewApi";
import backIcon from "../../assets/recipe/back.png";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryColors = {
    밥: "bg-[#BBE491]/50",
    "국&찌개": "bg-[#E491BB]/50",
    반찬: "bg-[#91BBE4]/50",
    디저트: "bg-[#FFD1DC]/50",
  };

  // 리뷰 관련 상태
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getRecipeDetail(id);

        // API → 기존 UI 형태로 변환
        const mapped = {
          ...data,

          // 이미지 매핑
          image: data.imgLarge || data.imgSmall,

          // UI에서 recipe.color를 기대하므로 더미 색상
          color: categoryColors[data.category] || "bg-gray-200",

          // 영양성분 UI에 맞춰 nutrients 객체 생성
          nutrients: {
            열량: `${data.kcal} kcal`,
            탄수화물: `${data.carbohydrate} g`,
            단백질: `${data.protein} g`,
            지방: `${data.fat} g`,
            나트륨: `${data.sodium} mg`,
          },

          // 재료 매핑
          ingredients: data.ingredients.map((i) => ({
            name: i.name,
            buyable: i.linkUrl !== null,
            link: i.linkUrl,
          })),

          // 메뉴얼 → steps로 매핑 (순서 정렬 필수)
          steps: data.manuals
            .sort((a, b) => a.cookOrder - b.cookOrder)
            .map((m) => m.cookMethod),

          // 리뷰는 아직 없으면 빈 배열
          reviews: data.reviews || [],
        };

        setRecipe(mapped);
      } catch (err) {
        console.error("레시피 상세 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // 리뷰 목록 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      if (!recipe) return;

      try {
        const data = await getReviews(id);
        setReviews(data);
      } catch (err) {
        console.error("리뷰 조회 실패:", err);
      }
    };

    fetchReviews();
  }, [recipe, id]);

  // 리뷰 등록
  const handleAddReview = async () => {
    if (!newReview.trim()) return;

    try {
      const created = await postReview(id, userName, newReview);
      setReviews([created, ...reviews]);
      setUserName(""); 
      setNewReview("");
    } catch (err) {
      console.error("리뷰 등록 실패:", err);
    }
  };

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(id, reviewId);
      setReviews(reviews.filter((r) => r.id !== reviewId));
    } catch (err) {
      console.error("리뷰 삭제 실패:", err);
    }
  };

  // 수정 모드 진입
  const handleEditClick = (reviewId, text) => {
    setEditId(reviewId);
    setEditText(text);
  };

  // 리뷰 수정
  const handleEditSave = async (reviewId) => {
    try {
      const updated = await updateReview(id, reviewId, editText);
      setReviews(reviews.map((r) => (r.id === reviewId ? updated : r)));
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">불러오는 중...</div>;
  }

  if (!recipe) {
    return <div className="text-center mt-10">레시피가 없습니다.</div>;
  }

  return (
    <div className="relative min-h-screen bg-grayBg font-['Noto_Sans_KR'] flex flex-col">
      {/* Header (RecipePage와 동일 디자인 + back 버튼 추가) */}
      <header className="fixed top-0 left-0 w-full z-20 bg-light shadow-sm shadow-black/10 flex justify-center items-center py-6">
        {/* Back 아이콘 (왼쪽 상단) */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 flex items-center"
        >
          <img
            src={backIcon} // ← import한 이미지 사용
            alt="back"
            className="w-3 h-4"
          />
        </button>

        {/* 기존 RecipePage와 동일 */}
        <div className="flex items-center space-x-2">
          <img
            src="/src/assets/recipe-icon-black.png"
            alt="recipe"
            className="w-7 h-7"
          />
          <span className="text-xl font-medium text-black">레시피</span>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-grayBg mt-[84px] mb-[72px]">
        <div className="card-base">
          {/* 이미지 */}
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />

          {/* 요리 정보 */}
          <div className="flex items-center space-x-2 mb-2">
            <div
              className={`text-[14px] px-2 py-0.5 rounded-full ${recipe.color} text-black`}
            >
              {recipe.category}
            </div>
            <span className="text-[16px] font-medium text-black">
              {recipe.name}
            </span>
          </div>

          {/* 영양성분 */}
          <section className="mt-4">
            <h2 className="font-medium text-[15px] text-black mb-2">
              [영양성분]
            </h2>
            <hr className="border-[#E5E5E5] mb-2" />
            <ul className="text-[14px] space-y-1">
              {Object.entries(recipe.nutrients).map(([key, value]) => (
                <li key={key} className="flex justify-between text-[#333]">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-500">{value}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 재료 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">[재료]</h2>
            <hr className="border-[#E5E5E5] mb-2" />
            <ol className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="text-[14px] text-black">• {ing.name}</span>
                  {ing.buyable && (
                    <a
                      href={ing.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 border border-gray-300 px-2 py-[2px] rounded-md text-[11px] text-black"
                    >
                      <img
                        src="/src/assets/recipe/cart.png"
                        alt="cart"
                        className="w-3 h-3"
                      />
                      <span>구매</span>
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </section>

          {/* 조리법 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">
              [조리법]
            </h2>
            <hr className="border-[#E5E5E5] mb-2" />
            <ol className="list-decimal pl-4 space-y-2 text-[14px] text-black">
              {recipe.steps.map((step, i) => (
                <p key={i}>{step}</p>
              ))}
            </ol>
          </section>

          {/* 리뷰 작성 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">
              [리뷰 작성]
            </h2>
            <hr className="border-[#E5E5E5] mb-2" />
            
            <input
              type="text"
              placeholder="작성자명"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-32 border border-gray-300 rounded-md p-2 text-[14px] mb-2 focus:outline-none"
            />

            <textarea
              placeholder="리뷰를 입력하세요."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-[14px] h-24 focus:outline-none"
            />
            <button
              onClick={handleAddReview}
              className="w-full mt-2 btn-primary"
            >
              리뷰 등록
            </button>
          </section>

          {/* 리뷰 리스트 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">
              리뷰 ({reviews.length})
            </h2>
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-[#F6F6F6] p-3 rounded-md mb-2 text-[14px]"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-black">{r.userName}</span>
                  <div className="flex space-x-2">
                    <img
                      src="/src/assets/recipe/pencil.png"
                      alt="edit"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleEditClick(r.id, r.text)}
                    />
                    <img
                      src="/src/assets/recipe/trashcan.png"
                      alt="delete"
                      className="w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteReview(r.id)}
                    />
                  </div>
                </div>

                {editId === r.id ? (
                  <>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="input-box h-24"
                    />
                    <button
                      onClick={() => handleEditSave(r.id)}
                      className="w-full mt-2 btn-primary text-[13px]"
                    >
                      수정 완료
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-700">{r.text}</p>
                    <p className="text-gray-400 text-[12px] mt-1">{r.date}</p>
                  </>
                )}
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
