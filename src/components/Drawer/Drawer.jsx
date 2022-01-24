import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDrawer, setClose } from '../../features/drawerSlice';
import { Box, Drawer, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import categories from '../../constants/categories';
import images from '../../images/images';
import PersonPinIcon from '@mui/icons-material/PersonPin';

const DrawerComponent = ({ children, location }) => {
  const dispatch = useDispatch();
  const [percent, setPercent] = useState(0);
  const ref = useRef(null);
  const drawer = useSelector(getDrawer);

  const currentPage = location.pathname.split('/').slice(-1).toString();
  useEffect(() => {
    const scrollSet = () => {
      setPercent(window.scrollY / ref.current.clientHeight);
    };
    window.addEventListener('scroll', () => scrollSet());

    return () => {
      window.removeEventListener('scroll', () => scrollSet());
    };
  }, [location]);
  const handleDrawerClose = () => {
    dispatch(setClose());
  };
  return (
    <>
      <Drawer
        sx={{
          width: '200px',
          '.MuiDrawer-paper': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            width: '200px',
          },
          '.MuiBackdrop-root': { backgroundColor: 'transparent' },
          transtion: '1s',
        }}
        anchor='left'
        open={drawer}
        transitionDuration={{ enter: 225, exit: 225 }}
        onClose={handleDrawerClose}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            pl: '0',
            mt: '82px',
            pr: '16px',
          }}
        >
          {categories.map(({ name, slug, link, image }) => {
            return (
              <Box
                component={Link}
                to={link}
                onClick={handleDrawerClose}
                sx={{
                  width: '100%',
                  height: '30vh',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  textDecoration: 'none',
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  mb: 1,
                  borderRadius: '0 10px 10px 0px',
                  overflow: 'hidden',
                  '&:after': {
                    content: "''",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '0%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.6 )',
                    transition: '225ms cubic-bezier(0.4, 0, 0.2, 1)',
                    ...(currentPage !== slug && { width: '100%' }),
                  },
                }}
                key={name}
              >
                <Box
                  component='img'
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  src={images[image]}
                />
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: '500',
                    zIndex: '2',
                    padding: 2,
                    textTransform: 'uppercase',
                    color: '#fff',
                    letterSpacing: 5,
                    ...(currentPage !== slug && {
                      fontWeight: '300',
                      opacity: '50%',
                    }),
                  }}
                >
                  {name}
                </Typography>
              </Box>
            );
          })}
          <Box
            component={Link}
            to={'/about'}
            onClick={handleDrawerClose}
            sx={{
              marginTop: 'auto',
              width: '100%',
              height: '100px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              color: 'black',

              borderRadius: '0 10px 10px 0px',
            }}
          >
            <Typography
              variant='h4'
              sx={{
                fontWeight: '500',
                zIndex: '2',
                textTransform: 'uppercase',
                letterSpacing: 5,
                ...(currentPage !== 'about' && {
                  fontWeight: '300',
                  opacity: '50%',
                }),
              }}
            >
              About
            </Typography>
            <PersonPinIcon
              sx={{
                fontSize: 40,
                color: 'inherit',
                ...(currentPage !== 'about' && {
                  fontWeight: '300',
                  opacity: '50%',
                }),
              }}
            />
          </Box>
        </Box>
      </Drawer>
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transform: drawer && 'translate(200px,0px) scale(0.7)',
          transformOrigin: `0% ${percent * 100}%`,
          transition: ' 225ms cubic-bezier(0.4, 0, 0.2, 1) ',
          overflow: 'hidden',

          mt: '64px',
          ...(drawer && {
            mt: '80px',
            borderRadius: '50px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          }),
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DrawerComponent;
