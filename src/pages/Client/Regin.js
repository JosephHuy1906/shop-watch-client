import { Box, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Regin() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [test, setTest] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const addUser = async (data) => {
        await axios
            .post('http://localhost:6060/user/create', data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        apiemail();
    }, [email]);
    const apiemail = async () => {
        await axios
            .get('http://localhost:6060/user/email/' + email)
            .then((res) => setTest(res.data))
            .catch((err) => console.log(err));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const us = {
            fullName: data.get('fullName'),
            password: data.get('password'),
            email: data.get('email'),
            repassword: data.get('repassword'),
        };

        if (us.password !== us.repassword) {
            setError('Password nhập lại không đúng');
        } else if (test.length > 0) {
            setError('Email đã tồn tại');
        } else {
            addUser(us);
            setError('');
            Swal.fire('Submitted!', 'Your file has been submitted.', 'success');
        }
    };
    return (
        <>
            <div className="login">
                <div className="login-left">
                    <h2>Sign up</h2>
                    <form onSubmit={handleSubmit}>
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
                                id="fullName"
                                label="Full Name"
                                name="fullName"
                                autoComplete="fullName"
                                autoFocus
                                type="fullName"
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
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                className="input"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
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
                                name="repassword"
                                label="Repassword"
                                className="input"
                                type="password"
                                id="repassword"
                                autoComplete="current-password"
                            />
                        </Box>
                        <br />

                        <button>Sign In</button>
                    </form>
                    <p>Or sigin Up with</p>
                    <a href="">
                        <img src="images/facebook.png" alt="" />
                    </a>
                    <a href="">
                        <img src="images/gmail.png" alt="" />
                    </a>
                    <br />
                </div>
            </div>
        </>
    );
}

export default Regin;
