import { Fragment, useEffect, useState } from 'react';
import '../GlobalStyle/Global.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import AxiosRequest from '../../utils/AxiosRequest';
import { Box, Modal } from '@mui/material';

function MainNavigation() {
    const [data, setData] = useState([]);
    useEffect(() => {
        productAll();
    }, []);

    const productAll = async () => {
        await AxiosRequest.get('apiproduct/search').then((res) => setData(res.data));
    };

    return (
        <>
            <header className="destop">
                <div className="header-left">
                    <h2>
                        <Link to="/">Huy Watch</Link>
                    </h2>
                </div>
                <nav className="header-main">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/shop">Shop</Link>
                        </li>
                        <li>
                            <Link to="/blog">Blog</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
                <nav className="header-right">
                    <ul>
                        <li className="search">
                            <Autocomplete
                                id="size-small-standard"
                                size="small"
                                options={data}
                                sx={{
                                    width: 200,
                                    height: 50,
                                    fontSize: 17,
                                    paddingTop: 3,
                                    paddingRight: 2,
                                }}
                                getOptionLabel={(option) => option.title}
                                renderOption={(props, option) => (
                                    <Link to={'/productdetail/' + option.productId}>
                                        <Box component="li" sx={{ height: 80, fontSize: 13 }} {...props}>
                                            <img width="40" src={`/images/${option.avatar}`} />
                                            {option.title}
                                        </Box>
                                    </Link>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        placeholder="Search"
                                        inputProps={{
                                            ...params.inputProps,
                                            style: { fontSize: 17 },
                                        }}
                                    />
                                )}
                            />
                     
                        </li>
                        <li>
                            <Link to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <span></span>
                            </Link>
                        </li>
                        <li className="user">
                            <Link to="/profile">
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default MainNavigation;
