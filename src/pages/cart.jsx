import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../App";
import { useNavigate } from "react-router-dom";
import emptybag from "../assets/empty-bag.png";
import { Trash2, Plus, Minus } from "lucide-react";
import { IndianPrice } from "../utils/priceformat";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Cart = () => {
  const [carttotal, setCarttotal] = useState(0);
  const {
    state: { cartItems },
    dispatch,
  } = useContext(ShopContext);
  const navigate = useNavigate();
  const [paymentstatus, setPaymentstatus] = useState(false);
  const payment = () => {
    setPaymentstatus(true);
    const paymentMethods = [
      {
        supportedMethods: "https://bobbucks.dev/pay",
        data: {
          supportedNetworks: ["visa", "mastercard", "discover"],
          supportedTypes: ["credit"],
        },
      },
    ];
    const paymentDetails = {
      total: {
        label: "Total Amount",
        amount: {
          currency: "INR",
          value: carttotal,
        },
      },
      displayItems: [
        {
          label: "15% Discount",
          amount: {
            currency: "INR",
            value: 25,
          },
        },
        {
          label: "Tax",
          amount: {
            currency: "INR",
            value: 0.79,
          },
        },
      ],
    };
    const options = {
      requestPayerName: true,
      requestPayerPhone: true,
      requestPayerEmail: false,
    };
    const paymentRequest = new PaymentRequest(
      paymentMethods,
      paymentDetails,
      options
    );

    paymentRequest
      .show()
      .then((paymentResponse) => {
        // close the payment UI
        paymentResponse.complete().then(() => {
          setPaymentstatus(false);
        });
      })
      .catch((err) => {
        // user closed the UI or the API threw an error
        console.log("Error:", err.message);
        setPaymentstatus(false);
      });
  };
  useEffect(() => {
    const sum = cartItems.map((item) => item.price * item.qty);
    const summation = sum.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    setCarttotal(summation);
    dispatch({ type: "total-bag", payload: summation });
  }, [cartItems, dispatch]);
  return (
    <section className="container mx-auto lg:px-24 px-4">
      <div className="mt-10">
        {cartItems?.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4">
            <LazyLoadImage src={emptybag} alt="" className=" w-full lg:w-1/3" />
            <h2 className="capitalize text-base lg:text-lg text-zinc-500 font-normal">
              your bag is empty!
            </h2>
            <button
              className="px-4 py-2 rounded-lg ring-1 ring-zinc-950 text-zinc-800 text-sm hover:text-zinc-950 capitalize"
              onClick={() => navigate("/products")}
            >
              start shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 grid-cols-1 gap-2">
            <div className="col-span-8">
              <div className="grid grid-cols-5 gap-5">
                {["Item", "Color", "Qty", "Price", "actions"].map(
                  (i, index) => {
                    return <p key={index}>{i}</p>;
                  }
                )}
              </div>
              <div className="w-full border border-gray-300 my-1"></div>
              <div>
                {cartItems?.map(({ id, name, images, color, qty, price }) => {
                  return (
                    <>
                      <div
                        key={id}
                        className="grid grid-cols-5 gap-5 items-center"
                      >
                        <div>
                          <h6 className="text-sm lg:text-base font-normal capitalize pb-1">
                            {name}
                          </h6>
                          <img
                            src={images[0]?.url}
                            alt=""
                            className="w-24 rounded-md"
                          />
                        </div>

                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        ></div>
                        <div className="flex max-sm:flex-col items-center gap-1">
                          <button
                            onClick={() =>
                              dispatch({
                                type: "quantity-increment",
                                payload: id,
                              })
                            }
                          >
                            <Plus />
                          </button>
                          <p className="tabular-nums">{qty}</p>
                          <button
                            disabled={qty === 1 ? true : false}
                            className="disabled:cursor-not-allowed"
                            onClick={() =>
                              dispatch({
                                type: "quantity-decrement",
                                payload: id,
                              })
                            }
                          >
                            <Minus />
                          </button>
                        </div>
                        <h2>{IndianPrice(price * qty)}</h2>
                        <button
                          className="text-orange-700"
                          onClick={() =>
                            dispatch({ type: "remove-from-cart", payload: id })
                          }
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="w-full border-b-2 border-stone-200 my-1"></div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="lg:col-span-4 sticy top-1 border border-gray-500 p-2 rounded-md flex flex-col justify-center gap-3 items-baseline">
              <h2 className="text-center py-2">
                Amount :{IndianPrice(carttotal)}
              </h2>
              <h6 className="text-center py-2">Shipping: {IndianPrice(78)}</h6>
              <h6 className="text-center py-2">
                Total : {IndianPrice(carttotal + 78)}
              </h6>
              <button
                className="px-4 py-2 bg-orange-400 text-white rounded-md w-full"
                onClick={payment}
              >
                {paymentstatus ? "Processing.." : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
