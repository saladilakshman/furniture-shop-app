import { Filtersection } from "../widgets/widget";
import { productsList } from "../utils/productslist";
import { SlidersHorizontal } from "lucide-react";
import { Mobiledrawer } from "../widgets/widget";
import "../App.css";
import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../App";
import { Itemcardlayout } from "../widgets/widget";
const Products = () => {
  const sortOptions = ["Sort by", "low to high", "high to low", "A-Z", "Z-A"];
  const { state, dispatch } = useContext(ShopContext);
  const [sortedList, setSortedList] = useState(state?.productslist);
  useEffect(() => {
    const sortItems = document.getElementById("sort");
    sortItems.firstChild.disabled = true;
  }, []);
  /**sorting the products based on select options */
  const sortproducts = (event) => {
    const { value } = event.target;
    if (value === "low to high") {
      setSortedList(() =>
        state?.filteredProducts?.sort((a, b) => a.price - b.price)
      );
    } else if (value === "high to low") {
      setSortedList(() =>
        state?.filteredProducts?.sort((a, b) => b.price - a.price)
      );
    } else if (value === "A-Z") {
      setSortedList(() =>
        state?.filteredProducts?.sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (value === "Z-A") {
      setSortedList(() =>
        state?.filteredProducts?.sort((a, b) => b.name.localeCompare(a.name))
      );
    } else {
      setSortedList(state?.productslist);
    }
    dispatch({ type: "products-filteration", payload: sortedList });
  };
  const [opendialog, setOpendialog] = useState(false);
  const handleclose = () => {
    setOpendialog(false);
  };
  return (
    <>
      <section className="container mx-auto lg:px-24 px-4">
        <button
          className="flex justify-around items-center px-2 py-2 border border-zinc-800 text-zinc-700 text-base lg:hidden rounded-md capitalize gap-2 mb-5"
          onClick={() => {
            setOpendialog(true);
          }}
        >
          <SlidersHorizontal size={18} />
          filter
        </button>
        <div className="grid lg:grid-cols-12 gap-5">
          <div className=" hidden lg:block lg:col-span-3">
            <Filtersection />
          </div>
          <div className="lg:col-span-9">
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-sm lg:text-base text-nowrap">
                {state?.filteredProducts?.length} products available
              </h2>
              <div className="w-full border border-gray-200">{""}</div>
              <select
                id="sort"
                className="border border-zinc-500 rounded-lg px-2 focus:outline-none text-sm"
                onChange={(event) => sortproducts(event)}
                //disabled={state?.productslist.length === 0 ? true : false}
              >
                {sortOptions.map((sortoption, index) => {
                  return (
                    <option key={index} label={sortoption} value={sortoption} />
                  );
                })}
              </select>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-2 py-8 gap-y-5 max-md:mb-12">
              {Array.from(
                state?.filteredProducts,
                ({ id, price, name, image }) => {
                  return (
                    <Itemcardlayout
                      key={id}
                      id={id}
                      price={price}
                      name={name}
                      image={image}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>
      <Mobiledrawer opendialog={opendialog} closedialog={handleclose} />
    </>
  );
};

export default Products;
