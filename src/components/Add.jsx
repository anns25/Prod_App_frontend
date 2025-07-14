
import { Box, TextField, Button, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';

const Add = ({ onProductAdd, handleDrawer }) => {

    const handleAddProduct = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formObject = {
            title: formData.get('title'),
            price: formData.get('price'),
            category: formData.get('category'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
        };
        axios.post('https://fakestoreapi.com/products', formObject)
            .then(response => {
                onProductAdd(response.data);
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
                px : 3,
                py : 5
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

                <Typography variant="h6" align="center" gutterBottom sx={{fontWeight : "bold", pb : 2}}>
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
                    />
                    <TextField
                        label="Price"
                        name="price"
                        fullWidth
                        required
                        type = "number"
                    />
                    <TextField
                        label="Category"
                        name="category"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
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
                        Add Product
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Add;
