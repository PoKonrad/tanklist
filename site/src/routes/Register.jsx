import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  Collapse
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import api from '../scripts/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState();
  const [button, setButton] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const [emailError, setEmailError] = useState();
  const [lastNameError, setLastNameError] = useState();
  const [firstNameError, setFirstNameError] = useState();
  const [countryError, setCountryError] = useState();
  const [error, setError] = useState({
    error: false,
    message: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError({
      error: false,
      message: ''
    });

    if (!name) {
      setFirstNameError({
        error: true,
        message: 'Field cannot be empty'
      });
      return;
    }
    if (!lastname) {
      setLastNameError({
        error: true,
        message: 'Field cannot be empty'
      });
      return;
    }
    if (!email) {
      setEmailError({
        error: true,
        message: 'Field cannot be empty'
      });
      return;
    }
    if (!password) {
      setPasswordError({
        error: true,
        message: 'Field cannot be empty'
      });
      return;
    }
    if (!country) {
      setCountryError({
        error: true,
        message: 'Field cannot be empty'
      });
      return;
    }

    try {
      await api.post(
        '/auth/register',
        {
          name: `${name} ${lastname}`,
          country: country,
          email: email,
          password: password,
          button: button
        },
        false
      );

      const tokens = await api.post(
        '/auth/login',
        {
          email: email,
          password: password
        },
        false
      );

      (api.refreshToken = tokens.refreshToken), (api.token = tokens.token);
      sessionStorage.setItem('userData', JSON.stringify(tokens.userData));
      navigate('/');
    } catch (error) {
      setError(await error.json());
    }
  };

  const handlePassword = (e) => {
    if (
      e.target.value.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/g
      )
    ) {
      setPassword(e.target.value);
      setPasswordError({ error: false, message: '' });
    } else {
      setPasswordError({
        message:
          'Must contain at least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
        error: true
      });
    }
  };

  const handleEmail = (e) => {
    if (
      e.target.value
        .toLowerCase()
        .match(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
        )
    ) {
      setEmail(e.target.value);
      setEmailError({ error: false, message: '' });
    } else {
      setEmailError({
        message: 'Not a valid email address',
        error: true
      });
    }
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
        <LockOutlinedIcon sx={{ m: 1 }} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                error={firstNameError?.error}
                helperText={firstNameError?.message}
                fullWidth
                label="First Name"
                autoFocus
                onChange={(e) => {
                  setName(e.target.value);
                  setFirstNameError();
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                error={lastNameError?.error}
                helperText={lastNameError?.message}
                fullWidth
                label="Last Name"
                autoComplete="family-name"
                onChange={(e) => {
                  setLastname(e.target.value);
                  setLastNameError();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                error={emailError?.error}
                helperText={emailError?.message}
                fullWidth
                type="email"
                label="Email Address"
                autoComplete="email"
                onChange={handleEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                helperText={passwordError?.message}
                error={passwordError?.error}
                autoComplete="new-password"
                label="Password"
                type="password"
                onChange={handlePassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                error={countryError?.error}
                helperText={countryError?.message}
                label="Country of origin"
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCountryError();
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="Has Button?" color="primary" />}
                label="Has Button?"
                onChange={(e) => setButton(e.target.checked)}
              />
            </Grid>
          </Grid>
          <Collapse in={error.error}>
            <Alert severity="error">{error.message}</Alert>
          </Collapse>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
