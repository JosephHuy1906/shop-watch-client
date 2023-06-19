var url = "http://localhost:3000/order_detail";
fetch(url).then( data => data.json()).then(order_detail =>{
 
    pro_arr = order_detail.map(item => {
        return `
                    <tr >
                      <td class="tbid">${item.id}</td>
                      <td><p>${item.order_id}</p></td>
                      <td><p>${item.product_id}</p></td>
                      <td><p>${item.quantity}</p></td>
                      <td><p>${item.unti_price}Vnđ</p></td>
                      <td class="removeSP"> <button type="button" class="removeSpIcon" onclick="return xoaSP(${item.id})"><i class="ri-delete-bin-2-line"></i></button> </td>                     
                    </tr>
        `;
    })
   
      document.querySelector("#show-order-admin").innerHTML+=pro_arr; 
  
})

function addCart(id, order_id, product_id, quantity,unti_price){
    var cart =JSON.parse(localStorage.getItem("cart"));
    if(cart == null){
        cart = [];
        cart.push({id: id,product_id:product_id, order_id:order_id,quantity:quantity,unti_price:unti_price});
    }else{
        let item = cart.find( item=> item.id === id);
        if(item) item.quatity++;
        else cart.push({id: id,product_id:product_id, order_id:order_id,quantity:quantity,unti_price:unti_price});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

    
   
