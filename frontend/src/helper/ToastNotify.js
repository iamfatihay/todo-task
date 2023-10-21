import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-toastify/dist/ReactToastify.min.css';

export const toastSuccessNotify = msg => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastErrorNotify = msg => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
