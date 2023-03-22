import * as React from 'react';

import {CircularProgress, Backdrop } from '@mui/material';

export default function Loading() {

  const styles = {
    span: {
      justifyContent: "center",
      position: "fixed",
      top: "55%",
      fontWeight: "bold",
      fontSize: "20px",
      color: 'red'
    },
  }


  return (
    <>
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress style={{'color': 'linear-gradient(to top right, #E69F9F, #E60000)'}} thickness={3} size='50px'/>
      {/* <span style={ styles.span }>Loading</span> */ }
    </Backdrop>
    </>
    
  );
}