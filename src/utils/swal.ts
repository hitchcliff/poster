import Swal from "sweetalert2";

interface ThrowSuccessProps {
  text: string;
}
export const ThrowSuccess = ({ text }: ThrowSuccessProps): Promise<boolean> =>
  new Promise((res) => {
    setTimeout(() => {
      Swal.fire({
        text,
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
    }, 300);
    res(true);
  });

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

interface ThrowErrorProps {
  text: string;
}
export const ThrowError = ({ text }: ThrowErrorProps): Promise<boolean> =>
  new Promise((res) => {
    setTimeout(() => {
      Swal.fire({
        text,
        color: "white",
        background: "#a60101",
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
    }, 300);
    res(true);
  });
