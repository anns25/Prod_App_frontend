
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { safeParse } from 'valibot';
import { productSchema } from '../validation/productSchema';
import { useState } from 'react';

const Add = ({ onProductAdd, handleDrawer }) => {

    const [errors, setErrors] = useState({});

    const handleAddProduct = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formObject = {
            title: formData.get('title'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            image: formData.get('imageUrl'),
            description: formData.get('description'),
        };

        //Validation

        const result = safeParse(productSchema, formObject);


        if (!result.success) {
            const fieldErrors = {};
            result.issues.forEach(issue => {
                const field = issue.path?.[0].key;

                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);

            return;
        }

        axios.post('http://localhost:3000/product/add', formObject,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        )
            .then(response => {
                onProductAdd(response.data.data);
                toast.success("Product Added Successfully ! 🎉");
                handleDrawer(false)();
            })
            .catch(err => {
                console.log("Could not add product", err);
                toast.error("Error : Could not add product !");
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
                    onClick={() => handleDrawer(false)()}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", pb: 2 }}>
                    Add Product
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleAddProduct}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        required
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        fullWidth
                        required
                        type="number"
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        fullWidth
                        required
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        fullWidth
                        required
                        error={Boolean(errors.image)}
                        helperText={errors.image}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        multiline
                        rows={3}
                        fullWidth
                        required
                        error={Boolean(errors.description)}
                        helperText={errors.description}
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
                        Add Product
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Add;
