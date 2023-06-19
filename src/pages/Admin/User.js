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
import { Autocomplete, Box, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import { useAppStore } from '../../appStore';

function User() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        apiUser();
    }, []);


    const apiUser = async () => {
        await axios.get('http://localhost:6060/user').then((res) => {
            setRows(res.data);
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage();
    };

    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            apiUser();
        }
    };
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {rows.length > 0 && (
                <Paper sx={{ width: '98%', overflow: 'hidden', padding: '12px' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                        User List
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
                            getOptionLabel={(rows) => rows.fullName || ''}
                            renderInput={(params) => <TextField {...params} size="small" label="Search User" />}
                        />
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
                                        Name
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Email
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Phone
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Address
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover key={row.categoryId} role="checkbox" tabIndex={-1}>
                                            <TableCell align="left">{row.userId}</TableCell>
                                            <TableCell align="left">{row.fullName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>{' '}
                                            <TableCell align="left">{row.Phone}</TableCell>{' '}
                                            <TableCell align="left">{row.address}</TableCell>
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
        </Box>
    );
}

export default User;
