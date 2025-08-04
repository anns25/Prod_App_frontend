import { Box, TextField, Button, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { useState } from 'react';
import { safeParse } from 'valibot';
import { userSchema } from '../validation/userSchema';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { login } = useAuth();
  const { signUp } = useAuth();
  const { error } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const result = safeParse(userSchema, { username, password });
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    login(username, password);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const result = safeParse(userSchema, { username, password });
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
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
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          error={Boolean(errors.username)}
          helperText={errors.username}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          name="password"
          required
          error={Boolean(errors.password)}
          helperText={errors.password}
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