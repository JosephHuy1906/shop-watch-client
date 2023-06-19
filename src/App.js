import { Route, BrowserRouter as Router, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Client/Home';
import Product from './pages/Client/Product';
import ProductDetail from './pages/Client/ProductDetail';
import Cart from './pages/Client/Cart';
import RootLayout from './pages/Client/Root';
import Error from './pages/Client/Error';
import Profile from './pages/Client/Profile';
import Login from './pages/Client/Login';
import Regin from './pages/Client/Regin';
import Checkout from './pages/Client/Checkout';
import Info from './pages/Client/Info';
import OderUser from './pages/Client/OderUser';

//Admin
import AdminLayout from './pages/Admin/AdminLayout';
import HomeAdmin from './pages/Admin/Home';
import Oder from './pages/Admin/Oder';
import User from './pages/Admin/User';
import ProductAdmin from './pages/Admin/Product';
import Category from './pages/Admin/Category';
import PrivateRoutes from './utils/PrivateRoutes';
import LoginAdmin from './pages/Client/LoginAdmin';
import AdminRoutes from './utils/AdminRoutes';
import Admin from './pages/Admin/Admin';
import ProductCate from './pages/Client/ProductCate';
import ForgotPassword from './pages/Client/ForgotPassword';
import ForgotPasswordCode from './pages/Client/ForgotPasswordCode';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<RootLayout />} path="/">
                    <Route element={<Home />} path="/" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<ForgotPassword />} path="/forgot" />
                    <Route element={<ForgotPasswordCode />} path="/forgotcode" />
                    <Route path="shop" element={<Product />} />
                    <Route path="productdetail/:id" element={<ProductDetail />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="regin" element={<Regin />} />
                    <Route path="shop/:id" element={<ProductCate />} />
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Profile />} path="/profile">
                            <Route index={true} element={<OderUser />} />
                            <Route path="info" element={<Info />} />
                        </Route>
                        <Route path="checkout" element={<Checkout />} />
                    </Route>
                </Route>
                <Route path="*" element={<Error />} />

                <Route element={<LoginAdmin />} path="/loginadmin" />
                <Route element={<AdminRoutes />}>
                    <Route element={<AdminLayout />} path="/admin">
                        <Route index={true} element={<HomeAdmin />} />
                        <Route path="product" element={<ProductAdmin />} />
                        <Route path="user" element={<User />} />
                        <Route path="oder" element={<Oder />} />
                        <Route path="cate" element={<Category />} />
                        <Route path="ad" element={<Admin />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}
export default App;
