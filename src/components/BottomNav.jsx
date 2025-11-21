import { Link } from "react-router-dom";

import dangerBlack from "../assets/danger-icon-black.png";
import dangerOrange from "../assets/danger-icon-orange.png";
import recipeBlack from "../assets/recipe-icon-black.png";
import recipeOrange from "../assets/recipe-icon-orange.png";
import shortBlack from "../assets/short-icon-black.png";
import shortOrange from "../assets/short-icon-orange.png";

export default function BottomNav({ active }) {
  return (
    <nav className="flex justify-around items-center bg-[#FBFBFB] py-3 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <NavItem
        to="/danger-food"
        src={active === "dangerFood" ? dangerOrange : dangerBlack}
        label="위험 식품"
        active={active === "dangerFood"}
        activeColor="#EB8601"
      />
      <NavItem
        to="/"
        src={active === "recipe" ? recipeOrange : recipeBlack}
        label="레시피"
        active={active === "recipe"}
        activeColor="#EB8601"
      />
      <NavItem
        to="/short-form"
        src={active === "shortForm" ? shortOrange : shortBlack}
        label="숏폼"
        active={active === "shortForm"}
        activeColor="#EB8601"
      />
    </nav>
  );
}

function NavItem({ to, src, label, active, activeColor = "#000000" }) {
  return (
    <Link to={to} className="flex-1 flex flex-col items-center">
      <img src={src} alt={label} className="w-6 h-6" />
      <span
        className="text-[13px] mt-1"
        style={{ color: active ? activeColor : "#000000" }}
      >
        {label}
      </span>
    </Link>
  );
}
