import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, Skeleton, useMediaQuery } from '@mui/material';

import Filter from './Filter';
import Product from './Product/Product';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
const Products = () => {
  const { category } = useParams();
  const [sortOption, setSortOption] = useState('name');
  const [newProducts, setNewProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [menu, setMenu] = useState(false);
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const selectedSort = sessionStorage.getItem('sortOption') || 'name';
    setSortOption(selectedSort);
  }, []);
  const sort = (items, option) => {
    switch (option) {
      case 'name':
        return items.sort((a, b) => (a.name > b.name ? 1 : -1));
      case 'up':
        return items.sort((a, b) => (a.price.raw > b.price.raw ? 1 : -1));
      case 'down':
        return items.sort((a, b) => (a.price.raw < b.price.raw ? 1 : -1));
      default:
        return items.sort((a, b) => (a.name > b.name ? 1 : -1));
    }
  };
  const mobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    let it = products.filter(
      (product) => product.categories[0].slug === category
    );
    it = it.filter((product) => {
      return newProducts.some((item) => item.id === product.id);
    });
    it = sort(it, sortOption);
    setItems(it);
  }, [newProducts, sortOption]);

  const renderProducts = () => (
    <>
      <Container maxWidth='lg'>
        <Grid
          container
          direction='row'
          spacing={3}
          sx={{
            pl: !mobile && menu && '300px',
            transition: '.3s',
          }}
        >
          {items.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
  const loadingView = () => (
    <Container maxWidth='lg'>
      <Grid
        container
        direction='row'
        spacing={3}
        sx={{
          pl: !mobile && menu && '300px',
          transition: '.3s',
        }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: ['60vh', '50vh'], mb: 1 }}
          />
          <Box sx={{ p: 2 }}>
            <Skeleton
              variant='text'
              width='100%'
              sx={{ height: '20px', mb: 1 }}
            />
            <Card variant='flex' flex='flex'>
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px', mr: 1 }}
              />
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px' }}
              />
            </Card>
            <Skeleton variant='text' width='50%' sx={{ height: '20px' }} />
          </Box>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: '35px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: ['60vh', '50vh'], mb: 1 }}
          />
          <Box sx={{ p: 2 }}>
            <Skeleton
              variant='text'
              width='100%'
              sx={{ height: '20px', mb: 1 }}
            />
            <Card variant='flex' flex='flex'>
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px', mr: 1 }}
              />
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px' }}
              />
            </Card>
            <Skeleton variant='text' width='50%' sx={{ height: '20px' }} />
          </Box>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: '35px' }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: ['60vh', '50vh'], mb: 1 }}
          />
          <Box sx={{ p: 2 }}>
            <Skeleton
              variant='text'
              width='100%'
              sx={{ height: '20px', mb: 1 }}
            />
            <Card variant='flex' flex='flex'>
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px', mr: 1 }}
              />
              <Skeleton
                variant='rectangular'
                width='30px'
                sx={{ height: '10px' }}
              />
            </Card>
            <Skeleton variant='text' width='50%' sx={{ height: '20px' }} />
          </Box>
          <Skeleton
            variant='rectangular'
            width='100%'
            sx={{ height: '35px' }}
          />
        </Grid>
      </Grid>
    </Container>
  );
  return (
    <>
      <Filter
        sortOption={sortOption}
        setSortOption={setSortOption}
        menu={menu}
        setMenu={setMenu}
        setNewProducts={setNewProducts}
        category={category}
        newProducts={newProducts}
      />
      {!loading ? renderProducts() : loadingView()}
    </>
  );
};
export default Products;
