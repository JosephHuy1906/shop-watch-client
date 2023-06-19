import { Await, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Box, Modal, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import * as request from '../../utils/Request';
import ResetPass from './ResetPass';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ForgotPasswordCode() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formid, setFormId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let code = data.get('code');

        await axios.get('http://localhost:6060/user/codecheck/' + email).then((res) => {
            if (code !== res.data[0].code) {
                alert('code sai');
            } else {
                setFormId(res.data[0]);
                handleOpen()
            }
        });

        // navigate('/')
    };

    return (
        <>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ResetPass closeEvent={handleClose} fid={formid}/>
                </Box>
            </Modal>
            <div className="login">
                <div className="login-left">
                    <h2>Forgot Your password </h2>
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
                            <TextField
                                fullWidth
                                margin="normal"
                                required
                                id="code"
                                label="Code"
                                name="code"
                                autoComplete="code"
                                autoFocus
                                type="text"
                                className="input"
                            />
                        </Box>
                        <Box height={20} />
                        <button>Submit</button>
                    </Box>
                </div>
            </div>
        </>
    );
}

export default ForgotPasswordCode;
