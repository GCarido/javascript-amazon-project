import { cart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let displayHTML = '';


cart.forEach((cartItem, index) => {

    cartItem = cart[index];

    const { productId, quantity } = cartItem;

    // products.forEach((product) => { // NORMALIZING SAMPLE 1
    //     if(product.id === productId) {
    //         matchingProduct = product;
    //     }
    // });

    let matchingProduct = products.find(product => product.id === productId); //NORMALIZING SAMPLE 2 DESTRUCTURING METHOD

    const { id, image, name, priceCents } = matchingProduct;

    if (matchingProduct) {
        displayHTML += `
            <div class="cart-item-container">
            <div class="delivery-date">
            Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${name}
                </div>
                <div class="product-price">
                $${formatCurrency(priceCents)}
                </div>
                <div class="product-quantity">
                <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                    Update
                </span>
                <span class="delete-quantity-link link-primary">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                <div class="delivery-option">
                <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                <div>
                    <div class="delivery-option-date">
                    Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                    FREE Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                <div>
                    <div class="delivery-option-date">
                    Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                    $4.99 - Shipping
                    </div>
                </div>
                </div>
                <div class="delivery-option">
                <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${id}">
                <div>
                    <div class="delivery-option-date">
                    Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                    $9.99 - Shipping
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
    }
});

const renderItem = document.querySelector('.js-order-summary');

renderItem.innerHTML = displayHTML;

