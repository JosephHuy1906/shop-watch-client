import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAppStore } from '../../appStore';


function EditCate({ fid, closeEvent }) {
    const [category, setCategory] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const setRows = useAppStore((state) => state.setRows);
    

    useEffect(() => {
        cate();
        console.log('Fid: ' + fid.categoryId);
        setName(fid.name);
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
 

    const edit = () => {
        const products = {
            name: name,
        };
        editCate(products);
        closeEvent();
        Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
        window.location.reload();
    };


    const editCate = async (data) => {
        await axios
            .put('http://localhost:6060/category/' + fid.categoryId, data)
            .then((res) => {
                setRows(res.data);
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Edit Category
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
              
                <Grid item xs={12}>
                    <Button variant="contained" onClick={edit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default EditCate;
