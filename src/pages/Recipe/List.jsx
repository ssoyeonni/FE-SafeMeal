import RecipeCard from "../../components/RecipeCard";
import { recipesList } from "../../data/recipesList";

export default function RecipePage() {
  const baseRecipes = recipesList
  const recipes = Array.from({ length: 10 }, (_, i) =>
    baseRecipes.map((r) => ({
      ...r,
      id: i * baseRecipes.length + r.id,
    }))
  ).flat();

  return (
    <>
      {recipes.map((item) => (
        <RecipeCard key={item.id} item={item} />
      ))}
    </>
  );
}