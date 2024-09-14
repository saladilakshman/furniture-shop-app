import { useReducer, createContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home, Products, Login, Cart, About, Productinfo } from "./pages/pages";
import { Header } from "./widgets/widget";
import { productsList } from "./utils/productslist";
import { Mobilebottomnavbar } from "./widgets/widget";
export const ShopContext = createContext();
function App() {
  const range = productsList.map((item) => item.price);
  const shopstate = {
    productslist: productsList,
    filteredProducts: productsList,
    mobilesearchlist: [],
    showAppbar: false,
    cartItems: [],
    showmobiledrawer: false,
    totalbag: 0,
    isAuthenticated: false,
    carouselImageIndex: 0,
    filters: {
      search: "",
      buttonindex: 0,
      companyname: "",
      pricerange: Math.max(...range),
    },
  };
  const shopreducer = (state, action) => {
    switch (action.type) {
      case "mobile-search": {
        const filterList = productsList.filter((item) =>
          item.name.includes(action.payload)
        );
        if (!filterList) {
          return {
            ...state,
            mobilesearchlist: [],
          };
        }
        return {
          ...state,
          mobilesearchlist: filterList,
        };
      }
      case "show-app-bar":
        return {
          ...state,
          showAppbar: !state.showAppbar,
        };
      case "add-to-cart": {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      case "remove-from-cart": {
        const cartItemsAfterItemDelete = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        return {
          ...state,
          cartItems: cartItemsAfterItemDelete,
        };
      }
      case "products-filteration": {
        return {
          ...state,
          filteredProducts: action.payload,
        };
      }
      case "mobile-drawer-toggle":
        return {
          ...state,
          showmobiledrawer: !state.showmobiledrawer,
        };
      case "quantity-increment": {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }
      case "quantity-decrement": {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
          ),
        };
      }
      case "total-bag": {
        return {
          ...state,
          totalbag: action.payload,
        };
      }
      case "app-login":
        return {
          ...state,
          isAuthenticated: !state.isAuthenticated,
        };
      case "forward-image": {
        state.carouselImageIndex = state.carouselImageIndex + 1;
        return {
          ...state,
          carouselImageIndex: state.carouselImageIndex,
        };
      }
      case "backward-image": {
        state.carouselImageIndex = state.carouselImageIndex - 1;
        return {
          ...state,
          carouselImageIndex: state.carouselImageIndex,
        };
      }
      case "product-search": {
        const searchText = action.payload.replace(/[\s/d]/g, "");
        return {
          ...state,
          filters: {
            ...state?.filters,
            buttonindex: 0,
            companyname: "",
            search: searchText,
          },
          filteredProducts: state?.productslist.filter((item) =>
            item.name.includes(searchText)
          ),
        };
      }
      case "product-category": {
        const list = state?.productslist?.filter((item) =>
          item.category.includes(action.payload.textContent)
        );
        return {
          ...state,
          filters: {
            ...state.filters,
            search: "",
            companyname: "",
            buttonindex: action.payload.index,
          },
          filteredProducts:
            action.payload.textContent === "All" ? state?.productslist : list,
        };
      }
      case "product-company": {
        const companyitems = state?.productslist?.filter((q) =>
          q.company.includes(action.payload)
        );
        return {
          ...state,
          filters: {
            ...state.filters,
            buttonindex: 0,
            searchText: "",
            companyname: action.payload,
          },
          filteredProducts:
            action.payload === "All" ? state?.productslist : companyitems,
        };
      }
      case "product-pricerange": {
        const getItemsbypricerange = state?.productslist?.filter(
          (item) => item.price <= Number(action.payload)
        );
        return {
          ...state,
          filters: {
            ...state.filters,
            pricerange: action.payload,
          },
          filteredProducts: getItemsbypricerange,
        };
      }
      case "reset-filters": {
        return {
          ...state,
          filters: {
            search: "",
            buttonindex: 0,
            companyname: "",
            pricerange: Math.max(...range),
          },
          filteredProducts: productsList,
          showAppbar: false,
        };
      }
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(shopreducer, shopstate, (args) => {
    const isstored = window.localStorage.getItem("shop");
    return JSON.parse(isstored) ?? args;
  });
  useEffect(() => {
    window.localStorage.setItem("shop", JSON.stringify(state));
  }, [state]);
  useEffect(() => {
    if (HTMLScriptElement.supports("speculationrules")) {
      const speculationscripttag = document.createElement("script");
      speculationscripttag.type = "speculationrules";
      const speculationjson = {
        source: "document",
        prerender: [
          {
            where: {
              and: [{ href_matches: "/*" }],
            },
          },
        ],
      };
      speculationscripttag.textContent = JSON.stringify(speculationjson);
      document.head.appendChild(speculationscripttag);
      return () => {
        // Clean up by removing the script when the component unmounts
        document.head.removeChild(speculationscripttag);
      };
    }
  }, []);
  return (
    <HashRouter>
      <ShopContext.Provider value={{ state, dispatch }}>
        <main className="relative">
          <Header />
          {!state?.showAppbar && <Mobilebottomnavbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:productdetails" element={<Productinfo />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </main>
      </ShopContext.Provider>
    </HashRouter>
  );
}

export default App;
