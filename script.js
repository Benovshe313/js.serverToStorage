
let list = document.getElementById("list")

function showList(arr) {
    list.innerHTML = "";
    arr.forEach((prod) => {
      let li = document.createElement("li");
      li.innerHTML = `
        <p><span>Product name:</span> ${prod.product_name}</p>
        <p><span>Product price:</span> ${prod.product_price}</p>
        <p><span>Product desc:</span> ${prod.product_description}</p>
        <p><span>Store name:</span> ${prod.store_name}</p>
        <p><span>Store address:</span> ${prod.store_address}</p>
        <button class = "button" data-id="${prod.id}">ADD</button> `;

      li.querySelector(".button").addEventListener("click",(ev) => {
        const productId = ev.target.dataset.id
        let prodAdded = JSON.parse(localStorage.getItem("prodAdded")) || []
        const existProduct = prodAdded.find((item) => item.id === productId)
        if (!existProduct) {
            prodAdded.push(prod)
            localStorage.setItem("prodAdded", JSON.stringify(prodAdded))
            alert(`${prod.product_name} added`)
          } else {
            alert(`${prod.product_name} is already exist`)
          }
        })
        list.appendChild(li)
    })
  }

fetch('http://localhost:5000/goods')
.then((response)=>response.json()) 
.then((data)=> showList(data)) 
