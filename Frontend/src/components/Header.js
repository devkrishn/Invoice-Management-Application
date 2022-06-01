import React from 'react';
import hrclogo from "../image/hrclogo.png";
import abc from '../image/abc.svg';
function Header() {

    return (
      <div style={{display:'flex',backgroundColor:'#1b3546',height:'180px'}}>
                  <div> <img src={abc} style={{height:'60px',marginLeft:'30px',backgroundColor:'#1b3546'}}/></div>

                     <h1 style={{color:'white'}}><img src={hrclogo} style={{ height:'50px',marginLeft:'15rem',backgroundColor:'#1b3546'}}/></h1>

      </div>
    );
  }
  export default Header;