import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { IndianPrice } from "../utils/priceformat";
import { Star } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../App";
import Loader from "../assets/loader.svg";
const Productinfo = () => {
  const { state, dispatch } = useContext(ShopContext);
  const { productdetails } = useParams();
  const [details, setDetails] = useState({});
  const [images, setImages] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://www.course-api.com/react-store-single-product?id=${productdetails}`
      )
      .then((res) => {
        setDetails(res.data);
        setImages(res.data?.images);
        setCurrentImage(res.data?.images[0]?.url);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, [productdetails]);
  return (
    <section className="container mx-auto lg:px-24 px-4">
      {loading ? (
        <div
          className="flex flex-col justify-center items-center"
          style={{ minBlockSize: "50vh" }}
        >
          <img src={Loader} alt="" />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-3 items-center">
          <div className="">
            <img
              src={currentImage}
              alt=""
              className="w-[24.6rem] h-96 rounded-lg drop-shadow-lg"
            />
            <div className="flex gap-2 pt-2">
              {images?.map((image, index) => {
                return (
                  <img
                    src={image?.url}
                    key={index}
                    alt=""
                    className=" h-[4rem] w-[4.1rem] lg:w-[4.3rem] rounded-lg lg:h-[4.3rem] object-cover"
                    onClick={(e) => setCurrentImage(e.target.src)}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-center items-baseline gap-5 lg:w-2/3 w-full">
            <h2 className="text-lg lg:text-xl font-semibold capitalize">
              {details?.name}
            </h2>
            <p className="leading-normal tracking-normal text-justify">
              {details?.description}
            </p>
            <div className="flex gap-8">
              <p className="text-zinc-600 text-lg">
                {IndianPrice(details?.price)}
              </p>
              <p className="flex justify-center items-center gap-1">
                {details?.stars}
                <Star color={"orange"} size={18} />
              </p>
            </div>
            <h6 className="text-lg font-normal">Colors :</h6>
            <div className="relative flex justify-center items-center gap-2">
              {details?.colors?.map((col, index) => {
                return (
                  <div
                    className={`w-4 h-4 rounded-full ${
                      index === colorIndex &&
                      "ring-1 ring-zinc-600 ring-offset-1"
                    }`}
                    key={index}
                    style={{
                      backgroundColor: col,
                    }}
                    onClick={() => setColorIndex(index)}
                  />
                );
              })}
            </div>
            <div className="flex justify-center items-center gap-2">
              {details["shipping"] ? (
                <>
                  <button
                    disabled
                    className="text-green-600  text-base animate-pulse"
                  >
                    free shipping
                  </button>
                </>
              ) : (
                <>
                  <p className="capitalize text-base">
                    Shipping fee: {IndianPrice(78)}
                  </p>
                </>
              )}
            </div>
            <button
              className="px-2 py-2 ring-1 ring-zinc-900 text-zinc-800 rounded-lg text-base max-md:mb-24"
              onClick={(e) => {
                if (e.target.textContent.includes("Add")) {
                  dispatch({
                    type: "add-to-cart",
                    payload: {
                      ...details,
                      color: details?.colors[colorIndex],
                      qty: 1,
                    },
                  });
                } else {
                  dispatch({ type: "remove-from-cart", payload: details?.id });
                }
              }}
            >
              {state?.cartItems?.find((q) => q.id === details?.id)
                ? "Remove fom cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Productinfo;
