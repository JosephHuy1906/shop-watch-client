var urlSP = "http://localhost:3000/products";
var urlOder = "http://localhost:3000/orders";

if(urlSP){
    fetch(urlSP).then( res => res.json()).then( data =>  {
        document.querySelector('.thongkeSP').innerHTML = data.length
        console.log(data.length)
    })
    
    fetch(urlOder).then( res => res.json()).then( data =>  {
        document.querySelector('.thongkeDoanhThu').innerHTML = data.length
    
    })
}

