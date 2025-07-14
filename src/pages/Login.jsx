import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useAuth();
  const { signUp } = useAuth();
  const { error } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    login(username, password);

  }

  const handleSignUp = (e) => {
    e.preventDefault();

    signUp(username, password);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 350,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          name = "username"
          required
          error = {Boolean(error)}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name = "password"
          required
          error = {Boolean(error)}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}


        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{ mt: 2, bgcolor: '#0d6efd', '&:hover': { bgcolor: '#0b5ed7' } }}
        >
          Login
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSignUp}
          sx={{ mt: 2, bgcolor: '#0d6efd', '&:hover': { bgcolor: '#0b5ed7' } }}
        >
          Sign Up
        </Button>
      </Paper>
    </Box>
  )
}

export default Login