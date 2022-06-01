import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextRotateVerticalOutlined } from '@mui/icons-material';
import { textAlign } from '@mui/system';
function Footer() {

  return (
    <div  style={{backgroundColor:'#1b3546',textAlign:'center',color:'white',height:'55px'}}>
      
  <div class="card-footer ">
  <a href='#' style={{color:'blue'}}>Privacy Policy</a> | © 2022 Highradius Corporation. All rights reserved.
  </div>
</div>
  );
}
export default Footer;