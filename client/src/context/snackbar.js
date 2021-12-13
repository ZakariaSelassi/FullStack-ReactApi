import {useState,createContext} from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
export const SnackbarContext = createContext({});

export const SnackbarProvider = ({children}) => {

    const [open, setOpen] = useState(false);
    const [alert , setAlert] = useState({})

    const openSuccessSnackbar = (message) => {
        setAlert({message,severity:'success'})
        setOpen(true);    
    }
    const openErrorSnackbar = (message) => {
        setAlert({message,severity:'error'})
        setOpen(true);    
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      
    }
    return (
        <SnackbarContext.Provider value={{
            openSuccessSnackbar,
            openErrorSnackbar}}>
            {children}
            <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            >
                <Alert severity={alert.severity} onClose={handleClose}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
        )
}
