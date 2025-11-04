import RecipeCard from "../components/RecipeCard";
import Layout from "../components/Layout";

export default function RecipePage() {
  const baseRecipes = [
    {
      id: 1,
      category: "밥",
      color: "bg-[#BBE491]/50",
      name: "두부 곤약 나물 비빔밥",
      kcal: 225,
      image: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    },
    {
      id: 2,
      category: "국&찌개",
      color: "bg-[#E491BB]/50",
      name: "표고버섯 청경채국",
      kcal: 45,
      image: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    },
    {
      id: 3,
      category: "반찬",
      color: "bg-[#91BBE4]/50",
      name: "시금치 우유 소스와 그린매쉬드 포테이토",
      kcal: 155,
      image: "https://cdn-icons-png.flaticon.com/512/706/706164.png",
    },
  ];

  const recipes = Array.from({ length: 10 }, (_, i) =>
    baseRecipes.map((r) => ({
      ...r,
      id: i * baseRecipes.length + r.id,
    }))
  ).flat();

  return (
    <Layout
      title="레시피"
      iconSrc="/src/assets/recipe-icon-black.png"
      active="recipe"
    >
      {recipes.map((item) => (
        <RecipeCard key={item.id} item={item} />
      ))}
    </Layout>
  );
}
