
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { safeParse } from 'valibot';
import { productSchema } from '../validation/productSchema';


const Edit = ({ product, onProductEdit, handleDrawer }) => {

    const [data, setData] = useState({
        id: "",
        title: "",
        price: "",
        category: "",
        image: "",
        description: ""
    });

    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (product) {
            setData({
                _id: product._id,
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
        setData(prev => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value
        }));
    };

    const handleEditProduct = (e) => {
        e.preventDefault();

        const result = safeParse(productSchema, data);


        if (!result.success) {
            const fieldErrors = {};
            result.issues.forEach(issue => {
                const field = issue.path?.[0].key;

                fieldErrors[field] = issue.message;
            });
            setErrors(fieldErrors);

            return;
        }


        axios.patch('http://localhost:3000/product/updateProduct', { product_id: data._id, ...data },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(res => {
                onProductEdit(data._id, res.data.data);
                toast.success("Product Edited Successfully ! 🎉");
                handleDrawer();
            })
            .catch((err) => {
                if (err.status === 403) {
                    toast.error("Unauthorized access : Product cannot be edited");
                }
                else
                    toast.error("Error : Product could not be edited !");
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
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        required
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                    />
                    <TextField
                        label="Image URL"
                        name="image"
                        value={data.image}
                        onChange={handleChange}
                        fullWidth
                        required
                        error={Boolean(errors.image)}
                        helperText={errors.image}
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
                        Edit Product
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Edit;
