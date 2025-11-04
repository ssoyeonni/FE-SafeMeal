import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipePage from "./pages/RecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import DangerFoodPage from "./pages/DangerFoodPage";
import ShortFormPage from "./pages/ShortFormPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/danger-food" element={<DangerFoodPage />} />
        <Route path="/short-form" element={<ShortFormPage />} />
      </Routes>
    </Router>
  );
}
