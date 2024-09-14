import one from "../assets/one.jpg";
import two from "../assets/two.jpg";
import three from "../assets/three.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext } from "react";
import { productsList } from "../utils/productslist";
import { services } from "../utils/services";
import "../App.css";
import { Itemcardlayout } from "../widgets/widget";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../App";
const Home = () => {
  const {
    state: { carouselImageIndex },
    dispatch,
  } = useContext(ShopContext);
  const carouselImages = [one, two, three];
  const forwardImage = () => {
    if (!document.startViewTransition) {
      dispatch({ type: "forward-image" });
      return;
    }
    document.startViewTransition(() => {
      dispatch({ type: "forward-image" });
    });
  };
  const backwardImage = () => {
    if (!document.startViewTransition) {
      dispatch({ type: "forward-image" });
      return;
    }
    document.startViewTransition(() => {
      dispatch({ type: "backward-image" });
    });
  };
  const navigate = useNavigate();
  return (
    <>
      <section className="mb-24">
        <div className="home-page-container">
          <div className="home-page-alignment">
            <h1 className=" w-full text-4xl capitalize lg:w-2/3 font-semibold">
              design your comfort zone
            </h1>
            <h2 className="w-full lg:w-3/4 text-xl">
              Explore our curated collection of stylish, comfortable furniture
              designed to transform your living space into a sanctuary. Your
              comfort, our priority.
            </h2>
            <button
              className="home-page-shop-button"
              onClick={() => navigate("/products")}
            >
              Shop now
            </button>
          </div>
          <div className=" w-full lg:w-2/3 relative flex py-5">
            <img
              src={carouselImages[carouselImageIndex]}
              alt=""
              className="lg:rounded-lg"
            />
            <button
              className="home-page-carousel-backward-button"
              onClick={backwardImage}
              disabled={carouselImageIndex === 0 ? true : false}
            >
              <ChevronLeft />
            </button>
            <button
              className="home-page-carousel-forward-button"
              onClick={forwardImage}
              disabled={carouselImageIndex === 2 ? true : false}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
      <section className="py-8 bg-amber-50/55 mb-24">
        <h2 className="text-2xl lg:text-3xl text-center font-[400] pb-5 services-text">
          Top picks for you
        </h2>
        <div className="home-page-items-layout">
          {Array.from(
            productsList.slice(0, 3),
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
      </section>
      <section className="container mx-auto lg:px-24 mb-24">
        <h2 className="text-2xl lg:text-3xl text-center font-[400] pb-2 services-text">
          Our services
        </h2>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-4 pt-8">
          {Array.from(services, ({ id, image, title, text }) => {
            return (
              <div
                key={id}
                className="flex flex-col justify-center items-center gap-4"
              >
                <img src={image} alt="" className=" w-24 lg:w-1/3" />
                <p className="text-xl font-normal">{title}</p>
                <p className="text-center text-zinc-500">{text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className=" py-8 bg-amber-50/55">
        <div className="home-page-connection-section">
          <h2 className="text-lg lg:text-xl font-semibold lg:w-1/2 w-full  max-md:text-center">
            {`"Stay Connected"`}
            <br />
            <span className="font-normal text-zinc-500 text-lg">{`Subscribe to our newsletter for exclusive offers, the
          latest furniture trends, and tips to enhance your home. Join our
          community and never miss out!`}</span>
          </h2>
          <div className="relative lg:flex-1 max-md:min-w-full max-md:px-2">
            <input
              type="email"
              className="w-full focus:outline-none ring-1 ring-black rounded-sm h-12 pl-1 placeholder:text-lg placeholder:capitalize"
              placeholder="your email"
            />
            <button className="px-2 py-2 bg-zinc-800 text-white rounded-lg absolute right-3 lg:right-1 top-1">
              subscribe
            </button>
          </div>
        </div>
      </section>
      <h3 className=" text-sm text-center lg:text-xl mt-16 mb-6 max-md:mb-20">
        All rights reserved by comfysloth &copy; {new Date().getFullYear()}
      </h3>
    </>
  );
};

export default Home;
