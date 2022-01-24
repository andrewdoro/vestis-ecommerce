import React from 'react';
import { Box, Button, Container, Grid, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import images from '../../images/images';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Container maxWidth='lg' sx={{ mt: [5, 5, 0] }}>
      <Grid container sx={{ minHeight: 'calc(100vh - 64px)' }} spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack>
              <Typography variant='h2' gutterBottom sx={{ fontWeight: '700' }}>
                Shopping was never so easy
              </Typography>
              <Typography variant='body1' sx={{ lineHeight: 2 }}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Impedit quae, facilis rerum quod quos, fugit deserunt aliquid
                deleniti molestias itaque sit maiores tempora consectetur
                eligendi recusandae voluptatum voluptatibus, iure nam!{' '}
              </Typography>
              <Stack direction='row' alignItems='center' mt={5} spacing={4}>
                <Button
                  variant='outlined'
                  endIcon={<ArrowForwardIcon />}
                  component={Link}
                  to='/about'
                  sx={{ width: '200px' }}
                >
                  Find more
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid container item xs={12} md={6} spacing={3}>
          <Grid item xs={6}>
            <Box
              sx={{
                position: 'relative',
                height: '90%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link to='/products/woman' style={{ width: '100%' }}>
                <motion.div
                  intial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -20,
                  }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <Box
                    component='img'
                    sx={{
                      width: '100%',
                      height: ['200px', '300px', '400px'],
                      objectFit: 'cover',
                      borderRadius: '15px',
                    }}
                    src={images.home.homeWoman}
                  ></Box>
                </motion.div>

                <Typography
                  variant='h4'
                  sx={{ opacity: '20%', mt: 1, fontWeight: '500' }}
                >
                  Woman Collection
                </Typography>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                height: '110%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Link to='/products/man' style={{ width: '100%' }}>
                <Typography
                  className='home-text'
                  variant='h4'
                  sx={{
                    opacity: '20%',
                    mb: 1,
                    fontWeight: '500',
                  }}
                >
                  Man Collection
                </Typography>
                <motion.div
                  intial={{ scale: 1 }}
                  whileHover={{
                    scale: 1.05,
                    y: 20,
                  }}
                  transition={{ ease: 'easeInOut' }}
                >
                  <Box
                    component='img'
                    sx={{
                      width: '100%',
                      height: ['200px', '300px', '400px'],
                      objectFit: 'cover',
                      objectPosition: 'top',
                      borderRadius: '15px',
                    }}
                    src={images.home.homeMan}
                  ></Box>
                </motion.div>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
