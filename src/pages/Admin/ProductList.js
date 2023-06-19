import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Autocomplete, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Skeleton from '@mui/material/Skeleton';

import { useAppStore } from '../../appStore';
import { NumericFormat } from 'react-number-format';

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

export default function ProductList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditopen] = useState(false);
    const [formid, setFormId] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditOpen = () => setEditopen(true);
    const handleEditClose = () => setEditopen(false);
    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);

    useEffect(() => {
        apiProduct();
    }, []);

    const apiProduct = async () => {
        await axios.get('http://localhost:6060/apiproduct').then((res) => {
            setRows(res.data);
        });
    };
    const removeProduct = async (id) => {
        await axios.delete('http://localhost:6060/apiproduct/' + id).then((res) => {
            setRows(res.data);
        });
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteProduct = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.value) {
                deleteApi(productId);
            }
        });
    };

    const deleteApi = async (id) => {
        await removeProduct(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        apiProduct();
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            apiProduct();
        }
    };

    const editData = (productId, name, price, mota, avatar, category) => {
        const data = {
            productId: productId,
            name: name,
            price: price,
            mota: mota,
            avatar: avatar,
            categoryId: category,
        };
        setFormId(data);
        handleEditOpen();
    };
    return (
        <>
            <div>
                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddProduct closeEvent={handleClose} />
                    </Box>
                </Modal>

                <Modal
                    open={editOpen}
                    // onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditProduct closeEvent={handleEditClose} fid={formid} />
                    </Box>
                </Modal>
            </div>
            {rows.length > 0 && (
                <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                        Products List
                    </Typography>
                    <Divider />
                    <Box height={10} />
                    <Stack direction="row" spacing={2} style={{ padding: '10px' }} className="my-2 mb-2 ">
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={rows}
                            sx={{ width: 300 }}
                            onChange={(e, v) => filterData(v)}
                            getOptionLabel={(rows) => rows.name || ''}
                            renderInput={(params) => <TextField {...params} size="small" label="Search Products" />}
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
                    </Stack>
                    <Box height={10} />
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Id
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Images
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Price
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        decript
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Category
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover key={row.productId} role="checkbox" tabIndex={-1}>
                                            <TableCell align="left">{row.productId}</TableCell>
                                            <TableCell className="imgProduct" align="left">
                                                <img src={'/images/' + row.avatar} />
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">
                                                <NumericFormat
                                                    value={row.price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.mota}</TableCell>
                                            <TableCell align="left">{row.cateName}</TableCell>
                                            <TableCell align="left">
                                                <EditIcon
                                                    style={{ fontSize: '30px', color: 'blue', cursor: 'pointer' }}
                                                    onClick={() =>
                                                        editData(
                                                            row.productId,
                                                            row.name,
                                                            row.price,
                                                            row.mota,
                                                            row.avatar,
                                                            row.categoryId,
                                                        )
                                                    }
                                                />

                                                <DeleteIcon
                                                    style={{ fontSize: '30px', color: 'darkred', cursor: 'pointer' }}
                                                    onClick={() => deleteProduct(row.productId)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            )}
            {rows.length == 0 && (
                <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={30} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} />
                    <Box height={20} />
                </Paper>
            )}
        </>
    );
}
