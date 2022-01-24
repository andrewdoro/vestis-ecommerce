import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, IconButton, Box, Container, Card } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import categories from '../../constants/categories';

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 'auto',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          position: 'relative',
          display: 'flex',
          height: '200px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h5'
          sx={{ fontWeight: '700', zIndex: 1 }}
          color='inherit'
        >
          VESTIS FOOTER
        </Typography>
        <Card
          variant='flex'
          flex='row'
          sx={{
            width: '250px',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            color='inherit'
            component={Link}
            to='/'
          >
            Home
          </Typography>
          {categories.map(({ name, link }) => {
            return (
              <Typography
                key={name}
                variant='subtitle1'
                color='inherit'
                component={Link}
                to={link}
              >
                {name}
              </Typography>
            );
          })}
          <Typography
            variant='subtitle1'
            color='inherit'
            component={Link}
            to='/about'
          >
            About
          </Typography>
        </Card>

        <Card variant='flex' sx={{ justifyContent: 'center' }}>
          <IconButton
            href='https://www.facebook.com/simple.is.12/'
            color='inherit'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookOutlinedIcon fontSize='medium' />
          </IconButton>
          <IconButton
            href='https://www.instagram.com/andrei._dorobantu/'
            color='inherit'
            target='_blank'
            rel='noreferrer'
          >
            <InstagramIcon fontSize='medium' />
          </IconButton>
          <IconButton
            href='https://www.linkedin.com/in/andrei-ovidiu-dorobantu-56a316140/'
            color='inherit'
            target='_blank'
            rel='noreferrer'
          >
            <LinkedInIcon fontSize='medium' />
          </IconButton>
        </Card>
        <Typography
          variant='body2'
          color='inherit'
          sx={{ textAlign: 'center', zIndex: 1 }}
        >
          &copy; 2021 Andrei-Ovidiu Dorobantu
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
