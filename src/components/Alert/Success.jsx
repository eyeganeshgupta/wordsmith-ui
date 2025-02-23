import Swal from "sweetalert2";

const Success = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Bravo!",
    text: message || "Action completed successfully.",
  });
};

export default Success;
