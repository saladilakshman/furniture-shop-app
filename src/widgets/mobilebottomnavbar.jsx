import { navLinks } from "../helpers/navlinks";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import "../App.css";
const Mobilebottomnavbar = () => {
  const { state } = useContext(ShopContext);
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-10 lg:hidden">
      <ul className="flex justify-around items-center pt-2">
        {navLinks.map((navlink, index) => {
          return (
            <NavLink
              to={navlink.path}
              key={index}
              className="text-sm nav-item capitalize flex flex-col justify-center items-center gap-1"
              style={({ isActive }) => {
                return {
                  color: isActive ? "orange" : "",
                };
              }}
            >
              <span className="text-zinc-600 relative ">
                {navlink.icon}
                {navlink.hasIcon && (
                  <span
                    className={`bottom-navbar ${
                      state?.cartItems.length > 0 ? "opacity-1" : "opacity-0"
                    }`}
                  >
                    {state?.cartItems?.length}
                  </span>
                )}
              </span>
              {navlink.page}
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
};

export default Mobilebottomnavbar;
