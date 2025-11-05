export default function DangerFoodCard({ item }) {
  return (
    <div
      className="flex bg-[#FEFDFC] rounded-xl p-3 shadow-sm shadow-black/10 relative cursor-default"
    >
      {/* 이미지 */}
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-md object-cover flex-shrink-0"
      />

      {/* 내용 */}
      <div className="flex flex-col justify-between ml-3 flex-1">
        <div className="flex justify-between items-start">
          <p className="font-medium text-[15px] text-black leading-tight">
            {item.name}
          </p>
          <span className="bg-[#E24E1B] text-white text-[11px] px-2 py-[1px] rounded-md whitespace-nowrap ml-2">
            {item.grade}
          </span>
        </div>

        <p className="text-[13px] text-gray-500 mt-[2px]">{item.company}</p>

        <div className="bg-[#F3F3F3] rounded-md mt-2 px-2 py-[8px] flex items-center justify-center">
          <p className="text-[12px] text-[#D72828] font-medium leading-tight text-center">
            {item.issue}
          </p>
        </div>
      </div>
    </div>
  );
}
