import Swal from "sweetalert2";

const Error = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: "Oops",
    text: message || "An unexpected error occurred.",
  });
};

export default Error;
