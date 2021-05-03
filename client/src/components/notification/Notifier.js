import React from 'react';
//import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

let openSnackbarFn;

function openSnackbarExported({ message }) {
  openSnackbarFn({ message });  
}

function Notifier(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    openSnackbarFn = openSnackbar;
    //console.log('openSnackbarFn: ',openSnackbarFn)
    return () => {
      //cleanup
    }
  }, [])

  const openSnackbar = ({ message }) => {
    //this.setState({ open: true, message });
    setOpen(true);
    setMessage(message)
  };

 
  const handleSnackbarRequestClose = () => {
    // this.setState({
    //   open: false,
    //   message: '',
    // });
    setOpen(false);
    setMessage('')
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  return (
    <div>
     
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        //onClose={handleClose}
        message={message}
        onClose={handleSnackbarRequestClose}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
export {Notifier, openSnackbarExported}