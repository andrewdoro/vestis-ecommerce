import React, { useEffect } from 'react';
import { Slider, Stack, Typography } from '@mui/material';

const SliderComponent = ({ price, setPrice }) => {
  useEffect(() => {
    const val = sessionStorage.getItem('price') || 500;
    setPrice(parseInt(val));
  });
  const handleChange = (e, newValue) => {
    setPrice(newValue);
    sessionStorage.setItem('price', newValue);
  };
  function valuetext(value) {
    return `€${value}`;
  }
  return (
    <Stack direction='row' alignItems='center' sx={{ position: 'relative', width: '100%', pl: 3, pr: 3 }}>
      <Slider
        step={10}
        min={50}
        valueLabelDisplay='off'
        max={300}
        sx={{
          '& .MuiSlider-valueLabel': {
            fontSize: 12,
            top: -3,
            backgroundColor: 'unset',
            color: 'primary.light',
            '&:before': {
              display: 'none',
            },
            '& *': {
              background: 'transparent',
              color: 'primary.light',
            },
          },
        }}
        getAriaLabel={() => 'Price range'}
        value={price}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
      <Typography
        variant='h4'
        sx={{
          ml: 2,
          userSelect: 'none',
          width: '30px',
          position: 'absolute',
          right: '75px',
          top: '-40px',
          fontWeight: '700',
          color: '#000',
          opacity: '15%',
        }}
      >
        {' '}
        €{price}{' '}
      </Typography>
    </Stack>
  );
};

export default SliderComponent;
