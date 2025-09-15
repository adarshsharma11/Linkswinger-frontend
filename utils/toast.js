import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

// Default options applied everywhere
const defaultOptions = {
  position: toast.POSITION.TOP_RIGHT,
  transition: "bounce",
  autoClose: 3000,
};

export function showToastSuccess(message, options = {}) {
  toast.success(message, { ...defaultOptions, ...options });
}

export function showToastError(message, options = {}) {
  toast.error(message, { ...defaultOptions, ...options });
}

export function showToastWarning(message, options = {}) {
  toast.warning(message, { ...defaultOptions, ...options });
}

export function showToastInfo(message, options = {}) {
  toast.info(message, { ...defaultOptions, ...options });
}
