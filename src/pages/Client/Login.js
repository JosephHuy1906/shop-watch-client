import { Await, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import * as request from '../../utils/Request';
function Login() {
    const [login, setLogin] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const loginUser = async (us) => {
        await axios
            .post('http://localhost:6060/user/login/', us)
            .then((res) => {
                if (res.data.status === 1) {
                    localStorage.setItem('token', res.data.token);
                    setError('');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Login success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate('/');
                }
                if (res.data.message) {
                    setError(res.data.message);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const us = {
            email: data.get('email'),
            password: data.get('password'),
        };
        if (us.email == '' || us.password == '') {
            setError('Vui lòng điền đầy đủ');
        } else {
            loginUser(us);
        }
    };

    return (
        <>
            <div className="login">
                <div className="login-left">
                    <h2>Sign In</h2>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Typography component="h5" variant="h5" sx={{ textAlign: 'center', color: 'red' }}>
                            {error}
                        </Typography>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                className="input"
                            />
                        </Box>
                        <Box
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                name="password"
                                label="Password"
                                className="input"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Box>
                        <br />
                        <Link to="/forgot">Forgot your Password?</Link>
                        <br />
                        <button>Sign In</button>
                    </Box>
                    <p>Or sigin in with</p>
                    <a href="">
                        <img src="images/facebook.png" alt="" />
                    </a>
                    <a href="">
                        <img src="images/gmail.png" alt="" />
                    </a>
                    <br />

                    <span>
                        Don't have an account? <Link to="/regin">Sign up</Link>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Login;
