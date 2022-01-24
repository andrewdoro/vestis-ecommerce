import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
  Typography,
  Button,
  Checkbox,
  ButtonGroup,
  useMediaQuery,
  Drawer,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
import colors from '../../constants/colors';
import SliderComponent from './SliderComponent';

const FilterMenu = ({
  menu,
  setMenu,
  setNewProducts,
  menuButton,
  category,
}) => {
  const [checkedFilters, setCheckedFilters] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState({
    size: true,
    color: true,
    categorie: true,
    price: true,
  });
  const [price, setPrice] = useState(500);
  let { products } = useSelector((state) => state.products);

  const mobile = useMediaQuery('(max-width:600px)');
  const componentRef = useRef();
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current) {
        const ref = componentRef.current;
        const bt = menuButton.current;
        if (!ref.contains(e.target) && !bt.contains(e.target)) {
          setMenu(false);
        }
      }
    }
  }, [menu, setMenu, menuButton, mobile]);
  useEffect(() => {
    const items = products.filter(
      (product) => product.categories[0].slug === category
    );
    const getFilters = () => {
      const colorFilters = [];
      const sizeFilters = [];
      const categoryFilters = [];
      const productsByFilters = [];
      items.map((product) => {
        if (product.variant_groups.length === 0) return null;
        const sizeInfo = product.variant_groups[0].options.map((option) => {
          let sizeInfo = '';
          sizeInfo = option.name.toLowerCase();
          if (!sizeFilters.includes(sizeInfo)) sizeFilters.push(sizeInfo);
          return sizeInfo;
        });
        if (product.variant_groups.length === 1) return null;
        const colorInfo = product.variant_groups[1].options.map((option) => {
          let colorInfo = '';
          colorInfo = option.name.toLowerCase();
          if (!colorFilters.includes(colorInfo)) colorFilters.push(colorInfo);
          return colorInfo;
        });
        if (product.categories.length === 1) return null;
        const categoryInfo = product.categories.slice(1).map((option) => {
          let categoryInfo = '';
          categoryInfo = option.name.toLowerCase();
          if (!categoryFilters.includes(categoryInfo))
            categoryFilters.push(categoryInfo);
          return categoryInfo;
        });

        productsByFilters.push({
          id: product.id,
          filters: {
            categorie: categoryInfo,
            size: sizeInfo,
            color: colorInfo,
          },
          price: product.price.raw,
        });

        return true;
      });

      const weights = {
        xs: 1,
        s: 2,
        m: 3,
        l: 4,
        xl: 5,
      };
      const sortedSizes = sizeFilters.sort((a, b) => weights[a] - weights[b]);
      const size = Object.fromEntries(sortedSizes.map((s) => [s, true]));
      const category = Object.fromEntries(
        categoryFilters.map((c) => [c, true])
      );
      const color = Object.fromEntries(colorFilters.map((c) => [c, true]));
      setFilterProducts(productsByFilters);
      setFilters({
        categorie: { ...category },
        size: { ...size },
        color: { ...color },
      });
      products.length > 0 && setLoaded(true);
    };
    getFilters();
  }, [category, products, menu]);
  useEffect(() => {
    if (Object.keys(filters).length > 0) searchFilters();
    // eslint-disable-next-line
  }, [checkedFilters, price, loaded, menu]);

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem(category.toString())) || [];
    setCheckedFilters(obj);
  }, [category]);
  const handleToggle = (value, category) => () => {
    const currentIndex = checkedFilters.indexOf(value);
    const newChecked = [...checkedFilters];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedFilters(newChecked);
    if (!filterCategory.includes(category))
      setFilterCategory([...filterCategory, category]);
  };
  const storeFilters = () => {
    sessionStorage.setItem(category.toString(), JSON.stringify(checkedFilters));
  };
  const searchFilters = () => {
    let filterCount = JSON.parse(JSON.stringify(filters));
    let newItems = [];

    Object.keys(filterCount).forEach((f) => {
      Object.keys(filterCount[f]).forEach((x) => {
        filterCount[f][x] = false;
      });
    });
    filterProducts.forEach((product) => {
      const productFilters = product.filters;
      let found = false;

      Object.keys(productFilters).forEach((f) => {
        productFilters[f].forEach((x) => {
          if (checkedFilters.includes(x)) found = true;
        });
      });
      checkedFilters.length === 0 && (found = true);
      if (found === true && product.price < price) {
        newItems.push(product);
        Object.keys(productFilters).forEach((f) => {
          productFilters[f].forEach((x) => {
            filterCount[f][x] = true;
          });
        });
      }
    });
    if (loaded === true) {
      setLoaded(false);
      setNewProducts(newItems);
    }

    setFilteredProducts(newItems);
    setFilters(filterCount);
  };
  const filterList = (filter, label) => {
    const textBox = (value) => {
      const enable = checkedFilters.indexOf(value) !== -1;
      const disable = filter[value];
      return (
        <Box
          key={value}
          onClick={handleToggle(value, label)}
          sx={{
            width: '35px',
            height: '35px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: enable && '#d3540035',
            boxShadow: enable
              ? '#d35400 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'
              : 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
            ml: '9px',

            transition: '.1s ease-in-out',
            '&:hover': {
              boxShadow:
                '#d35400 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
            },
            '&:before': {
              content: "''",
              position: 'absolute',
              top: -2,
              right: -2,
              width: '10px',
              borderRadius: '50%',
              transform: enable ? 'scale(1)' : 'scale(0)',
              height: '10px',
              backgroundColor: 'secondary.main',
              transition: '.1s ease-in-out',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: '#bdc3c7',
              borderRadius: '10px',
              transform: !disable ? 'scale(1)' : 'scale(0)',
              transition: '.2s',
            }}
          />

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ textTransform: 'uppercase' }}
          >
            {value}
          </Typography>
        </Box>
      );
    };
    const colorBox = (value) => {
      const disable = filter[value];
      let color = colors[value];
      if (color === undefined) color = '#000000';
      const enable = checkedFilters.indexOf(value) !== -1;
      return (
        <Box
          key={value}
          onClick={handleToggle(value, label)}
          sx={{
            width: '35px',
            height: '35px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: enable ? '50%' : '10px',
            backgroundColor: color,
            ml: '9px',
            mb: '9px',
            overflow: 'hidden',
            transition: '.1s ease-in-out',
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
              transform: enable ? 'scale(1)' : 'scale(0)',
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
              transform: enable ? 'scale(1)' : 'scale(0)',
              transition: '.1s ease-in-out',
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backdropFilter: 'grayscale(200)',
              outline: '2px black',
              transform: disable ? 'scale(0)' : 'scale(1)',
            }}
          />
        </Box>
      );
    };
    const categBox = (value) => {
      const enable = checkedFilters.indexOf(value) !== -1;
      const disable = filter[value];
      return (
        <Box
          key={value}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '9px',
            height: '30px',
            color: 'text.secondary',
            position: 'relative',
          }}
        >
          <Checkbox
            value=''
            checked={enable}
            onChange={handleToggle(value, label)}
            sx={{
              color: disable ? 'secondary.main' : 'text.secondary',
              '&.Mui-checked': {
                color: disable ? 'secondary.main' : 'text.secondary',
              },
            }}
          />

          <Typography
            variant='body2'
            sx={{ textTransform: 'capitalize', color: enable && 'black' }}
          >
            {value}
          </Typography>
        </Box>
      );
    };
    return (
      <div key={label}>
        <ListItem component='div' disableGutters disablePadding>
          <ListItemButton
            sx={{ borderRadius: '10px', overflow: 'hidden' }}
            onClick={() =>
              setOpen((prevState) => ({ ...prevState, [label]: !open[label] }))
            }
          >
            {open[label] ? (
              <ExpandLess sx={{ pointerEvents: 'none' }} />
            ) : (
              <ExpandMore sx={{ pointerEvents: 'none' }} />
            )}
            <ListItemText
              primary={
                <Typography
                  variant='body1'
                  sx={{ fontWeight: '500', textTransform: 'capitalize' }}
                >
                  {label + 's'}
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open[label]} timeout='auto'>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              mt: 1,
              mb: 1,
            }}
          >
            {Object.keys(filter).map((value) => {
              return label === 'size'
                ? textBox(value)
                : label === 'color'
                ? colorBox(value)
                : categBox(value);
            })}
          </Box>
        </Collapse>
      </div>
    );
  };

  const list = () => {
    return (
      <List
        dense
        sx={{
          padding: 0,
          width: mobile ? '350px' : '250px',
          borderLeft: !mobile && '5px solid',
          borderColor: 'secondary.main',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: ['block', 'none'],
            width: 30,
            height: 6,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 3,
            position: 'absolute',
            top: 4,
            left: 'calc(50% - 15px)',
          }}
        />
        <ListItem component='div' disableGutters disablePadding>
          <ListItemButton
            sx={{ borderRadius: '10px', overflow: 'hidden' }}
            onClick={() =>
              setOpen((prevState) => ({ ...prevState, price: !open['price'] }))
            }
          >
            {open['price'] ? (
              <ExpandLess sx={{ pointerEvents: 'none' }} />
            ) : (
              <ExpandMore sx={{ pointerEvents: 'none' }} />
            )}
            <ListItemText
              primary={
                <Typography
                  variant='body1'
                  sx={{ fontWeight: '500', textTransform: 'capitalize' }}
                >
                  Price
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={open.price} timeout='auto'>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            <SliderComponent price={price} setPrice={setPrice} />
          </Box>
        </Collapse>
        {Object.keys(filters).map((filter) => {
          return filterList(filters[filter], filter);
        })}
        <ButtonGroup color='secondary' sx={{ width: '100%', mt: 0.75 }}>
          <Button
            color='secondary'
            variant='outlined'
            sx={{ width: '100%' }}
            onClick={() => {
              storeFilters();
              setNewProducts(filteredProducts);
              setMenu(false);
            }}
          >
            Apply filters
          </Button>
          <Button
            disabled={checkedFilters.length > 0 ? false : true}
            aria-label='filters'
            variant='contained'
            color='secondary'
            sx={{
              textTransform: 'none',
              boxShadow: 'none',
              borderRadius: '10px',
            }}
            onClick={() => setCheckedFilters([])}
          >
            <ClearIcon />
          </Button>
        </ButtonGroup>
      </List>
    );
  };

  return (
    <>
      {mobile ? (
        <Drawer
          anchor='bottom'
          sx={{
            '& .MuiDrawer-paper': {
              pt: 1,
              pb: 3,
              borderRadius: '10px',
            },
          }}
          open={menu}
          onClose={() => setMenu(false)}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {list()}
          </Box>
        </Drawer>
      ) : (
        <Container
          ref={componentRef}
          maxWidth='lg'
          sx={{
            position: 'absolute',
            top: 88,
            width: '250px',
            left: 0,
          }}
        >
          <Box sx={{ width: '100%' }}>
            <Collapse in={menu} orientation='horizontal'>
              {list()}
            </Collapse>
          </Box>
        </Container>
      )}
    </>
  );
};

export default FilterMenu;
