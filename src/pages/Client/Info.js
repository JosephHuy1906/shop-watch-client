import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Info() {
    const [profile, setProfile] = useState([]);
    const [userId, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [us, setUs] = useState('');


    const token = localStorage.getItem('token');
    const navigative = useNavigate();

    const parseToken = async () =>{
        await  axios.get('http://localhost:6060/user/profile/' + token).then((res) => {
            setProfile(res.data);
            setUserId(res.data.userId);
        });
     }
    const deatilUser = async () =>{
       await axios.get('http://localhost:6060/user/id/'+ userId).then((res) => {
            setData(res.data[0]);
        });
    }
    useEffect( ()=>{
        parseToken();
    },[])
    useEffect( () =>{
        deatilUser();
    },[profile])

    const submit = (e) => {
        // e.preventDefault();
        axios
            .put('http://localhost:6060/user/update/role/' + userId, us)
          
            .catch((err) => console.log(err));
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Profile success',
                showConfirmButton: false,
                timer: 1500,
              })
    };
    return (
        <div className="profile-right">
            <form onSubmit={submit}>
                <h2>Hello {data.fullName}</h2>
                <label>Full Name</label>
                <br />
                <input
                    defaultValue={data.fullName}
                    onChange={(e) => {
                        setUs({ ...us, fullName: e.target.value });
                    }}
                />
                <br />
                <label>Email</label>
                <br />
                <input
                    defaultValue={data.email}
                    onChange={(e) => {
                        setUs({ ...us, email: e.target.value });
                    }}
                />
                <br />
                <label>Phone</label>
                <br />
                <input
                    defaultValue={data.Phone}
                    onChange={(e) => {
                        setUs({ ...us, Phone: e.target.value });
                    }}
                />
                <br />
                {/* <label>Name</label><br/>
                <input value={"huy"}/><br/> */}
                <label>Adress</label>
                <br />
                <textarea
                    defaultValue={data.address}
                    onChange={(e) => {
                        setUs({ ...us, address: e.target.value });
                    }}
                />
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Info;
