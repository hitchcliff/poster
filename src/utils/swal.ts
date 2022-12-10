import Swal from "sweetalert2";

export const SuccessType1 = () =>
  Swal.fire({
    title: "Success!",
    background: "white",
    width: "200px",
    confirmButtonColor: "#e47200",
    confirmButtonText: "Close",
    showCloseButton: false,
    showCancelButton: false,
    showDenyButton: false,
    allowEnterKey: true,
    allowEscapeKey: true,
    allowOutsideClick: true,
  });
