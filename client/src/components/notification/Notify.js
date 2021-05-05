import { openSnackbarExported } from './Notifier';
//import  openSnackbarExported  from './Notifier';

// export default function Notify(obj) {
//   openSnackbarExported({ message: obj.message || obj.toString() });
// }
export default function Notify(obj) {
  openSnackbarExported( {message: obj.message || obj.toString(), status: obj.status });
}