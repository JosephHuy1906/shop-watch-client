var btns = document.querySelector("#btnAdd");

btns.addEventListener("click", () => {
  url = "http://localhost:3000/products";
  sp = {
    name: document.querySelector(".name").value.trim(),
    price: document.querySelector(".price").value.trim(),
    image: document.querySelector("#formFile").value.trim(),
    detail: document.querySelector(".note").value.trim(),
  };
  console.log(sp);
  options = {
    method: "post",
    body: JSON.stringify(sp),
    headers: { "Content-Type": "application/json" },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //   alert("Đã Thêm Thành công")
      document.location = "./forms-elements.html";
    });
});
