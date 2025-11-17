import RecipeCard from "../../components/RecipeCard";
import { useEffect, useState } from "react";
import { getRecipeList } from "../../api/recipeApi";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipeList();
        setRecipes(data);
      } catch (err) {
        console.error("레시피 목록 조회 실패:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {recipes.map((item) => (
        <RecipeCard key={item.id} item={item} />
      ))}
    </>
  );
}