import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Stepper,
  Step,
  CircularProgress,
  StepLabel,
  Typography,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { useSelector } from 'react-redux';

const steps = ['Shipping address', 'Payment details'];
const Checkout = ({ onCaptureCheckout, order, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const { cart } = useSelector((state) => state.cart);
  const history = useHistory();
  useEffect(() => {
    if (cart.id && cart.line_items.length > 0) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          });
          setCheckoutToken(token);
        } catch {
          history.push('/');
        }
      };

      generateToken();
    }
    // eslint-disable-next-line
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  let Confirmation = () =>
    order.customer ? (
      <>
        <Stack
          sx={{
            minHeight: '40vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' align='center'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider />
          <Typography variant='subtitle2' align='center'>
            Order ref: {order.customer_reference}
          </Typography>
        </Stack>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    ) : (
      <Stack
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '30vh',
        }}
      >
        <CircularProgress />
      </Stack>
    );
  if (error) {
    Confirmation = () => (
      <>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <>
      {checkoutToken ? (
        <Container
          maxWidth='lg'
          sx={{
            height: '100%',
            width: '100%',
          }}
        >
          <Paper
            sx={{
              p: 4,
              mt: 6,
              boxShadow:
                'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
            }}
          >
            <Typography variant='h4' align='center' sx={{ fontWeight: '700' }}>
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Confirmation />
            ) : (
              checkoutToken && <Form />
            )}
          </Paper>
        </Container>
      ) : (
        <Container
          maxWidth='lg'
          sx={{
            width: '100%',
            height: 'calc(100vh - 128px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress></CircularProgress>
        </Container>
      )}
    </>
  );
};

export default Checkout;
