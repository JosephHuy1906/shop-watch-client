import axios from 'axios';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import addCart from '../../components/Cart';
import { Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Height } from '@mui/icons-material';
import request from '../../utils/Request';
function Product() {
    const [product, setProduct] = useState([]);
    const [cate, setCate] = useState([]);

    useEffect(() => {
        productAll();
        category();
    }, []);

    const productAll = async () => {
        await request.get('/product/cate1').then((res) => {
                setProduct(res.data.data);
            });
    };
    console.log(product);

    const category = async () => {
        await request.get('/category').then((res) => {
            setCate(res.data.data);
        });
    };
    const [view, setView] = useState('list');

    const handleChange = (event, nextView) => {
      setView(nextView);
    };
    return (
        <div className="shop">
            <div className="shop-left">
                <div className="shop-cate">
                    <h3>Category</h3>
                    <ul>
                        {cate.map((cate, index) => {
                            return (
                                <li key={index}>
                                    <Link to={'/shop/' + cate.categoryId}>{cate.name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="shop-right">
                <div className="shop-sort">
                    <h3>Product All</h3>

                    <div className="sort">
                        <select name="" id="">
                            <option value="">Sort by featured</option>
                            <option value="">Sort by product decrease</option>
                        </select>
                        <div className="list">
                            <ToggleButtonGroup orientation="horizontal" value={view} exclusive onChange={handleChange}>
                                <ToggleButton  value="list" aria-label="list">
                                    <ViewListIcon />
                                </ToggleButton>
                                <ToggleButton value="module" aria-label="module">
                                    <ViewModuleIcon />
                                </ToggleButton>
                            
                            </ToggleButtonGroup>
                        </div>
                    </div>
                </div>

                <div className="shop-product">
                    {product.map((data, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src={'https://shop-watch.onrender.com/images/' + data.avatar} alt="" />
                                <div className="title-item">
                                    <Link to={'/productdetail/' + data.productId}>
                                        <h3>{data.name}</h3>
                                    </Link>
                                    <Link to="">
                                        <i className="fa-regular fa-heart"></i>
                                    </Link>
                                </div>
                                <div className="price-item">
                                    <p>
                                        <NumericFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'đ'}
                                        />
                                    </p>
                                    <a onClick={() => addCart(data)}>
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </a>
                                </div>
                                <div className="star">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Product;
