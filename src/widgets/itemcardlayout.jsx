import { useNavigate } from "react-router-dom";
import { Eye, Share2 } from "lucide-react";
import axios from "axios";
import { IndianPrice } from "../utils/priceformat";
const Itemcardlayout = ({ id, price, name, image }) => {
  const navigate = useNavigate();
  const shareImage = async (imageurl) => {
    await axios
      .get(imageurl, { responseType: "blob" })
      .then((res) => {
        const file = new File([res.data], `sample.jpeg`, {
          type: res?.data?.type,
        });
        const dataToBeShared = {
          files: [file],
          url: window.location.href,
        };
        if (navigator.canShare && navigator.canShare(dataToBeShared)) {
          try {
            navigator.share(dataToBeShared);
          } catch (err) {
            console.log(err.message);
          }
        } else {
          console.log("web share is not supported");
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      <div className="group relative">
        <img
          src={image}
          alt=""
          className="w-96 aspect-2/3 h-60 object-cover rounded-sm"
        />
        <div className="bg-zinc-800/60  object-cover rounded-sm flex justify-center items-center gap-4 text-neutral-300 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500  ">
          <Eye onClick={() => navigate(`/products/${id}`)} />
          <Share2 onClick={() => shareImage(image)} />
        </div>
      </div>
      <div className="flex justify-between items-center pt-1">
        <p className="capitalize text-neutral-600">{name}</p>
        <em className="text-slate-500">{IndianPrice(price)}</em>
      </div>
    </div>
  );
};

export default Itemcardlayout;
