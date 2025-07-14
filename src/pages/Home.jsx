

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Grid from '@mui/material/Grid';

import Drawer from '@mui/material/Drawer';
import { v4 as uuidv4 } from 'uuid';

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
        axios.get("https://fakestoreapi.com/products")
            .then((res) => { setProducts(res.data) })
            .catch((err) => console.log(err));
    }

    const handleAddProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: uuidv4() };
        setProducts(prevProducts => [...prevProducts, productWithId])
    }

    const handleEditProduct = (edit_id, newProduct) => {
        setProducts(products.map(product => product.id === edit_id ? newProduct : product));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (del_id) => {

        axios.delete(`https://fakestoreapi.com/products/${del_id}`)
            .then(res => setProducts(products.filter(product => product.id !== del_id)))
            .catch(err => {
                console.log("Error : ", err);
                toast.error("Error : Could not delete product !")
            });

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
                    <Add onProductAdd={handleAddProduct} handleDrawer={toggleDrawer} />
                </Drawer>

                {/* PRODUCT CATALOG GENERATION USING MAP */}
                <Grid container spacing={2}>
                    {currentPageProducts.map(product => (
                        <
                            ProductCard
                            product={product}
                            handleEditDrawerOpen={handleEditDrawerOpen}
                            handleDelete={handleDelete}
                            key={product.id}
                        />
                    ))}
                    <Drawer anchor="right" open={editDrawerOpen} onClose={handleEditDrawerClose}>
                        <Edit
                            product={selectedProduct}
                            onProductEdit={handleEditProduct}
                            handleDrawer={handleEditDrawerClose}
                        />
                    </Drawer>
                </Grid>


                <Pagination
                    count={Math.ceil(products.length / productsPerPage)}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                    sx={{ mt: 4, display: 'flex', justifyContent: 'center' }} />

            </Container >

        </>
    )
}

export default Home
