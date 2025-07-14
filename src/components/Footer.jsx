
import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                px: 2,
                mt: 4,
                textAlign: 'center',
                backgroundColor: 'black',
                color: 'white',
            }}
        >
            <Container maxWidth="md">
                <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 2, py:2}}>
                    <Link href="#" color="inherit" underline="hover">
                        Home
                    </Link>
                    <Link href="#" color="inherit" underline="hover">
                        About
                    </Link>
                    <Link href="#" color="inherit" underline="hover">
                        Contact
                    </Link>
                </Stack>

                {/* Social Icons */}
                <Stack direction="row" spacing={2} justifyContent="center" sx={{pb:1}}>
                    <IconButton color="inherit" href="https://facebook.com">
                        <FacebookIcon />
                    </IconButton>
                    <IconButton color="inherit" href="https://twitter.com">
                        <TwitterIcon />
                    </IconButton>
                    <IconButton color="inherit" href="https://instagram.com">
                        <InstagramIcon />
                    </IconButton>
                </Stack>
                <Typography variant="body2" sx={{py: 2}}>
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </Typography>
            </Container>

        </Box>
    );
}

export default Footer;
