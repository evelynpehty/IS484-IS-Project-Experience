import * as React from 'react';

import {CircularProgress, Backdrop } from '@mui/material';

export default function Loading() {
  return (
    <>
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" thickness={6} />
    </Backdrop>
    </>
    
  );
}