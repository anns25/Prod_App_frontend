

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import Drawer from '@mui/material/Drawer';

import axios from 'axios';
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import Add from '../components/Add';
import Edit from '../components/Edit';
import ProductCard from '../components/ProductCard';
import Pagination from '@mui/material/Pagination';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);

    const [editDrawerOpen, setEditDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleEditDrawerOpen = (product) => {
        setSelectedProduct(product);
        setEditDrawerOpen(true);
    };

    const handleEditDrawerClose = () => {
        setSelectedProduct(null);
        setEditDrawerOpen(false);
    };

    const fetchProducts = () => {
        axios.get("http://localhost:3000/product/all")
            .then((res) => { setProducts(res.data.data) })
            .catch((err) => console.log(err));
    }

    const onProductAdd = (newProduct) => {
        setProducts(prevProducts => [newProduct, ...prevProducts]);
        setCurrentPage(1);
    }

    const handleEditProduct = (edit_id, newProduct) => {
        setProducts(products.map(product => product._id === edit_id ? newProduct : product));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (del_id) => {
        try {
            const res = await axios.delete('http://localhost:3000/product/deleteProduct', {
                data: { product_id: del_id },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (res.status === 200) {
                setProducts(products.filter(product => product._id !== del_id));
                toast.success("Deletion completed successfully !");
            }
            else {
                toast.error("Could not delete product !");
            }
        }
        catch (err) {
                toast.error("Error: Could not delete product!");
            
        }
    }



    // HANDLING PAGINATION

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Show 8 per page

    // Calculate product indexes for each page

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentPageProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);


    return (
        <>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h1>All Products</h1>
                <Button variant="contained" sx={{ mb: 5 }} onClick={toggleDrawer(true)}>Add Product</Button>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <Add onProductAdd={onProductAdd} handleDrawer={toggleDrawer} />
                </Drawer>

                {/* PRODUCT CATALOG GENERATION USING MAP */}
                <Grid container spacing={2} sx={{
                    width: '100%',
                    minHeight: '60vh',
                    justifyContent: 'flex-start',
                    alignItems: 'stretch'
                }}>
                    {currentPageProducts.map(product => (
                        <
                            ProductCard
                            product={product}
                            handleEditDrawerOpen={handleEditDrawerOpen}
                            handleDelete={handleDelete}
                            key={product._id}
                        />
                    ))}
                </Grid>
                <Drawer anchor="right" open={editDrawerOpen} onClose={handleEditDrawerClose}>
                    <Edit
                        product={selectedProduct}
                        onProductEdit={handleEditProduct}
                        handleDrawer={handleEditDrawerClose}
                    />
                </Drawer>

                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                    sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'stretch' }} />

            </Container >

        </>
    )
}

export default Home
