
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Edit = ({ product, onProductEdit, handleDrawer }) => {

    const [data, setData] = useState({
        id: "",
        title: "",
        price: "",
        category: "",
        image: "",
        description: ""
    });

    useEffect(() => {
        if (product) {
            setData({
                id: product.id,
                title: product.title || "",
                price: product.price || "",
                category: product.category || "",
                image: product.image || "",
                description: product.description || ""
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditProduct = (e) => {
        e.preventDefault();
        axios.put(`https://fakestoreapi.com/products/${data.id}`, data)
            .then(response => {
                onProductEdit(data.id, response.data);
                toast.success("Product Edited Successfully ! 🎉");
                handleDrawer();
            })
            .catch((err) => {
                console.log("Edit Unsuccessful", err);
                toast.error("Error : Product could not be edited !")
            });

    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                bgcolor: '#f5f5f5',
                px: 3,
                py: 5
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: 300,
                    position: 'relative',
                    borderRadius: 2
                }}
            >
                {/* Close icon */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, left: 8, color: 'green' }}
                    onClick={handleDrawer}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", pb: 2 }}>
                    Edit Product
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleEditProduct}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Image URL"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            bgcolor: 'green',
                            '&:hover': { bgcolor: 'darkgreen' },
                            color: '#fff'
                        }}
                    >
                        Edit Product
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Edit;
