import Layout from "../components/Layout";
import DangerFoodCard from "../components/DangerFoodCard";

export default function DangerFoodPage() {
  // 더미 데이터 (Open API 연결 전)
  const dangerFoods = [
    {
      id: 1,
      name: "후레쉬캔디 초코맛",
      company: "(주)주한산업",
      issue: "리스테리아 모노사이토제네스 검출",
      grade: "1등급",
      image:
        "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    },
    {
      id: 2,
      name: "新매운닭발꼬치",
      company: "(주)그린",
      issue: "보존료(프로피온산) 부적합",
      grade: "2등급",
      image:
        "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    },
  ];

  return (
    <Layout
      title="위험식품"
      iconSrc="/src/assets/danger-icon-black.png"
      active="dangerFood"
    >
      {dangerFoods.map((item) => (
        <DangerFoodCard key={item.id} item={item} />
      ))}
    </Layout>
  );
}
