import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from "@mui/material/Box";

export default function DeleteDataCnf({open,handleClosedelcnf,handleClose}) {


  return (
    <div>
      <Dialog open={open} onClose={handleClosedelcnf}>
        <Box style={{backgroundColor: "rgb(31,51,71)"}}>
        <DialogTitle style={{color:"white"}}>Delete Record ?</DialogTitle>
        <DialogContent style={{color:"white"}} sx={{width:'40ch'}}>Are you sure you want to delete record[s]?</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={()=>handleClose(false)} id='cancelbtncnf'style={{color:'white'}}>CANCEL</Button>
          <Button variant="outlined" onClick={()=>handleClose(true)} id='delbtncnf' style={{color:'white'}}>DELETE</Button>
        </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}