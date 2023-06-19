import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Profile() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');
    const [oder, setOder] = useState([]);
    const [profile, setProfile] = useState([]);
    const [userId, setUserId] = useState('');
    const navigative = useNavigate();
    useEffect(() => {
        parseToken();
        deatilUser();
    }, []);



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

    const logout = () => {
        localStorage.removeItem('token');
        navigative('/login');
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logout success',
            showConfirmButton: false,
            timer: 1500,
        });
    };
    return (
        <>
            <div className="profile">
                <div className="profile-left">
                    <img src={data.avatar || '/images/user.png'} alt="" />
                    <h4>{'DASHBOARD NAVIGATION'}</h4>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/profile">
                                    <i className="fa-solid fa-bag-shopping"></i> My Oder
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <i className="fa-solid fa-heart"></i> Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile/info">
                                    <i className="fa-solid fa-user"></i> Profile Info
                                </Link>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                
                <Outlet />
            </div>
        </>
    );
}

export default Profile;
