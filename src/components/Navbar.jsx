import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const menuItems = ['Home', 'About', 'Contact'];
  const { logout } = useAuth();

  return (
    <>
    <AppBar position="static" sx={{ boxShadow: 0, backgroundColor: "black"}}>
      <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
        <Toolbar disableGutters sx={{ px: 2 }}>

          {/* App Name / Logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ProductApp
          </Typography>

          {/* Horizontal Menu Buttons */}
          <Box>
            {menuItems.map((item,index) => (
              <Button key={index} color="inherit" >
                {item}
              </Button>
            ))}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    

    </>
  );
}

export default Navbar;
