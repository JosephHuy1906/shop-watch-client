import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAppStore } from '../../appStore';


function AddProduct({ closeEvent }) {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [mota, setMota] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [avatar, setAvatar] = useState('');
    const setRows = useAppStore( (state) => state.setRows)

    useEffect(() => {
        cate();
    }, []);
    const cate = () => {
        axios
            .get('http://localhost:6060/category')
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err));
    };


    const handleName = (e) => {
        setName(e.target.value);
    };
    const handlePrice = (e) => {
        setPrice(e.target.value);
    };
    const handleAvata = (e) => {
        setAvatar(e.target.value);
    };
    const handleMota = (e) => {
        setMota(e.target.value);
    };
    const handleCategory = (e) => {
        setCategoryId(e.target.value);
    };

    const add = () => {
        const products = {
            name: name,
            price: price,
            avatar: avatar,
            categoryId: categoryId,
            mota: mota,
        };
        addProduct(products);
        closeEvent();
        Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
        apiProduct();
    };
    const apiProduct = async () => {
        await axios.get('http://localhost:6060/apiproduct').then((res) => {
            setRows(res.data);
        });
    };

    const addProduct = (data) => {
        axios
            .post('http://localhost:6060/apiproduct', data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add Product
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                X
            </IconButton>
            <Box height={20} />

            <Grid container spacing={2} align="center">
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handleName}
                        value={name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        size="small"
                        type="number"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CurrencyExchangeIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: 150 }}
                        onChange={handlePrice}
                        value={price}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Category"
                        defaultValue="EUR"
                        size="small"
                        sx={{ width: 150 }}
                        onChange={handleCategory}
                        value={categoryId}
                    >
                        {category.map((option) => (
                            <MenuItem key={option.categoryId} value={option.categoryId}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="describe"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handleMota}
                        value={mota}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Images"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={handleAvata}
                        value={avatar}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={add}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default AddProduct;
