import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import api from '../scripts/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState({
    message: '',
    error: false
  });
  const [passwordError, setPasswordError] = useState({
    message: '',
    error: false
  });
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    if (login.length === 0) {
      setLoginError({
        message: 'Field cannot be empty.',
        error: true
      });
      return;
    }
    if (password.length === 0) {
      setPasswordError({
        message: 'Field cannot be empty.',
        error: true
      });
      return;
    }
    try {
      setLoading(true);
      const resp = await api.post(
        'auth/login',
        {
          email: login,
          password: password
        },
        false
      );

      api.token = resp.token;
      api.refreshToken = resp.refreshToken;
      sessionStorage.setItem('userData', JSON.stringify(resp.userData));
      navigate('/', { replace: true });
    } catch (error) {
      const errMessage = await error.json();
      setLoginError(errMessage);
      setPasswordError(errMessage);
      setLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    setLoginError({
      message: '',
      error: false
    });
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordError({
      message: '',
      error: false
    });
    setPassword(e.target.value);
  };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleForm} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            label="E-Mail"
            type="email"
            error={loginError.error}
            helperText={loginError.message}
            onChange={handleLoginChange}
            fullWidth
            required
            autoFocus
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            error={passwordError.error}
            helperText={passwordError.message}
            onChange={handlePasswordChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth>
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                No account? Sign up.
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Backdrop open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Login;
