import axios from 'axios';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns';
import { Box, Modal } from '@mui/material';
import OderDetail from './OderDetail';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};
function OderUser() {
    const [profile, setProfile] = useState([]);
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [oder, setOder] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [dataOder, setDataOder] = useState('');
    const handleClose = () => setOpen(false);
    const token = localStorage.getItem('token');

    const parseToken = async () => {
        await axios
            .get('http://localhost:6060/user/profile/' + token)
            .then((res) => {
                setProfile(res.data);
                setUserId(res.data.userId);
            })
            .catch((err) => console.log(err));
    };
    const deatilUser = async () => {
        await axios
            .get('http://localhost:6060/user/id/' + userId)
            .then((res) => {
                setData(res.data[0]);
            })
            .catch((err) => console.log(err));
    };

    const showOder = async () => {
        await axios
            .get('http://localhost:6060/oder/id/' + userId)
            .then((res) => {
                setOder(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        parseToken();
    }, []);

    useEffect(() => {
        deatilUser();
        showOder();
    }, [profile]);

    const oderDetail = (oder) => {
        let data = {
            oderId: oder,
        };
        setDataOder(data);
        console.log(data);
        handleOpen();
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
                    <OderDetail closeEvent={handleClose} dataOder={dataOder} />
                </Box>
            </Modal>
            <div className="profile-right">
                <h2>Xin chào {data.fullName}</h2>
                <Box height={30} />
                {oder.length > 0 &&
                    oder.map((data, index) => {
                        return (
                            <div className="oder" key={index}>
                                <div className="od">
                                    <h4>Oder</h4>
                                    <div className="center">
                                        <p>#{data.oderId}</p>
                                        <b>Date Create: {format(new Date(data.date_creat), 'dd-MM-yyyy  kk:mm:ss')}</b>
                                    </div>
                                </div>

                                <div className="total">
                                    <p className="totals">
                                        Total:{' '}
                                        <NumericFormat
                                            value={data.total}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        /> đ
                                    </p>
                                    <p className="status">{data.status}</p>
                                   <p className='icon'>
                                   <RemoveRedEyeIcon
                                        style={{ fontSize: '30px', color: 'red', cursor: 'pointer', textAlign: "right" }}
                                        onClick={() => oderDetail(data.oderId)}
                                    />
                                   </p>
                                </div>
                                
                            </div>
                        );
                    })}
                {oder.length == 0 && (
                    <>
                        <img src="images/tracking.png" alt="" style={{ width: '300px' }} />
                        <h3>Oder Rỗng</h3>
                    </>
                )}
            </div>
        </>
    );
}

export default OderUser;
