import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";
import "../styles/LandingPage.css";

export default function Modal({open,business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,due_in_date,
  invoice_currency,document_type,posting_id,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,submitHandler,handleClose,changeHandleradd}) {


  return (
    <div>
      <Dialog  maxWidth="lg" open={open} onClose={handleClose}>
       <Box style={{backgroundColor: "rgb(31,51,71)"}}>
        <DialogTitle style={{color:"white"}}>Add</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& > :not(style)': {m:2, width: '28ch'},
          }}
            noValidate
            autoComplete="off"
          >
         <TextField
            autoFocus
            name='business_code'
            margin="dense"
            id="business_code"
            label="Business Code"
            value={business_code}
            fullWidth
            type="text"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            required
            variant="filled"
          />
          <TextField
            autoFocus
            name='cust_number'
            margin="dense"
            id="cust_number"
            label="Customer Number"
            value={cust_number}
            fullWidth
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='clear_date'
            margin="dense"
            id="clear_date"
            label="Clear Date"
            value={clear_date}
            type="date"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          
          <TextField
            autoFocus
            name='buisness_year'
            margin="dense"
            id="buisness_year"
            label="Business Year"
            value={buisness_year}
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='doc_id'
            margin="dense"
            id="doc_id"
            label="Document id"
            value={doc_id}
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='posting_date'
            margin="dense"
            id="posting_date"
            label="Posting Date"
            value={posting_date}
            type="date"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          
          <TextField
            autoFocus
            name='document_create_date'
            margin="dense"
            id="document_create_date"
            label="Document Create Date"
            value={document_create_date}
            type="date"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='due_in_date'
            margin="dense"
            id="due_in_date"
            label="Due Date"
            value={due_in_date}
            type="date"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='invoice_currency'
            margin="dense"
            id="invoice_currency"
            label="Invoice Currency"
            value={invoice_currency}
            type="text"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          
          <TextField
            autoFocus
            name='document_type'
            margin="dense"
            id="document_type"
            label="Document Type"
            value={document_type}
            type="text"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='posting_id'
            margin="dense"
            id="posting_id"
            label="Posting Id"
            value={posting_id}
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='total_open_amount'
            margin="dense"
            id="total_open_amount"
            label="Total open amount"
            value={total_open_amount}
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='baseline_create_date'
            margin="dense"
            id="baseline_create_date"
            label="Baseline Create Date"
            value={baseline_create_date}
            type="date"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          <TextField
            autoFocus
            name='cust_payment_terms'
            margin="dense"
            id="cust_payment_terms"
            label="Cust Payment Terms"
            value={cust_payment_terms}
            type="text"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
           <TextField
            autoFocus
            name='invoice_id'
            margin="dense"
            id="invoice_id"
            label="Invoice Id"
            value={invoice_id}
            type="number"
            onChange={changeHandleradd}
            InputProps={{style: {backgroundColor:"white"}, disableUnderline: true}}
            variant="filled"
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" id='addbtnadd' onClick={()=>handleClose(true)} style={{color:'white'}}>ADD</Button>
          <Button variant="outlined" id='addbtncancel' onClick={()=>handleClose(false)} style={{color:'white'}}>Cancel</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}