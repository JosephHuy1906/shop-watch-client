let params = new URLSearchParams(location.search);
let id = params.get("id");
url = `http://localhost:3000/products/${id}`;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(".name").value = data.name;
    document.querySelector(".price").value = data.price;
    document.querySelector("#formFile").value = data.image;
    document.querySelector(".note").value = data.detail;
    console.log(data);
  });

const edit = document.querySelector(".edit");
edit.addEventListener("click", () => {
  url = `http://localhost:3000/products/${id}`;
  sp = {
    name: document.querySelector(".name").value.trim(),
    price: document.querySelector(".price").value.trim(),
    image: document.querySelector("#formFile").value.trim(),
    detail: document.querySelector(".note").value.trim(),
  };
  console.log(sp);
  options = {
    method: "put",
    body: JSON.stringify(sp),
    headers: { "Content-Type": "application/json" },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // alert("Đã Sửa Thành công")
      document.location = "./forms-elements.html";
    });
});
