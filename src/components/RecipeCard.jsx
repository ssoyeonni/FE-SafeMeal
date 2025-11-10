import { useNavigate } from "react-router-dom";

export default function RecipeCard({ item }) {
  const navigate = useNavigate();

  const categoryColors = {
    밥: "bg-[#BBE491]/50",
    "국&찌개": "bg-[#E491BB]/50",
    반찬: "bg-[#91BBE4]/50",
    디저트: "bg-[#FFD1DC]/50",
  };

   const colorClass = categoryColors[item.category] || "bg-gray-200";

  return (
    <div
      onClick={() => navigate(`/recipe/${item.id}`)}
      className="flex card-base shadow-sm shadow-black/10 relative cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* 이미지 */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />

      {/* 내용 */}
      <div className="flex flex-col justify-between ml-3 flex-1">
        <div>
          {/* 카테고리별 배경색 지정 */}
          <div
            className={`text-[12px] px-2 py-0.5 rounded-full ${colorClass} w-fit text-black`}
          >
            {item.category}
          </div>

          <p className="mt-1 font-medium text-[15px] text-black leading-tight">
            {item.name}
          </p>
        </div>

        {/* 칼로리 (오른쪽 아래) */}
        <span className="absolute bottom-2 right-3 text-[11px] text-gray-600/80 font-medium">
          {item.kcal} kcal
        </span>
      </div>
    </div>
  );
}
