import { Outlet, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRoutes = () => {
    let token = localStorage.getItem('token');
    let auth = { token: true };
  
    if (token == null || token == '') {
        auth = { token: false };
        Swal.fire({
            title: 'Error!',
            text: 'Please login to continue',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }

    return auth.token ? <Outlet /> : <Navigate to={'/login'} />;
};

export default PrivateRoutes;
