import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrorAction } from "../../redux/slices/global/globalSlice";

const Error = ({ message }) => {
  const dispatch = useDispatch();

  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message || "An unexpected error occurred.",
  });

  dispatch(resetErrorAction());
};

export default Error;
