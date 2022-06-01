import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";

export default function EditData({ open,sl_no,invoice_currency,cust_payment_terms,changeHandler,submitHandler,handleClose}) {

  return (
    <div>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <Box style={{backgroundColor: "rgb(31,51,71)"}}>
        <DialogTitle style={{color:"white"}}>Edit</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
                '& > :not(style)': {m:1, width: '28ch'},
            }}
            noValidate
            autoComplete="off"
            >

          <TextField
            autoFocus
            name='invoice_currency'
            margin="dense"
            id="invoice_currency"
            label="Invoice Currency"
            type="text"
            fullWidth
            onChange={changeHandler}
            value={invoice_currency}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />

        <TextField
            autoFocus
            name='cust_payment_terms'
            margin="dense"
            id="cust_payment_terms"
            label="Customer Payment Terms"
            type="text"
            fullWidth
            onChange={changeHandler}
            value={cust_payment_terms}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          </Box>
        </DialogContent>
        <DialogActions >
        <Button variant="outlined" onClick={() => handleClose(true)} style={{color:'white'}} id='addbtnedit'>Edit</Button>
        <Button variant="outlined" onClick={() => handleClose(false)} style={{color:'white'}} id='cancelbtnedit'>Cancel</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}