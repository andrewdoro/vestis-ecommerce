import React, { useEffect, useState } from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { getProducts } from './features/productsSlice';
import { getCart, refreshCart } from './features/cartSlice';
import { useDispatch } from 'react-redux';
import {
  Navbar,
  Cart,
  Home,
  ProductView,
  Checkout,
  Products,
  Footer,
  About,
  ScrollToTop,
  Drawer,
} from './components';
import { Switch, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { commerce } from './lib/commerce';
import theme from './theme';


const App = () => {
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      dispatch(refreshCart());
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Navbar />
        <Drawer location={location}>
          <ScrollToTop>
            <Switch location={location} key={location.pathname}>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/products/:category'>
                <Products />
              </Route>
              <Route path='/product/:id'>
                <ProductView />
              </Route>
              <Route path='/cart'>
                <Cart />
              </Route>
              <Route path='/checkout'>
                <Checkout
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
            </Switch>
          </ScrollToTop>
          <Footer />
        </Drawer>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};
export default App;
