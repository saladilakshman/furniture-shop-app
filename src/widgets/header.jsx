import logo from "../assets/logo.png";
import { navLinks } from "../helpers/navlinks";
import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import { Search as Searchbox } from "../widgets/widget";
import "../App.css";
const Header = () => {
  const { state, dispatch } = useContext(ShopContext);
  return (
    <header className="container mx-auto lg:px-24 py-5 px-2">
      <nav className=" flex justify-between items-center">
        <img src={logo} alt="" className=" lg:size-28 size-14 rounded-full" />
        <ul className="flex gap-5 cursor-default max-md:hidden">
          {navLinks.slice(0, 3).map((navlink, index) => {
            return (
              <NavLink
                to={navlink.path}
                key={index}
                className="text-xl nav-item capitalize"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "orange" : "",
                  };
                }}
              >
                {navlink.page}
              </NavLink>
            );
          })}
        </ul>
        <ul className="flex gap-5 cursor-default max-md:hidden">
          {navLinks.slice(3, 5).map((navlink, index) => {
            return (
              <NavLink
                to={navlink.path}
                key={index}
                className="text-xl nav-item capitalize flex"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "orange" : "",
                  };
                }}
              >
                {navlink.page}
                {navlink.hasIcon && (
                  <div className="relative">
                    {navlink.icon}
                    <span
                      className={` text-xs bg-amber-700 text-white text-center w-4  tabular-nums absolute -top-2 left-4  
                        rounded-full ring-1 ring-white transition-opacity ${
                          state?.cartItems.length > 0
                            ? "opacity-1"
                            : "opacity-0"
                        }`}
                    >
                      {state?.cartItems?.length}
                    </span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </ul>
        <button
          className="block float-right lg:hidden text-neutral-500"
          onClick={() => dispatch({ type: "show-app-bar" })}
        >
          <Search size={28} />
        </button>
      </nav>
      <Searchbox />
    </header>
  );
};

export default Header;
