import { cart, addToCart } from '../data/cart.js';
import { products, loadProductsFetch } from '../data/products.js';
import formatCurrency from './utils/money.js';

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  let displayHTML = '';

  products.forEach((product, index) => {
    product = products[index];
    const { id, image, name, rating: { stars, count }, priceCents } = product;
    displayHTML += `
          <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
             ${name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
            ${count.toLocaleString()}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-select">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${id}">
            Add to Cart
          </button>
        </div>
        `;
  });

  const renderItem = document.querySelector('.js-products-grid');

  renderItem.innerHTML = displayHTML;


  function updateCartQuantity() {
    let cartQuantity = 0;
    const cartHTML = document.querySelector('.js-cart-quantity');

    cart.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    });

    cartHTML.innerHTML = cartQuantity;
  }


  document.querySelectorAll('.js-add-to-cart').forEach(link => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const quantity = parseInt(link.parentElement.querySelector('.quantity-select').value);
      addToCart(productId, quantity);
      updateCartQuantity();
    });
  });

  updateCartQuantity();

  // document.querySelectorAll('.js-add-to-cart').forEach(button => {
  //   button.addEventListener('click', () => {
  //     const productId = button.dataset.productId;

  //     addToCart(productId);
  //     updateCartQuantity();

  //   });
  // });

  // updateCartQuantity();

}





