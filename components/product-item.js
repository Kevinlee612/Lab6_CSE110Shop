class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    let shadow = this.shadowRoot;
    let list = shadow.appendChild(document.createElement('li'));
    list.setAttribute('class','product');
    let image = list.appendChild(document.createElement('img'));
    let title = list.appendChild(document.createElement('p'));
    title.setAttribute('class','title');
    let price = list.appendChild(document.createElement('p'));
    price.setAttribute('class','price');
    let button = list.appendChild(document.createElement('button'));
    button.innerHTML = "Add to Cart";
    button.onclick = 
      function() {
        let CartID = button.parentElement.dataset.CartID;
        if (button.innerHTML == 'Add to Cart') {
          alert('Added to Cart!');
          cart.add(CartID);
          button.innerHTML = 'Remove from Cart';
        }
        else {
          cart.delete(CartID);
          button.innerHTML = 'Add to Cart';
        }
        cartnum.innerHTML = cart.size;
        window.localStorage.setItem('Cart', JSON.stringify(Array.from(cart)));
      }
    shadow.appendChild(document.createElement('style')).textContent =`
      .price {
        color: green;
        font-size: 1.8em;
        font-weight: bold;
        margin: 0;
      }
      
      .product {
        align-items: center;
        background-color: white;
        border-radius: 5px;
        display: grid;
        grid-template-areas: 
        'image'
        'title'
        'price'
        'add';
        grid-template-rows: 67% 11% 11% 11%;
        height: 450px;
        filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
        margin: 0 30px 30px 0;
        padding: 10px 20px;
        width: 200px;
      }
      
      .product > button {
        background-color: rgb(255, 208, 0);
        border: none;
        border-radius: 5px;
        color: black;
        justify-self: center;
        max-height: 35px;
        padding: 8px 20px;
        transition: 0.1s ease all;
      }
      
      .product > button:hover {
        background-color: rgb(255, 166, 0);
        cursor: pointer;
        transition: 0.1s ease all;
      }
      
      .product > img {
        align-self: center;
        justify-self: center;
        width: 100%;
      }
      
      .title {
        font-size: 1.1em;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .title:hover {
        font-size: 1.1em;
        margin: 0;
        white-space: wrap;
        overflow: auto;
        text-overflow: unset;
      }`;
  }

  //Attributs for the class
  static get observedAttributes(){
    return ['src','title','price','id'];
  }

  attributeChangedCallback(attr, oldVal, newVal){
    let product = this.shadowRoot.firstChild;
    let img = product.getElementsByTagName('img')[0];
    let title = product.getElementsByClassName('title')[0];
    let price = product.getElementsByClassName('price')[0];
    img.src = this.getAttribute('src');
    img.alt = this.getAttribute('title');
    title.innerHTML = this.getAttribute('title');
    price.innerHTML = '$'+this.getAttribute('price');
    product.dataset.CartID = this.getAttribute('id');
  }

  cart() {
    this.shadowRoot.firstChild.getElementsByTagName('button')[0].innerHTML = 'Remove from Cart';
  }
}

customElements.define('product-item', ProductItem);