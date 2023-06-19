import axios from "axios";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import addCart from "../../components/Cart";
import { Link, useParams } from "react-router-dom";
import request from "../../utils/Request";

function ProductCate() {
    const [product, setProduct] = useState([]);
    const [cate, setCate] = useState([]);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        productCate();
        category();
    }, [id]);

    const productCate = async () => {
        await request.get('/product/cate/'+id).then((res) => {
            setProduct(res.data.data);
        });
    };

    const category = async () => {
        await request.get('/category').then((res) => {
            setCate(res.data.data);
        });
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
                                <Link to={"/shop/"+cate.categoryId} >{cate.name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        <div className="shop-right">
            <div className="shop-sort">
                <h3>Product Category</h3>

                <div className="sort">
                    <select name="" id="">
                        <option value="">Sort by featured</option>
                        <option value="">Sort by product decrease</option>
                    </select>
                    <div className="list">
                        <button>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                        <button>
                            <i className="fa-sharp fa-solid fa-grip"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="shop-product">
                {product.map((data, index) => {
                    return (
                        <div className="item" key={index}>
                            <img src={'https://shop-watch.onrender.com/images/' + data.avatar} alt="" />
                            <div className="title-item">
                                <Link to={'/productdetail/' + data._id}>
                                    <h3>{data.name}</h3>
                                </Link>
                                <Link to="">
                                    <i className="fa-regular fa-heart"></i>
                                </Link>
                            </div>
                            <div className="price-item">
                                
                                <p><NumericFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'đ'}/></p>
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

export default ProductCate;