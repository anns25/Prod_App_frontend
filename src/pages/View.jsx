import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardMedia, Typography, Button, Grid, Paper, CircularProgress, Box } from "@mui/material";
import { toast } from 'react-toastify';


const View = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/product/viewProduct/${id}`)
            .then((res) => { setProduct(res.data.data) })
            .catch((err) => {
                console.log(err);
                toast.error("Could not load product details");
            });
    }, [id]);

    if (!product) {
        return (<Box sx={{ width: "100%", height: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Box>)
    }


    return (
        <Paper
            elevation={3}
            sx={{
                maxWidth: 1000,
                mx: "auto",
                mt: 5,
                p: 4,
                borderRadius: 3,
                backgroundColor: "#fafafa",
            }}
        >
            <Grid container spacing={4} alignItems="center">
                {/* Left Column - Image */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.title}
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: 300,
                            objectFit: "contain",
                        }}
                    />
                </Grid>

                {/* Right Column - Details */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        {product.title}
                    </Typography>

                    <Typography variant="h6" gutterBottom color="green" sx={{ fontWeight: "bold" }}>
                        ₹{product.price}
                    </Typography>

                    <Typography gutterBottom sx={{ color: "#c90775" }}>
                        <span sx={{ fontWeight: 600 }}>Category: </span>
                        <span>{product.category}</span>
                    </Typography>

                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {product.description}
                    </Typography>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleNavigate}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default View