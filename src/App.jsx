import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useMemo } from "react";
import RecipeList from "./pages/Recipe/List";
import RecipeDetail from "./pages/Recipe/Detail";
import DangerFoodPage from "./pages/DangerFoodPage";
import ShortFormPage from "./pages/ShortFormPage";
import BottomNav from "./components/BottomNav";
import dangerBlack from "./assets/danger-icon-black.png";
import shortBlack from "./assets/short-icon-black.png";
import recipeBlack from "./assets/recipe-icon-black.png";

function Header() {
  const location = useLocation();

  const headerInfo = useMemo(() => {
    if (location.pathname.startsWith("/danger-food")) {
      return {
        title: "위험식품",
        icon: dangerBlack,
      };
    } else if (location.pathname.startsWith("/short-form")) {
      return {
        title: "숏폼",
        icon: shortBlack,
      };
    } else if (location.pathname.startsWith("/recipe")) {
      return {
        title: "레시피",
        icon: recipeBlack,
      };
    } else {
      return {
        title: "레시피",
        icon: recipeBlack,
      };
    }
  }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 mx-auto w-full max-w-[430px] z-20 bg-light shadow-sm shadow-black/10 
    flex justify-center items-center py-6"
    >
      <div className="flex items-center space-x-2">
        {headerInfo.icon && (
          <img src={headerInfo.icon} alt="icon" className="w-7 h-7" />
        )}
        <span className="text-xl font-medium text-black">
          {headerInfo.title}
        </span>
      </div>
    </header>
  );
}

// Main
function MainContent() {
  const isRecipeDetail = location.pathname.startsWith("/recipe/");

  return (
    <main
      className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-grayBg ${
        isRecipeDetail ? "mt-0 px-0 py-0" : "mt-[72px]"
      } mb-[60px]`}
    >
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/danger-food" element={<DangerFoodPage />} />
        <Route path="/short-form" element={<ShortFormPage />} />
      </Routes>
    </main>
  );
}

export default function App() {
  const location = useLocation();

  // 하단 네비게이션 active 상태 설정
  const activeNav = useMemo(() => {
    if (location.pathname.startsWith("/danger-food")) return "dangerFood";
    if (location.pathname.startsWith("/short-form")) return "shortForm";
    if (location.pathname.startsWith("/recipe")) return "recipe";
    return "recipe";
  }, [location.pathname]);

  return (
    <div
      className="relative min-h-screen bg-grayBg font-['Noto_Sans_KR'] flex flex-col
                  max-w-[430px] mx-auto shadow-xl border border-gray-200"
    >
      <Header />
      <MainContent />
      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px]">
        <BottomNav active={activeNav} />
      </div>
    </div>
  );
}

// Router Provider로 감싸기
export function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}
