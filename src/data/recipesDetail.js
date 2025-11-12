// 더미 데이터
export const recipesDetail  = {
  id: 1,
  category: "밥",
  color: "bg-[#BBE491]/50",
  name: "두부 곤약 나물 비빔밥",
  kcal: 225,
  image: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
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
