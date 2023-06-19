import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAppStore } from '../../appStore';
import { useNavigate } from 'react-router-dom';


function AddCate({ closeEvent }) {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const setRows = useAppStore( (state) => state.setRows)
    const navigate = useNavigate();
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

    const add = () => {
        const products = {
            name: name,
        };
        addCate(products);
        closeEvent();
        Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
        navigate('/admin/cate')
    };


    const addCate = (data) => {
        axios
            .post('http://localhost:6060/category', data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Add Category
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
                    <Button variant="contained" onClick={add}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default AddCate;
