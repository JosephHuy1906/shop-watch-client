import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import axios from 'axios';
import Swal from 'sweetalert2';

function Cart() {
    const [item, setItem] = useState([]);
    const [total, setTotal] = useState();
    const [profile, setProfile] = useState([]);
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const cart = JSON.parse(localStorage.getItem('cart'));
    const tinh = cart.reduce((sp, item) => sp + item.total, 0);
    const token = localStorage.getItem('token');
    useEffect(() => {
        setItem(cart);
        setTotal(tinh);
    }, []);

    useEffect(() => {
        parseToken();
    }, [userId]);

    const removeItem = (item) => {
        let getSP = localStorage.getItem('cart');
        let cart = JSON.parse(getSP);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                let filtered = cart.filter((items) => items.id !== item.id);
                localStorage.setItem('cart', JSON.stringify(filtered));
                window.location.reload(true);
            }
        });
    };

    const parseToken = async () => {
        await axios
            .get('http://localhost:6060/user/profile/' + token)
            .then((res) => {
                setProfile(res.data);
                setUserId(res.data.userId);
            })
            .then(
                await axios.get('http://localhost:6060/user/id/' + userId).then((res) => {
                    setData(res.data);
                }),
            );
    };
    console.log(cart);

    return (
        <>
            <div className="cart">
                <h2>Shopping Cart</h2>
                <br />
                {cart.length > 0 && (
                    <div className="shop-cart">
                        <div className="carts">
                            {item.map((data, index) => {
                                return (
                                    <div key={index} className="item">
                                        <img src={'/images/' + data.image} alt="" />
                                        <h4>{data.name}</h4>
                                        <div className="btn-up-down">
                                            <button>-</button>
                                            <input type="number" defaultValue={data.quatity} />
                                            <button>+</button>
                                        </div>
                                        <p>
                                            <NumericFormat
                                                defaultValue={data.total}
                                                displayType="text"
                                                thousandSeparator={true}
                                                prefix={'đ'}
                                            />
                                        </p>
                                        <a onClick={() => removeItem(data)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </a>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="shop-total">
                            <h4>Summary</h4>
                            <hr />
                            <div className="total-item">
                                <p className="left">Products</p>
                                <p className="right">
                                    <NumericFormat
                                        value={total || '0'}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix={'đ'}
                                    />
                                </p>
                                <p className="left">Shipping</p>
                                <p className="right">Gratis</p>
                            </div>
                            <hr />
                            <div className="total-item">
                                <b className="left">Total amount</b>
                                <b className="right">
                                    <NumericFormat
                                        value={total || '0'}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix={'đ'}
                                    />
                                </b>
                            </div>
                            <br />
                            <Link to="/checkout" state={data}>
                                Go to checkout
                            </Link>
                        </div>
                    </div>
                )}
                {cart.length == 0 && (
                    <div className="center" style={{ width: 500, textAlign: 'center', margin: 'auto' }}>
                        <h3>Cart Rỗng</h3>
                        <img src="/images/cart.png" alt="" />
                    </div>
                )}
                {cart.length == null && (
                    <div className="center" style={{ width: 500, textAlign: 'center', margin: 'auto' }}>
                        <h3>Cart Rỗng</h3>
                        <img src="/images/cart.png" alt="" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Cart;
