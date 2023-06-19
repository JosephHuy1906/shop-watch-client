import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import AxiosRequest from '../../utils/AxiosRequest';
import { redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
const theme = createTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: green[500],
        },
    },
    typography: {
        fontFamily: 'Raleway, Arial',
        fontSize: 20,
    },
});

const LoginAdmin = () => {
    const [error, setError] = useState('');
    const Navigate = useNavigate();

    const login = async (data) => {
        await AxiosRequest.post('user/loginAd', data).then((res) => {
            localStorage.setItem('tokenAd', JSON.stringify(res.data));
            if (res.data.message) {
                setError(res.data.message);
            } else {
                setError('');
                naviga();
            }
        });
    };
    const naviga = async () => {
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login success',
            showConfirmButton: false,
            timer: 1500,
        });
        Navigate('/admin');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const ad = {
            email: data.get('email'),
            password: data.get('password'),
        };
        login(ad);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'red' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in Admin
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="p" variant="p" sx={{textAlign:'center', color: 'red'}}>
                            {error}
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, height: 50, fontSize: 18 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LoginAdmin;
