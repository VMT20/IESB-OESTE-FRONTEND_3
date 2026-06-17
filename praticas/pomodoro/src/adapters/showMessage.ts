import { toast } from 'react-toastify';
import { Dialog } from '../components/Dialog';

export const showMessage = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClose: (confirmation: boolean) => void) =>
    toast(Dialog, {
      data,
      onClose: (confirmation) => {
        if (confirmation) return onClose(true);
        return onClose(false);
      },
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }),
};