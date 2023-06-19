import axios from "axios";

 const AxiosRequest = axios.create({
    baseURL: 'https://shop-watch.onrender.com/'
});



export default AxiosRequest;