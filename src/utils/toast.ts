import { toast } from "react-toastify";

export const toastSuccess = (message: string): void => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
    });
};
export const toastError = (message: string): void => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
    });
};
