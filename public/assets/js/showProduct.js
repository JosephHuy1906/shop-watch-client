var url = "http://localhost:3000/products";
fetch(url).then( data => data.json()).then(products =>{
 
    pro_arr = products.map(item => {
        return `
                    <tr >
                      <td class="tbid">${item.id}</td>
                      <td><img src=".${item.image}" alt=""></td>
                      <td><p>${item.name}</p></td>
                      <td><span>${item.price}Vnđ</span></td>
                      <td>${item.detail}</td>
                      <td class="editSP"> <a href="edit-forms-elements.html?id=${item.id}" class="editSPIcon"><i class="ri-edit-box-line"></i></a> </td>
                      <td class="removeSP"> <button type="button" class="removeSpIcon" onclick="return xoaSP(${item.id})"><i class="ri-delete-bin-2-line"></i></button> </td>
                      
                    </tr>
        `;
    })
   
      document.querySelector("#show-card-admin").innerHTML+=pro_arr; 
      console.log(products);
})

function addCart(id, name, price, image){
    var cart =JSON.parse(localStorage.getItem("cart"));
    if(cart == null){
        cart = [];
        cart.push({id:id,name:name, price:price, image:image, quatity:1});
    }else{
        let item = cart.find( item=> item.id === id);
        if(item) item.quatity++;
        else cart.push({id:id,name:name, price:price, image:image, quatity:1});
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

    
   
