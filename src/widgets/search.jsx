import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../App";
import { IndianPrice } from "../utils/priceformat";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../App.css";
const Search = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ShopContext);
  return (
    <>
      {state?.showAppbar && (
        <div className="mobile-search-bar-layout">
          <div className="relative">
            <input
              type="search"
              placeholder="Search the product"
              onChange={(e) => {
                dispatch({
                  type: "mobile-search",
                  payload: e.target.value.toLowerCase(),
                });
              }}
              className="mobile-search-bar-input"
            />
            <button
              className="absolute left-1 top-2 text-zinc-600"
              onClick={() => dispatch({ type: "show-app-bar" })}
            >
              <ArrowLeft />
            </button>
            {state.mobilesearchlist && (
              <ul className="flex flex-col justify-center items-baseline divide-x-2 gap-4 my-5">
                {state.mobilesearchlist.map((listitem) => {
                  return (
                    <li
                      key={listitem.id}
                      className="flex gap-2 border-b-2 border-gray-200 w-full pb-2"
                      onClick={() => {
                        navigate(`/products/${listitem.id}`);
                        dispatch({ type: "show-app-bar" });
                      }}
                    >
                      <LazyLoadImage
                        src={listitem.image}
                        alt=""
                        className="size-14 rounded-md"
                      />
                      <p className="capitalize">
                        {listitem.name}
                        <br />
                        <span className="text-xs text-zinc-600">
                          {IndianPrice(listitem.price)}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
