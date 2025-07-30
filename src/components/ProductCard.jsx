import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


const ProductCard = ({product, handleEditDrawerOpen, handleDelete}) => {

    
    return (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{
            
                width : "100%",
                height: "450px",
                margin: 'auto',
                borderRadius: 3,
                boxShadow: 3,
                textAlign: 'center',
            }}>
                <CardContent>
                    <Typography gutterBottom variant="h1" component="div" sx={{ fontSize: "18px", color: "#212529", height: "48px", maxWidth: "250px", marginBottom: "12px" }}>
                        {(product.title.length > 45) ? product.title.slice(0, 45) + "..." : product.title}
                    </Typography>
                    <Box
                        sx={{ height: "100px", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={product.image}
                            sx={{ height: "100%", width: "auto", objectFit: "contain", my: 2, mx: "auto" }}
                            alt={product.title}
                        />

                    </Box>
                    <Box sx={{ height: "43.2px" }}>
                        <p variant="body2" color="text.secondary" sx={{ fontSize: "18px" }}>
                            {product.description.slice(0, 50)}...
                        </p>
                    </Box>
                    <Typography variant="h6" sx={{ color: 'green', mt: 2, fontSize: "30px", fontWeight: "700" }}>
                        ₹{product.price}
                    </Typography>
                </CardContent>

                <Box px={2} pb={1}>
                    <Link to={`product/${product._id}`}>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: '#007bff', color: '#fff', mb: 1, textTransform: "none" }}
                        >
                            View Product
                        </Button>
                    </Link>
                    <Box display="flex" justifyContent="space-between" gap={1}>
                        <Button
                            onClick={() => handleDelete(product._id)}
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: 'red', color: '#fff', textTransform: "none" }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ backgroundColor: 'limegreen', color: '#fff', textTransform: "none" }} onClick={() => handleEditDrawerOpen(product)}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}

export default ProductCard