// src/utils/toast.ts
import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000, // default duration
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored', // you can change to "light" or "dark"
};

type ToastType = 'success' | 'error' | 'info' | 'warn';

interface ShowToastProps {
  message: string;
  duration?: number; // in milliseconds
  type?: ToastType;
}

export const showToast = ({
  message,
  duration,
  type = 'info',
}: ShowToastProps) => {
  toast[type](message, { ...defaultOptions, autoClose: duration });
};
