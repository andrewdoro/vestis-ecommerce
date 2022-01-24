import React from 'react';
import {
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Container,
  Box,
  CircularProgress,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, removeItem } from '../../features/cartSlice';

import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import Sticky from 'react-stickynode';
const Cart = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const mobile = useMediaQuery('(min-width:600px)');

  const renderEmptyCart = () => (
    <Card variant='flex' flex='column' sx={{ height: 'calc(100vh - 192px)' }}>
      <StoreIcon sx={{ fontSize: 125 }}></StoreIcon>
      <Typography
        variant='body1'
        color='textSecondary'
        gutterBottom
        sx={{ textAlign: 'center' }}
      >
        You have no items in your shopping cart.
      </Typography>
      <Button component={Link} to='/' variant='outlined' color='primary'>
        Go back to shop
      </Button>
    </Card>
  );
  const renderCart = () => (
    <>
      <Grid container spacing={4} sx={{ mb: [5, 10] }}>
        <Grid item xs={12} sm={6} lg={7} xl={7} container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6'>
                My cart ({cart.line_items.length})
              </Typography>
              <Button
                color='secondary'
                size='large'
                onClick={() => dispatch(emptyCart())}
              >
                <RemoveShoppingCartIcon />
              </Button>
            </Box>
          </Grid>
          {cart.line_items.map((lineItem) => {
            return lineItem.product_id ? (
              <Grid item xs={12} sm={12} md={6} key={lineItem.id}>
                <CartItem item={lineItem} />
              </Grid>
            ) : (
              dispatch(removeItem(lineItem.id))
            );
          })}
        </Grid>
        <Grid item xs={12} sm={6} lg={5} xl={5}>
          <Sticky enabled={mobile} top={105} bottomBoundary={'#root'}>
            <Card variant='flex' flex='column'>
              <CardContent sx={{ width: '100%', pt: 0 }}>
                <Typography variant='h6' gutterBottom>
                  Order info
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography
                    color='text.secondary'
                    variant='subtitle1'
                    gutterBottom
                  >
                    Subtotal:{' '}
                  </Typography>
                  <Typography color='text.secondary' variant='subtitle1'>
                    €{cart.subtotal.formatted}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color='text.secondary' variant='subtitle1'>
                    Shipping:{' '}
                  </Typography>
                  <Typography color='text.secondary' variant='subtitle1'>
                    +€10
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                  }}
                >
                  <Typography color='text.secondary' variant='subtitle1'>
                    Total:{' '}
                  </Typography>
                  <Typography variant='h6'>
                    €{cart.subtotal.raw + 10}
                  </Typography>
                </Box>
                <Button
                  variant='contained'
                  color='secondary'
                  component={Link}
                  to='/checkout'
                  sx={{
                    mt: 3,
                    width: '100%',
                    height: '60px',
                    letterSpacing: 1,
                    borderRadius: '20px',
                  }}
                >
                  Checkout (€{cart.subtotal.raw + 10})
                </Button>
              </CardContent>
            </Card>
          </Sticky>
        </Grid>
      </Grid>
    </>
  );
  const loadingView = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 192px)',
        width: '100%',
      }}
    >
      <CircularProgress color='secondary' />
    </Box>
  );
  return (
    <>
      {loading ? (
        loadingView()
      ) : (
        <Container maxWidth='lg' sx={{ mt: 5, height: '100%' }}>
          {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
      )}
    </>
  );
};

export default Cart;
