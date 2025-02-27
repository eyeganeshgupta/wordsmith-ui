import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetSuccessAction } from "../../redux/slices/global/globalSlice";

const Success = ({ message }) => {
  const dispatch = useDispatch();

  Swal.fire({
    icon: "success",
    title: "Bravo!",
    text: message || "Action completed successfully.",
  });

  dispatch(resetSuccessAction());
};

export default Success;
