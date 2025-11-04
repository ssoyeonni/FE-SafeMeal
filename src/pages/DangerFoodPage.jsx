import Layout from "../components/Layout";

export default function DangerFoodPage() {
  return (
    <Layout
      title="위험 식품"
      iconSrc="/src/assets/danger-icon-black.png"
      active="dangerFood"
    >
      <div className="flex justify-center items-center h-full text-gray-500">
        위험 식품 페이지입니다.
      </div>
    </Layout>
  );
}
