import { useNavigate, useParams } from "react-router-dom";

export default function RecipeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 더미 데이터
  const recipe = {
    id,
    category: "밥",
    color: "bg-[#BBE491]/50",
    name: "두부 곤약 나물 비빔밥",
    kcal: 225,
    image:
      "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    nutrients: {
      열량: "225 kcal",
      탄수화물: "26 g",
      단백질: "14 g",
      지방: "7 g",
      나트륨: "97 mg",
    },
    ingredients: [
      { name: "두부", buyable: true, link: "https://www.coupang.com" },
      { name: "곤약잡곡밥", buyable: true, link: "https://www.coupang.com" },
      { name: "콩나물", buyable: false },
      { name: "표고버섯", buyable: false },
      { name: "초고추장", buyable: true, link: "https://www.coupang.com" },
      { name: "참기름", buyable: true, link: "https://www.coupang.com" },
    ],
    steps: [
      "고사리는 상태에 따라 2~5시간 정도 불린 후 30분 정도 삶아 찬물에 헹구어 물기를 짠다.",
      "콩나물은 다듬어 끓는 물에 데친 후 건져 식힌다.",
      "불린 표고버섯은 물기를 짜서 채를 썰고, 당근·애호박은 길이 3cm 정도로 썰어 끓는 소금물에 데친다.",
    ],
    reviews: [
      {
        id: 1,
        user: "김소연",
        text: "정말 맛있어요! 집에서 쉽게 만들 수 있어서 좋습니다.",
        date: "2025-10-29",
      },
      {
        id: 2,
        user: "장영웅",
        text: "곤약밥이라서 부담 없이 먹기 좋아요.",
        date: "2025-10-30",
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#F6F6F6] font-['Noto_Sans_KR'] flex flex-col">
      {/* Header (RecipePage와 동일 디자인 + back 버튼 추가) */}
      <header className="fixed top-0 left-0 w-full z-20 bg-[#FEFDFC] shadow-sm shadow-black/10 flex justify-center items-center py-6">
        {/* Back 아이콘 (왼쪽 상단) */}
        <button
          onClick={() => navigate("/")}
          className="absolute left-4 flex items-center"
        >
          <img
            src="/src/assets/recipe/back.png"
            alt="back"
            className="w-5 h-5"
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
      <main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#F6F6F6] mt-[84px] mb-[72px]">
        <div className="bg-[#FEFDFC] rounded-xl p-4 shadow-sm">
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
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span className="text-[14px] text-black">• {ing.name}</span>
                  {ing.buyable && (
                    <a
                      href={ing.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 border border-gray-300 px-2 py-1 rounded-md text-[13px] text-black"
                    >
                      <img
                        src="/src/assets/recipe/cart.png"
                        alt="cart"
                        className="w-4 h-4"
                      />
                      <span>구매</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* 조리법 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">[조리법]</h2>
            <hr className="border-[#E5E5E5] mb-2" />
            <ol className="list-decimal pl-4 space-y-2 text-[14px] text-black">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>

          {/* 리뷰 작성 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">[리뷰 작성]</h2>
            <hr className="border-[#E5E5E5] mb-2" />
            <textarea
              placeholder="리뷰를 입력하세요."
              className="w-full border border-gray-300 rounded-md p-2 text-[14px] h-24 focus:outline-none"
            />
            <button className="w-full mt-2 bg-black text-white py-2 rounded-md text-[14px]">
              리뷰 등록
            </button>
          </section>

          {/* 리뷰 리스트 */}
          <section className="mt-6">
            <h2 className="font-medium text-[15px] text-black mb-2">
              리뷰 ({recipe.reviews.length})
            </h2>
            {recipe.reviews.map((r) => (
              <div
                key={r.id}
                className="bg-[#F6F6F6] p-3 rounded-md mb-2 text-[14px]"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-black">{r.user}</span>
                  <div className="flex space-x-2">
                    <img
                      src="/src/assets/recipe/pencil.png"
                      alt="edit"
                      className="w-4 h-4"
                    />
                    <img
                      src="/src/assets/recipe/trashcan.png"
                      alt="delete"
                      className="w-4 h-4"
                    />
                  </div>
                </div>
                <p className="text-gray-700">{r.text}</p>
                <p className="text-gray-400 text-[12px] mt-1">{r.date}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
