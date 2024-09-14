import { useContext } from "react";
import { ShopContext } from "../App";
import { IndianPrice } from "../utils/priceformat";
const Filtersection = () => {
  const { state, dispatch } = useContext(ShopContext);
  const range = state?.productslist?.map((item) => item.price);
  const categories = [
    "All",
    "office",
    "living room",
    "kitchen",
    "bedroom",
    "dining",
    "kids",
  ];
  const companies = ["all", "ikea", "marcos", "liddy", "caressa"];
  const colortypes = [
    "all",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#000",
    "#ffb900",
  ];
  /**function to fetch the products that has free-shipping facility */
  const getProductswithfreeshipping = () => {
    const shippingcheckbox = document.getElementById("shipping-checkbox");
    if (shippingcheckbox.checked) {
      const freeshippingproducts = state?.productslist?.filter(
        (q) => q.shipping === true
      );
      dispatch({
        type: "products-filteration",
        payload: freeshippingproducts,
      });
    } else {
      dispatch({ type: "products-filteration", payload: state?.productslist });
    }
  };

  /**function to filter the products based on  company-type-selection */
  const getProductsbycompany = (event) => {
    const { value } = event.target;
    dispatch({ type: "product-company", payload: value });
  };

  /**function to filter the products based on price range-selection */
  const getItemsbypricerange = (event) => {
    const { value } = event.target;

    dispatch({ type: "product-pricerange", payload: value });
  };

  /**function to filter the products based on  category */
  const getItemsbycategory = (index, event) => {
    const { textContent } = event.target;
    dispatch({ type: "product-category", payload: { index, textContent } });
  };
  return (
    <form
      className="lg:sticky lg:top-2  flex-col justify-center items-baseline"
      onReset={() => dispatch({ type: "reset-filters" })}
    >
      <input
        type="search"
        placeholder="search"
        onChange={(e) => {
          dispatch({ type: "product-search", payload: e.target.value });
        }}
        value={state.filters.search}
        className="w-full hidden lg:block border border-gray-300 bg-white rounded-lg h-10 pl-2 my-2 focus:outline-none"
      />
      <div className="flex flex-col justify-center items-baseline gap-2 my-2">
        <p>Categories</p>
        {Array.from(categories, (category, index) => {
          return (
            <button
              key={index}
              className={`${
                state?.filters.buttonindex === index &&
                "border-b-2 border-b-slate-500"
              } text-sm text-zinc-500`}
              onClick={(e) => getItemsbycategory(index, e)}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col justify-center items-baseline gap-2 my-2">
        <p>Company</p>
        <select
          id="company"
          value={state?.filters?.companyname}
          className="bg-white border text-zinc-500 text-sm border-zinc-900 rounded-md capitalize focus:outline-none"
          onChange={(event) => getProductsbycompany(event)}
        >
          {Array.from(companies, (company, index) => {
            return <option key={index} value={company} label={company} />;
          })}
        </select>
      </div>
      <div className="flex flex-col justify-center items-baseline gap-2 my-3">
        <p>Colors</p>
        <div className="flex gap-1 justify-center items-center">
          <p>All</p>
          {Array.from(colortypes, (color, index) => {
            return (
              <div
                key={index}
                style={{ backgroundColor: color }}
                className="w-4 h-4 rounded-full text-base text-zinc-500"
              ></div>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-baseline gap-2 my-2">
          <p>Price</p>
          <p className="text-sm text-zinc-500">
            {IndianPrice(state?.filters?.pricerange)}
          </p>
          <input
            type="range"
            min={Math.min(...range)}
            max={Math.max(...range)}
            value={state?.filters?.pricerange}
            className="accent-blue-600 outline-none border-none"
            onChange={(e) => getItemsbypricerange(e)}
          />
        </div>
        <div className="my-3 flex flex-between items-center gap-12">
          <p>Free shipping</p>
          <input
            type="checkbox"
            className="accent-orange-700"
            id="shipping-checkbox"
            onChange={(e) => getProductswithfreeshipping(e)}
          />
        </div>
      </div>
      <button
        type="reset"
        className="my-2 px-2 rounded-md bg-amber-800 text-sm text-white py-1"
      >
        clear filters
      </button>
    </form>
  );
};

export default Filtersection;
