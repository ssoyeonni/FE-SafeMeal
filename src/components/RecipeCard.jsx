import { useNavigate } from "react-router-dom";

export default function RecipeCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/recipe/${item.id}`)}
      className="flex bg-[#FEFDFC] rounded-xl p-3 shadow-sm shadow-black/10 relative cursor-pointer active:scale-[0.98] transition-transform"
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
          <div
            className={`text-[12px] px-2 py-0.5 rounded-full ${item.color} w-fit text-black`}
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
