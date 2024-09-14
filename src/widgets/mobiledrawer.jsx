import Filtersection from "./filtersection";
import "../App.css";
import { useContext } from "react";
import { ShopContext } from "../App";
import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
const Mobiledrawer = ({ opendialog, closedialog }) => {
  const { state } = useContext(ShopContext);
  return (
    <Dialog
      open={opendialog}
      onClose={() => closedialog()}
      className="relative z-50"
      transition={true}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" transition={true} />
      <div className="fixed inset-0 flex h-screen">
        <DialogPanel className="border bg-white p-8" transition={true}>
          <Filtersection />
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Mobiledrawer;
