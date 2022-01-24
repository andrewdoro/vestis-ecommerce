import React, { useRef } from 'react';

import FilterMenu from './FilterMenu';

import {
  IconButton,
  Container,
  FormControl,
  MenuItem,
  Typography,
  Select,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Box } from '@mui/system';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
const Filter = ({
  sortOption,
  setSortOption,
  products,
  menu,
  setMenu,
  setNewProducts,
  category,
  newProducts,
}) => {
  const handleSortOption = (e) => {
    setSortOption(e.target.value);
    sessionStorage.setItem('sortOption', e.target.value);
  };
  const menuButton = useRef();
  return (
    <Container
      maxWidth='lg'
      sx={{
        mt: 5,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Box
        ref={menuButton}
        sx={{
          display: 'flex',
          jusitfyContent: 'center',
          alignItems: 'center',
          color: 'text.secondary',
          '&:hover': {
            color: 'black',
          },
          transition: '.3s',
        }}
        onClick={() => setMenu(true)}
      >
        <IconButton
          aria-label='filters'
          size='large'
          color='inherit'
          sx={{ color: menu && 'secondary.main', transition: '.3s' }}
        >
          <FilterListIcon />
        </IconButton>
        <Typography
          color='inherit'
          sx={{
            fontWeight: '500',
            width: '100px',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          {menu ? 'Filter by' : 'Show filters'}
        </Typography>
      </Box>

      <FilterMenu
        menu={menu}
        setMenu={setMenu}
        products={products}
        newProducts={newProducts}
        setNewProducts={setNewProducts}
        menuButton={menuButton}
        category={category}
      />

      <Box
        sx={{
          marginLeft: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '250px',
        }}
      >
        <FormControl sx={{ ml: 1, width: '170px' }}>
          <Select
            id='sort-select'
            value={sortOption}
            variant='standard'
            color='secondary'
            IconComponent={SortIcon}
            MenuProps={{
              disableScrollLock: true,
              sx: {
                '& .MuiMenu-paper': {
                  borderRadius: '0 0 10px 10px',
                  boxShadow: ' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                },
              },
            }}
            sx={{
              '& .MuiSelect-select': { backgroundColor: 'transparent' },
              '& .MuiInput-input': {
                '&:focus': {
                  backgroundColor: 'transparent',
                },
              },
            }}
            onChange={handleSortOption}
          >
            <MenuItem value={'up'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <ArrowCircleUpIcon sx={{ color: 'black' }} />
                <Typography sx={{ ml: 1, fontWeight: '500' }} color='inherit'>
                  Price up
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value={'down'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <ArrowCircleDownIcon sx={{ color: 'black' }} />
                <Typography sx={{ ml: 1, fontWeight: '500' }} color='inherit'>
                  Price down
                </Typography>
              </Box>
            </MenuItem>
            <MenuItem value={'name'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <SortByAlphaIcon sx={{ color: 'black' }} />
                <Typography sx={{ ml: 1, fontWeight: '500' }} color='inherit'>
                  Name
                </Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Filter;
