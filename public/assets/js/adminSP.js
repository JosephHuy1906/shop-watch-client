


function xoaSP(id){
    const remove = confirm("Bạn có muốn sản phẩm không");
    if(remove == true) {
        url = `http://localhost:3000/products/${id}`;
        fetch(url, {method: "delete"}).then( res => res.json()).then( data => {
            console.log(data);
            alert("Đã xoá thành công");
        })
    }
  
}


