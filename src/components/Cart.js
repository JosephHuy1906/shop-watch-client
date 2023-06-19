import Swal from "sweetalert2";

    const addCart = (data) => {
        let carts = {
            id: data.productId,
            name: data.name,
            price: data.price,
            image: data.avatar,
            quatity: 1,
            total: data.price,
        };
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null) {
            cart = [];
            cart.push(carts);
        } else {
            let item = cart.find((item) => item.id === data.productId);
            if (item) {
                item.quatity++;
                item.total = item.price * item.quatity;
            } else
                cart.push(carts);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Add to cart success',
            showConfirmButton: false,
            timer: 1500,
          })
        // window.location.reload(true);
    };


export default addCart;