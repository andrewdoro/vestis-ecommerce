import React from 'react';
import { Box, Stack, AppBar, Badge, Toolbar, Typography, IconButton, Container, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ArticleIcon from '@mui/icons-material/Article';
import LogoIcon from '../LogoIcon/LogoIcon';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../features/drawerSlice';
import HideOnScroll from './HideOnScroll';
import categories from '../../constants/categories';

import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const currentPage = location.pathname.split('/').slice(-1).toString();
  const mobileView = useMediaQuery('(max-width:900px)');
  console.log(window.scrollY);
  const LogoText = () => {
    return (
      <IconButton
        to='/'
        component={Link}
        disableRipple
        sx={{
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <LogoIcon variant={0} sx={{ fontSize: 50, marginLeft: '8px' }} />
      </IconButton>
    );
  };
  const displayMobile = () => {
    return (
      <>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          aria-haspopup='true'
          onClick={() => dispatch(setOpen())}
          size='large'
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ ml: 'auto', mr: 'auto' }}>
          <LogoText />
        </Box>
        <IconButton
          component={Link}
          to={'/cart'}
          sx={{
            color: currentPage === 'cart' ? 'black' : 'text.secondary',
          }}
        >
          <Badge badgeContent={cart.line_items.length} color='secondary' variant='dot'>
            {currentPage === 'cart' ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
          </Badge>
        </IconButton>
      </>
    );
  };

  const displayDesktop = () => {
    const textLineAnimation = (slug) => ({
      position: 'relative',
      color: currentPage === slug ? 'black' : 'text.secondary',
      transition: '.3s',
      ':before': {
        content: "''",
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translate(0,-50%)',
        borderRadius: '2px',
        backgroundColor: 'secondary.main',
        width: currentPage === slug ? '100%' : '0px',
        height: '3px',
        transition: '.3s',
      },
      '&:hover::before': {
        width: '100%',
      },
      '&:hover': {
        color: 'black',
      },
    });

    return (
      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white.main',
        }}
      >
        <LogoText />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'space-between',
            width: '110px',
          }}
        >
          {categories.map(({ name, slug }) => {
            return (
              <Typography
                key={slug}
                variant='subtitle1'
                component={Link}
                to={`/products/${slug}`}
                color='inherit'
                sx={textLineAnimation(slug)}
              >
                {name}
              </Typography>
            );
          })}
        </Box>
        <Stack alignItems='center' direction='row'>
          <IconButton
            size='large'
            component={Link}
            to={'/about'}
            sx={{
              transition: '.3s',
              color: currentPage === 'about' ? 'black' : 'text.secondary',
              '&:hover': {
                color: 'black',
              },
            }}
          >
            {currentPage === 'about' ? <ArticleIcon /> : <ArticleOutlinedIcon />}
          </IconButton>
          <IconButton
            size='large'
            component={Link}
            to={'/cart'}
            sx={{
              color: currentPage === 'cart' ? 'black' : 'text.secondary',
              ':hover ': {
                color: 'black',
              },
            }}
          >
            <Badge badgeContent={!cart.line_items.length ? 0 : cart.line_items.length} color='secondary' variant='dot'>
              {currentPage === 'cart' ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
            </Badge>
          </IconButton>
        </Stack>
      </Container>
    );
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          key={currentPage}
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          exit={{ x: -500 }}
          transition={{ ease: 'easeInOut', duration: '0.5' }}
        >
          <Typography
            sx={{
              position: 'absolute',
              fontWeight: '700',
              left: '100px',
              top: '100px',
              mt: 'auto',
              mb: 'auto',
              lineHeight: 0,
              textOrientation: 'upright',
              writingMode: 'vertical-rl',
              opacity: '5%',
              userSelect: 'none',
              fontSize: 90,
              textTransform: 'uppercase',
              display: ['none', 'none', 'none', 'none', 'block'],
            }}
          >
            {currentPage === ''
              ? 'VESTIS'
              : location.pathname.split('/').slice(1, 2).toString() !== 'product' && currentPage}
          </Typography>
        </motion.div>
      </AnimatePresence>

      <HideOnScroll mobile={mobileView}>
        <AppBar color={mobileView ? 'inherit' : 'transparent'}>
          <Toolbar
            sx={{
              height: '56px',
              pl: ['24px', '24px', 0],
              pr: ['24px', '24px', 0],
            }}
          >
            {mobileView ? displayMobile() : displayDesktop()}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
