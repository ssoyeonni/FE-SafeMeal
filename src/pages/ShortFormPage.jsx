import Layout from "../components/Layout";

export default function ShortFormPage() {
  return (
    <Layout
      title="숏폼"
      iconSrc="/src/assets/short-icon-black.png"
      active="shortForm"
    >
      <div className="flex justify-center items-center h-full text-gray-500">
        숏폼 페이지입니다.
      </div>
    </Layout>
  );
}
