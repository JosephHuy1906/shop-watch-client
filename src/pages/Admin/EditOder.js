import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAppStore } from '../../appStore';

function EditOder({ fid, closeEvent }) {
    const [status, setStatus] = useState([]);
    const [statusId, setStatusId] = useState('');



    const setRows = useAppStore((state) => state.setRows);

    useEffect(() => {
        cate();
        console.log(fid.oderId);
        setStatusId(fid.statusId);
    }, []);
    const cate = () => {
        axios
            .get('http://localhost:6060/oder/status')
            .then((res) => setStatus(res.data))
            .catch((err) => console.log(err));
    };

    const handleCategory = (e) => {
        setStatusId(e.target.value);
    };

    const add = () => {
        const products = {
            statusId: statusId,
        };
        closeEvent();
        editOder(products)
        Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
    };


    const editOder = async (data) => {
        await axios
            .put('http://localhost:6060/oder/edit/' + fid.oderId, data)
            .then((res) => {
                setRows(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h5" align="center">
                Edit Status
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                X
            </IconButton>
            <Box height={20} />

            <Grid container spacing={2} align="center">
               
                <Grid item xs={12}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Status"
                        size="small"
                        style={{width: "300px"}}
                        sx={{ width: 150 }}
                        onChange={handleCategory}
                        value={statusId}
                    >
                        {status.map((option, index) => (
                            <MenuItem key={index} value={option.statusId}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
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

export default EditOder;
