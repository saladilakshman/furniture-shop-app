import { useContext } from "react";
import { ShopContext } from "../App";
import loginimage from "../assets/login.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../App.css";
const Login = () => {
  const { state, dispatch } = useContext(ShopContext);
  return (
    <section className="section-container">
      <div className="">
        {state.isAuthenticated ? (
          <div
            className="login-page-horizontal-alignment"
            style={{
              blockSize: "50vh",
            }}
          >
            <p className="login-page-text">
              you logged in as {window.btoa("your are guest")}
            </p>
            <button
              className="login-page-button"
              onClick={() => {
                dispatch({ type: "app-login" });
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="login-page-horizontal-alignment">
            <LazyLoadImage
              src={loginimage}
              alt=""
              className="w-full lg:w-1/3"
            />
            <p className="login-page-text">You did no logged in!</p>
            <button
              className="login-page-button"
              onClick={() => {
                dispatch({ type: "app-login" });
              }}
            >
              Login as guest
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
