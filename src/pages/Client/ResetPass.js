import { Box, Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAppStore } from '../../appStore';
import { useNavigate } from 'react-router-dom';

function ResetPass({ fid, closeEvent }) {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const setRows = useAppStore((state) => state.setRows);
    const navigate = useNavigate();

    const add = () => {
        const user = {
            password: password,
        };
        if (password !== rePassword) {
            setError('Mật khẩu nhập lại sai');
        } else {
            addCate(user);
            closeEvent();
            Swal.fire('Submitted!', 'Reset password success.', 'success');
            navigate('/');
        }
    };

    const addCate = (data) => {
        axios
            .put('http://localhost:6060/user/update/pass/' + fid.email, data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant="h2" align="center">
                RePassword
            </Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                X
            </IconButton>
            <Box height={20} />

            <Grid container spacing={2} align="center" sx={{fontSize: 18}}>
                <Typography variant="p" color={'red'} sx={{ textAlign: 'center', fontSize: 15, margin: 'auto' }}>
                    {error}
                </Typography>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="New Password"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320, fontSize: '18px' }}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type='password'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="outlined-basic"
                        label="Re-enter Password"
                        variant="outlined"
                        size="small"
                        sx={{ width: 320 }}
                        onChange={(e) => setRePassword(e.target.value)}
                        value={rePassword}
                        type='password'
                    />
                </Grid>
                <Box height={20} />
                <Grid item xs={12}>
                    <Button variant="contained" onClick={add}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default ResetPass;
