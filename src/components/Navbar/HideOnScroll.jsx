import React from 'react';
import { Slide, useScrollTrigger } from '@mui/material';

const HideOnScroll = ({ children, mobile }) => {
  const trigger = useScrollTrigger();

  return (
    <>
      {mobile ? (
        <Slide appear={false} timeout={225} direction='down' in={!trigger}>
          {children}
        </Slide>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default HideOnScroll;
