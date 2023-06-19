import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import addCart from "../../components/Cart";
import { NumericFormat } from "react-number-format";
import request from "../../utils/Request";

function ProductDetail() {
    const [productDetail, setproductDetail] = useState([]);
    const [proHot, setProHot] = useState([]);
    const { id } = useParams();
    const detail = async () => {
        await request.get('/product/'+id).then((res) => {
            setproductDetail(res.data.data);
        });
    };
    const hot = async () => {
        await request.get('/product/cate2').then((res) => {
            setProHot(res.data.data);
        });
    };

    useEffect(() => {
        detail();
        hot();
    }, [id]);

    return ( 
        <>
           
                return (
                    <div className="detail" key={productDetail._id}>
                        <div className="detail-left">
                            <img src={'https://shop-watch.onrender.com/images/' + productDetail.avatar} alt="" />
                        </div>
                        <div className="detail-right">
                            <h2>{productDetail.name}</h2>
                            <p>
                                Giá:{' '}
                                <span className="gia">
                                    <NumericFormat
                                        value={productDetail.price}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'đ'}
                                    />
                                </span>
                            </p>
                            <p>
                                Nhãn hiệu: <span className="hang">{productDetail.cateName}</span>
                            </p>
                            <p>{productDetail.describe}</p>
                            <button onClick={() => addCart(productDetail)}>
                                <i className="fa-solid fa-cart-shopping"></i> Add to cart
                            </button>
                        </div>
                    </div>
                );
        

            <div className="hot-product">
                <div className="title">
                    <h2>Product Hot</h2>
                    <Link to='shop'>See</Link>
                </div>
                <div className="product-item">
                    {proHot.map((data, index) => {
                        return (
                            <div className="item" key={index}>
                                <img src="/images/promotional.png" alt="" className="icon-hot" />
                                <img src={'https://shop-watch.onrender.com/images/' + data.avatar} alt="" />
                                <div className="item-title">
                                    <h3>{data.name}</h3>
                                    <p>
                                        <NumericFormat
                                            value={data.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            prefix={'đ'}
                                        /> 
                                    </p>
                                </div>
                                <Link to={'/productdetail/' + data.productId}>
                                    <i className="fa-solid fa-eye"></i>
                                </Link>
                                <a onClick={() =>  addCart(data)}>
                                    <i className="fa-solid fa-cart-arrow-down"></i>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
            <nav className="category-product">
                <ul>
                    <li>
                        <img src="/images/logo_CARNIVAL.png" alt="" />
                    </li>
                    <li>
                        <img src="/images/logo_LOBINNI.png" alt="" />
                    </li>
                    <li>
                        <img src="/images/logo_TEINTOP.png" alt="" />
                    </li>
                    <li>AOUKE</li>
                </ul>
            </nav>
        </>
     );
}

export default ProductDetail;