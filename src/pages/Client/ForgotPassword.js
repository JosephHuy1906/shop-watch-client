import { Await, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import * as request from '../../utils/Request';
function ForgotPassword() {

    const navigate = useNavigate();

    const forgot = async (us) => {
        await axios
            .post('http://localhost:6060/mail/sendmaid/', us)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const us = {
            email: data.get('email')
        };
        forgot(us);
        navigate('/forgotcode')
    };

    return (
        <>
            <div className="login">
                <div className="login-left">
                    <h2>Forgot Your password</h2>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: 'center' }}>
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
                        <Box height={20}/>
                        <button>Send Maid</button>
                    </Box>
                   
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
