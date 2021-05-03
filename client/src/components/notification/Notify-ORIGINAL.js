import { openSnackbarExported } from './Notifier';

export default function Notify(obj) {
  openSnackbarExported({ message: obj.message || obj.toString() });
}