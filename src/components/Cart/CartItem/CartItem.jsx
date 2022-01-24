import React, { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../../features/cartSlice';
import colors from '../../../constants/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px 0 0 20px',
        overflow: 'hidden',
      }}
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='success'
          variant='filled'
          sx={{
            width: '100%',
            backgroundColor:
              colors[item.selected_options[1].option_name.toLowerCase()],
          }}
        >
          Product was removed from cart!
        </Alert>
      </Snackbar>
      <Box
        component={Link}
        sx={{ width: '100%', height: '100%' }}
        to={`/product/${item.product_id}`}
      >
        <Box
          component='img'
          sx={{
            height: ['50vh', '50vh', '50vh'],
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: '10px',
          }}
          src={item.image.url}
        ></Box>
      </Box>
      <Typography variant='subtitle1' noWrap gutterBottom>
        {item.name}
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        {item.line_total.formatted_with_symbol}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: colors[item.selected_options[1].option_name.toLowerCase()],
        }}
      >
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '0 0 0 20px ',
            backgroundColor:
              colors[item.selected_options[1].option_name.toLowerCase()],
          }}
        />
        <Card
          variant='flex'
          flex='row'
          sx={{
            boxSizing: 'border-box',
            width: ['40px'],
            height: '40px',
            ml: 1,
            border: '5px solid',
            color: 'inherit',
          }}
        >
          <Typography variant='h6' color='inherit'>
            {item.selected_options[0].option_name}
          </Typography>
        </Card>
        <Card
          variant='flex'
          flex='row'
          sx={{
            boxSizing: 'border-box',
            width: '40px',
            height: '40px',
            ml: 1,
            border: '3px solid',
            color: 'inherit',
          }}
        >
          <Typography variant='h6' color='inherit'>
            {item.quantity}
          </Typography>
        </Card>
        <IconButton
          sx={{
            ml: 1,
            color: colors[item.selected_options[1].option_name.toLowerCase()],
          }}
          onClick={() =>
            dispatch(
              updateQuantity({ lineItemId: item.id, qt: item.quantity + 1 })
            )
          }
        >
          <AddIcon />
        </IconButton>
        <IconButton
          sx={{
            ml: 1,
            color: colors[item.selected_options[1].option_name.toLowerCase()],
          }}
          onClick={() =>
            dispatch(
              updateQuantity({ lineItemId: item.id, qt: item.quantity - 1 })
            )
          }
        >
          {' '}
          <RemoveIcon />
        </IconButton>
        <IconButton
          size='large'
          sx={{
            width: '40px',
            m: 2,
            height: '40px',
            marginLeft: 'auto',
            outline: '2px solid',
          }}
          color='inherit'
          onClick={() => {
            setOpen(true), dispatch(removeItem(item.id));
          }}
        >
          <DeleteIcon fontSize='inherit' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
