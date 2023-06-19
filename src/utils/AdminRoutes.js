import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
    let token = JSON.parse(localStorage.getItem('tokenAd')) || "";
    let auth = token;

   
    return auth.tokenAd && auth.role ? <Outlet /> : <Navigate to={'/loginadmin'} />;
};

export default AdminRoutes;
