// Script.js
var cart = new Set();
var cartnum = document.getElementById('cart-count');
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('data') == null)
    fetch('https://fakestoreapi.com/products')
      .then(resp => resp.json())
      .then(data => {
        window.localStorage.setItem('data', JSON.stringify(data));
        parseProducts ();
      });
  else parseProducts ();
  cartnum.innerHTML = cart.size;
});

function parseProducts() {
  let data = JSON.parse (window.localStorage.getItem('data'));
  let products = document.getElementById('product-list');
  cart = new Set(JSON.parse(window.localStorage.getItem("Cart")));

  for (let i = 0; i < data.length; i++){
    let product = products.appendChild(document.createElement('product-item'));
    product.setAttribute('src', data[i].image);
    product.setAttribute('title', data[i].title);
    product.setAttribute('price', data[i].price);
    product.setAttribute('id', data[i].id);
    if(cart.has(data[i].id.toString())) product.cart();
  }
}