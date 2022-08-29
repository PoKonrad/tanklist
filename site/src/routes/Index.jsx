import { AppBar, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import TankTable from '../components/TankTable';
import api from '../scripts/api';

const Index = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  return (
    <>
      <AppBar
        sx={{
          height: '3rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <Typography sx={{ ml: '1rem' }}>Logged in as {userData.email}</Typography>
        <Button
          color="inherit"
          onClick={async () => {
            await api.logOut();
            navigate('/login');
          }}
        >
          Log Out
        </Button>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: '5rem' }}>
        <TankTable />
      </Container>
    </>
  );
};

export default Index;
