import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cartSlice';

import { useParams } from 'react-router-dom';

import {
  Button,
  Grid,
  Typography,
  Container,
  Box,
  Card,
  IconButton,
  Snackbar,
  Alert,
  Skeleton,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import colors from '../../constants/colors';

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const product = useSelector((state) =>
    id
      ? state.products.products.find((product) => product.id === id)
      : undefined
  );
  useEffect(() => {
    if (product === undefined) return;
    if (Object.keys(product).length === 0) return;
    const variants = product.variant_groups;
    setSize(variants[0].options[0].name);
    setColor(variants[1].options[0].name);
  }, [product]);
  const handleColorChange = (color) => {
    setColor(color);
    const indexOfColor = product.variant_groups[1].options
      .map((option) => {
        return option.name;
      })
      .indexOf(color);
    setIndex(indexOfColor);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    product !== undefined && (
      <Container
        maxWidth='lg'
        sx={{
          paddingLeft: { xs: '0', lg: '24px' },
          paddingRight: { xs: '0', lg: '24px' },
          mb: 5,
        }}
      >
        <IconButton
          sx={{
            textTransform: 'none',
            fontWeight: '500',
            width: '50px',
            height: '50px',
            backgroundColor: 'secondary.light',
            position: 'fixed',
            m: 4,
            bottom: 60,
            '@media screen and (min-width: 600px)': {
              top: 50,
            },
            '@media screen and (max-width: 600px)': {
              right: 0,
            },
            zIndex: 3,
          }}
          size='large'
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon sx={{ color: 'white.main' }} />
        </IconButton>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm sx={{ position: 'relative' }}>
            {!loaded && (
              <Skeleton
                variant='rectangular'
                sx={{
                  height: {
                    xs: 'calc(100vh - 128px)',
                    sm: 'calc(100vh - 64px)',
                  },
                }}
              />
            )}
            {product.assets.length > 1 ? (
              <Carousel
                sx={{ display: loaded ? 'block' : 'none', width: '100%' }}
                autoPlay={false}
                duration={500}
                index={index}
                animation='slide'
                navButtonsAlwaysInvisible={true}
                swipe={false}
              >
                {product.variant_groups[1].options.map((option) => {
                  return (
                    <Box
                      key={option.id}
                      component='img'
                      src={
                        product.assets.find(
                          (image) => image.id === option.assets[0]
                        ).url
                      }
                      alt={product.name}
                      onLoad={() => setLoaded(true)}
                      sx={{
                        height: {
                          xs: 'calc(100vh - 128px)',
                          sm: 'calc(100vh - 64px)',
                        },
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                      }}
                    />
                  );
                })}
              </Carousel>
            ) : (
              <Box
                component='img'
                src={product.media.source}
                alt='product-image'
                onLoad={() => setLoaded(true)}
                sx={{
                  display: loaded ? 'block' : 'none',
                  height: {
                    xs: 'calc(100vh - 128px)',
                    sm: 'calc(100vh - 64px)',
                  },
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} sm>
            <Container
              maxWidth='xs'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  color: 'text.disabled',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  mt: '1rem',
                }}
              >
                {product.categories[0].slug +
                  ' / ' +
                  product.categories[1].slug}
              </Typography>
              <Typography variant='h5' sx={{ fontWeight: '700' }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', width: '100%', mt: 1 }}>
                {product.variant_groups[1].options.map((o) => {
                  return (
                    <Box
                      key={o.name}
                      onClick={() => {
                        handleColorChange(o.name);
                      }}
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        width: '35px',
                        mr: 1,
                        height: '35px',
                        overflow: 'hidden',
                        backgroundColor: colors[o.name.toLowerCase()],
                        '&:before': {
                          content: "''",
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 0,
                          height: 0,
                          borderBottom: '35px solid',
                          transformOrigin: 'right bottom',
                          borderColor: 'rgba(0,0,0,0.4)',
                          borderLeft: '35px solid transparent',
                          transform: o.name === color ? 'scale(1)' : 'scale(0)',
                          transition: '.1s ease-in-out',
                        },
                        '&:after': {
                          content: "''",
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: 0,
                          height: 0,
                          borderTop: '35px solid',
                          transformOrigin: 'left top',
                          borderColor: 'rgba(255,255,255,0.4)',
                          borderRight: '35px solid transparent',
                          transform: o.name === color ? 'scale(1)' : 'scale(0)',
                          transition: '.1s ease-in-out',
                        },
                      }}
                    ></Box>
                  );
                })}
              </Box>
              <Typography
                dangerouslySetInnerHTML={{ __html: product.description }}
                variant='body2'
                color='textSecondary'
                sx={{ mt: 1 }}
                component='p'
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  width: '100%',
                  mt: 2,
                }}
              >
                {product.variant_groups[0].options.map((s) => {
                  return (
                    <Box
                      key={s.name}
                      onClick={() => setSize(s.name)}
                      sx={{
                        display: 'flex',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50px',
                        mr: 2,
                        height: '50px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        backgroundColor:
                          s.name === size ? 'secondary.light' : 'transparent',
                        color: s.name === size ? 'white.main' : 'black',
                        transform: s.name === size && 'scale(1.1)',
                        boxShadow:
                          s.name === size
                            ? ' rgba(0, 0, 0, 0.24) 0px 3px 8px'
                            : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                        transition: '.2s',
                      }}
                    >
                      <Typography color='inherit'>{s.name}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Card
                variant='flex'
                flex='row'
                sx={{
                  justifyContent: 'space-between',
                  mt: '2rem',
                }}
              >
                <Typography variant='h5'>€{product.price.formatted}</Typography>
                <Button
                  size='large'
                  variant='outlined'
                  sx={{
                    width: '60%',
                  }}
                  onClick={() => {
                    let idSize = '';
                    product.variant_groups[0].options.forEach((option) => {
                      if (option.name === size) {
                        idSize = option.id;
                      }
                    });
                    let idColor = '';
                    product.variant_groups[1].options.forEach((option) => {
                      if (option.name === color) {
                        idColor = option.id;
                      }
                    });
                    const selectedVariant = {
                      [product.variant_groups[0].id.toString()]: idSize,
                      [product.variant_groups[1].id.toString()]: idColor,
                    };
                    setOpen(true);
                    dispatch(
                      addItem({
                        productId: product.id,
                        variant: selectedVariant,
                      })
                    );
                  }}
                  startIcon={<ShoppingCartIcon />}
                ></Button>
              </Card>
            </Container>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            variant='filled'
            sx={{
              width: '100%',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}
          >
            Item was added to the cart!
          </Alert>
        </Snackbar>
      </Container>
    )
  );
};

export default ProductView;
