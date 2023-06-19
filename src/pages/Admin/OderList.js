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
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import EditOder from './EditOder';
import Skeleton from '@mui/material/Skeleton';
import { useAppStore } from '../../appStore';
import { NumericFormat } from 'react-number-format';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import OderDetail from './OderDetail';
import {format} from 'date-fns'
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

export default function CateList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditopen] = useState(false);
    const [formid, setFormId] = useState('');
    const [dataOder, setDataOder] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditOpen = () => setEditopen(true);
    const handleEditClose = () => setEditopen(false);
    const [rows, setRows] = useState([]);
    // const setRows = useAppStore((state) => state.setRows);
    // const rows = useAppStore((state) => state.rows);

    useEffect(() => {
        apiCate();
    }, []);

    const apiCate = async () => {
        await axios.get('http://localhost:6060/oder').then((res) => {
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

    const editData = (oder, status) => {
        const data = {
            oderId: oder,
            statusId: status,
        };
        setFormId(data);
        handleEditOpen();
    };
    const oderDetail = (oder) => {
        let data = {
            oderId: oder,
        };
        setDataOder(data);
        handleOpen();
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            apiCate();
        }
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
                        <OderDetail closeEvent={handleClose} dataOder={dataOder} />
                    </Box>
                </Modal>
                <Modal
                    open={editOpen}
                    // onClose={handleEditClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditOder closeEvent={handleEditClose} fid={formid} />
                    </Box>
                </Modal>
            </div>
            {rows.length > 0 && (
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: '12px' }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ padding: '20px' }}>
                        Oder List
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
                            getOptionLabel={(rows) => rows.oderId || ''}
                            renderInput={(params) => <TextField {...params} size="small" label="Search Oder" />}
                        />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
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
                                        Phone
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Address
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Date create
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Status
                                    </TableCell>
                                    <TableCell align="left" style={{ minWidth: '100px', fontWeight: '600' }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover key={row.oderId} role="checkbox" tabIndex={-1}>
                                            <TableCell align="left">{row.oderId}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell align="left">{row.address}</TableCell>
                                            <TableCell align="left">
                                                <NumericFormat
                                                    value={row.total}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{format(new Date(row.date_creat), 'dd-MM-yyyy  kk:mm:ss')}</TableCell>
                                            <TableCell align="left">{row.status}</TableCell>

                                            <TableCell align="left">
                                                <RemoveRedEyeIcon
                                                    style={{ fontSize: '30px', color: 'red', cursor: 'pointer' }}
                                                    onClick={() => oderDetail(row.oderId)}
                                                />
                                                <EditIcon
                                                    style={{ fontSize: '30px', color: 'blue', cursor: 'pointer' }}
                                                    onClick={() => editData(row.oderId, row.statusId)}
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
