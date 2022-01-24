import {
  Container,
  Grid,
  Typography,
  Card,
  Avatar,
  Chip,
  Box,
} from '@mui/material';
import React from 'react';
import images from '../../images/images';
import DesignServicesIcon from '@mui/icons-material/DesignServices';

const About = () => {
  return (
    <>
      <Container maxWidth='lg' sx={{ mt: 10, pl: 3, pr: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card
              variant='flex'
              flex='column'
              sx={{ alignItems: 'flex-start' }}
            >
              <Typography
                variant='subtitle1'
                component={'div'}
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Box
                  sx={{
                    width: '30px',
                    height: '3px',
                    backgroundColor: 'black',
                    mr: 1,
                  }}
                />
                Vestis Project
              </Typography>
              <Typography variant='h2' gutterBottom>
                More About This Project
                <Box
                  sx={{ color: 'transparent', WebkitTextStroke: `2px black` }}
                >
                  E-Commerce.
                </Box>
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} container justifyContent='space-between'>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant='body1' gutterBottom>
                Design & Functionality
              </Typography>
              <Typography variant='h5' fontWeight={700} gutterBottom>
                Modern design and responsive shop management.
              </Typography>
              <Card
                variant='flex'
                flex='column'
                sx={{ p: 2, display: ['none', 'flex'], height: '100%' }}
              >
                <Box
                  sx={{
                    width: [null, '150px', '300px'],
                    height: [null, '150px', '300px'],
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <DesignServicesIcon sx={{ fontSize: [null, 50, 100] }} />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Card variant='flex' flex='column'>
                <Typography variant='body2' gutterBottom>
                  Vestis is a showcase project designed to use the latest
                  technologies of front-end web design. It integrates the
                  flexibility of Material-UI with the capabilities of the React
                  Framework and the API provided by Commerce.js.
                </Typography>
                <Grid container spacing={3} mt={1} justifyContent='center'>
                  <Grid item xs={4}>
                    <Box
                      component='img'
                      src={images.icons.react}
                      sx={{ width: '100%', height: '100px' }}
                    />
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      sx={{ textAlign: 'center' }}
                    >
                      React
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      component='img'
                      src={images.icons.material}
                      sx={{ width: '100%', height: '100px' }}
                    />
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      sx={{ textAlign: 'center' }}
                    >
                      Material-UI
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      component='img'
                      src={images.icons.commerce}
                      sx={{ width: '100%', height: '100px' }}
                    />
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      sx={{ textAlign: 'center' }}
                    >
                      Commerce.js
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      component='img'
                      src={images.icons.redux}
                      sx={{ width: '100%', height: '100px' }}
                    />
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      sx={{ textAlign: 'center' }}
                    >
                      Redux
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      component='img'
                      src={images.icons.stripe}
                      sx={{ width: '100%', height: '100px' }}
                    />
                    <Typography
                      variant='body2'
                      fontWeight={500}
                      sx={{ textAlign: 'center' }}
                    >
                      Stripe
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={3} mt={4} mb={5}>
            <Grid item xs={12}>
              <Typography variant='body1' textAlign='center'>
                About Me
              </Typography>
              <Typography
                variant='h5'
                fontWeight={700}
                textAlign='center'
                gutterBottom
              >
                Personal description
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} container justifyContent='center'>
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    bottom: -10,
                    left: -10,
                    position: 'absolute',
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    backgroundColor: 'secondary.main',
                    zIndex: 1,
                  }}
                />

                <Avatar
                  alt='Andrew Dorobantu'
                  src={images.infoAvatar}
                  sx={{
                    height: '200px',
                    width: '200px',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card
                variant='flex'
                flex='column'
                sx={{
                  p: 2,
                  textAlign: ['center', 'start'],
                  alignItems: ['center', 'flex-start'],
                }}
              >
                <Typography variant='subtitle1' fontWeight={500}>
                  Andrei Ovidiu-Dorobantu
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Hello my name is Andrew and I am a front-end web developer.
                </Typography>

                <Grid
                  container
                  spacing={1}
                  sx={{ justifyContent: ['center', 'flex-start'], mt: 2 }}
                >
                  <Grid item>
                    <Chip variant='filled' label='javascript'></Chip>
                  </Grid>
                  <Grid item>
                    <Chip variant='filled' label='html'></Chip>
                  </Grid>
                  <Grid item>
                    <Chip variant='filled' label='css'></Chip>
                  </Grid>
                  <Grid item>
                    <Chip variant='filled' label='react'></Chip>
                  </Grid>
                  <Grid item>
                    <Chip variant='filled' label='material-ui'></Chip>
                  </Grid>
                  <Grid item>
                    <Chip variant='filled' label='react-redux'></Chip>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} mt={10}></Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;
