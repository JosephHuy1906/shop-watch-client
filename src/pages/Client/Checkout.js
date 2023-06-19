import { Box, Paper, Skeleton } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


function Cart() {
    const res = useLocation();
    const [item, setItem] = useState([]);
    const [total, setTotal] = useState();
   
    const [oderId, setOderId] = useState('');
    const [data, setData] = useState([]);
    const [email, setEmail] = useState(res.state[0].email);
    const [phone, setPhone] = useState(res.state[0].Phone);
    const [address, setAdress] = useState(res.state[0].address);
    const [fullName, setFullName] = useState(res.state[0].fullName);
    const [userId, setUserId] = useState(res.state[0].userId);

    const cart = JSON.parse(localStorage.getItem('cart'));
    const tinh = cart.reduce((sp, item) => sp + item.total, 0);
    const navigate = useNavigate();
    useEffect(() => {
        setItem(cart);
        setTotal(tinh);
        OderUs();
    }, []);


    const UpdateUser = async (data) => {
        await axios.put('http://localhost:6060/user/update/role/' + userId, data);
    };
    const addOder = async (data) => {
        await axios.post('http://localhost:6060/oder/create', data);
    };
    const addOderDetail = async (data) => {
        await axios.post('http://localhost:6060/oderdetai/create', data);
    };
    const OderUs = async() => {
        const result = await Math.random().toString(36).substring(2, 9);
        setOderId(result);
    };

    const oderadd ={
        oderId: oderId,
        address: address,
        phone: phone,
        userId: userId,
        price: tinh
    }
    const userup = {
        Phone: phone,
        address: address
    }
    const submit = (e) => {
        e.preventDefault();
        if (phone == null && address == null) {
           alert('Vui lòng nhập địa chỉ')
        } else {
            UpdateUser(userup);
            addOder(oderadd);

            item.map((data) => {
                addOderDetail({
                    oderId: oderId,
                    productId: data.id,
                    price: data.price,
                    quantity: data.quatity,
                });
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Thank you for your purchase',
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/');
        }
    };
    return (
        <>
            <div className="checkout">
                <form onSubmit={submit}>
                    {res.state.length > 0 && (
                        <div className="checkout-left">
                            <h3>Delivery information</h3>

                            <div className="col-12">
                                <div className="checkout-form">
                                    <label htmlFor="fullname">Full name</label>
                                    <br />
                                    <input
                                        // defaultValue={data[0].fullName}
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }}
                                        value={fullName}
                                    />
                                    <br />
                                </div>
                                <div className="checkout-form">
                                    <label htmlFor="phone">Phone</label>
                                    <br />
                                    <input
                                       value={phone || ""}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <br />
                            <label htmlFor="Address">Address</label>
                            <br />
                            <textarea
                                type="text"
                                id="Address"
                                value={address || ""}
                                onChange={(e) => {
                                    setAdress(e.target.value);
                                }}
                            />
                            <br />
                            <br />
                            <h3>Payments</h3>
                            <div className="pay">
                                <div className="pay-item">
                                    <label htmlFor="check">
                                        <img src="images/pay.png" alt="" />
                                        Payment on delivery
                                    </label>
                                    <input type="radio" id="check" />
                                </div>
                                <div className="pay-item">
                                    <label htmlFor="check-momo">
                                        <img src="images/momo.png" alt="" />
                                        E-wallet momo
                                    </label>
                                    <input type="radio" id="check-momo" />
                                </div>
                            </div>
                        </div>
                    )}
                    {res.state.length == 0 && (
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
                    <div className="checkout-right">
                        <h3>Order summary</h3>
                        <div className="checkout-all">
                            {item.map((el, index) => {
                                return (
                                    <div key={index} className="oder-item">
                                        <img src={'/images/' + el.image} alt="" />
                                        <div className="item-title">
                                            <h4>{el.name}</h4>
                                            <p className="status">Quantity: {el.quatity}</p>
                                            <p className="price">
                                                <NumericFormat
                                                    value={el.total}
                                                    displayType="text"
                                                    thousandSeparator={true}
                                                    
                                                /> đ
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="oder-total">
                            <p>Total order</p>
                            <p className="right">
                                <NumericFormat value={total} displayType="text" thousandSeparator={true}  /> đ
                            </p>
                        </div>
                        <button onClick={submit}>Confirm Oder</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Cart;
