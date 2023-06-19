import { useEffect, useState } from 'react';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    width: '500px',
    height: '300px',
    p: 4,
   overflow: "auto"
};
function OderDetail({ dataOder, closeEvent }) {
    const [detail, setDetail] = useState('');
    const [data, setData] = useState([]);
    useEffect(() => {
        setDetail(dataOder.oderId);
        // showDetail();
    }, []);
    useEffect(() => {
        showDetail();
    }, [detail]);
    const showDetail = async () => {
        await axios
            .get('http://localhost:6060/oderdetai/' + detail)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };
    return (
        <List sx={style} style={{ borderRadius: 10 }}>
            <ListItem alignItems="flex-start">
                <IconButton style={{ position: 'absolute', top: '0', right: '0' }} onClick={closeEvent}>
                    X
                </IconButton>
            </ListItem>
            <Box height={20} />

            {data.map((row, index) => {
                return (
                    <ListItem key={index} alignItems="flex-start" >
                        <ListItemAvatar>
                            <Avatar
                                style={{ width: '80px', height: '80px' }}
                                alt="Travis Howard"
                                src={'/images/' + row.avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={row.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="gray"
                                    >
                                        Quantity: {row.quantity}
                                    </Typography>
                                    <Box width={20} />
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="red"
                                        fontWeight={600}
                                    >
                                        <NumericFormat
                                            value={row.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                        />
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}

export default OderDetail;
