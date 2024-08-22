import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; //DEFAULT EXPORT - 1 function to import
import { deliveryOptions, getDelivery } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
    let displayHTML = '';

    cart.forEach((cartItem, index) => {

        cartItem = cart[index];

        const { productId, quantity, deliveryOptionId } = cartItem;

        // products.forEach((product) => { // NORMALIZING SAMPLE 1
        //     if(product.id === productId) {
        //         matchingProduct = product;
        //     }
        // });

        // let matchingProduct = products.find(product => product.id === productId); //NORMALIZING SAMPLE 2 DESTRUCTURING METHOD

        //USE METHOD INSTEAD;

        const matchingProduct = getProduct(productId);

        const { id, image, name, priceCents } = matchingProduct;

        const cartDeliveryId = deliveryOptionId;

        const deliveryOption = getDelivery(cartDeliveryId);
        const { deliveryDays } = deliveryOption;

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryDays,
            'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        if (deliveryOption) {
            deliveryOption.deliveryDays
        }

        if (matchingProduct) {
            displayHTML += `
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${id}">
            <div class="delivery-date">
            Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
            <img class="product-image"
                src="${image}">

            <div class="cart-item-details">
                <div class="product-name">
                ${name}
                </div>
                <div class="product-price">
                $${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                    js-product-quantity-test-suite-${id}">
                <span>
                    Quantity: <span class="quantity-label js-quantity-label-${id}">${quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${id}">
                    Update
                </span>
                <input type="number" class="quantity-input js-quantity-input-${id}" min="1" max="1000">
                <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${id}">
                    Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" 
                js-delete-link-test-suite-${id} data-product-id="${id}">
                    Delete
                </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(id, deliveryOptionId)}
            </div>
            </div>
        </div>
        `;
        }
    });

    function deliveryOptionsHTML(matchingProductId, deliveryOptionId) {
        let displayHTML = '';

        deliveryOptions.forEach((deliveryOption, index) => {
            deliveryOption = deliveryOptions[index];
            const { id, deliveryDays, priceCents } = deliveryOption;

            const today = dayjs();
            const deliveryDate = today.add(
                deliveryDays,
                'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = priceCents === 0 ? "FREE" : `$${formatCurrency(priceCents)} -`;

            const isChecked = id === deliveryOptionId;

            displayHTML += `
                <div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProductId}"
                data-delivery-option-id="${id}"
                >
                <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProductId}">
                <div>
                    <div class="delivery-option-date">
                    ${dateString}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                </div>
                </div>
        `;
        });
        return displayHTML;
    }


    function updateCartQuantity() {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        const linkCart = document.querySelector('.js-quantity-link');
        const cartString = `${cartQuantity} item${cartQuantity === 1 ? '' : 's'}`;

        if (linkCart) {
            linkCart.innerHTML = cartString;
            
        } else {
            console.error('linkCart element not found');
        }

    }


    const renderItem = document.querySelector('.js-order-summary');

    renderItem.innerHTML = displayHTML;

    document.querySelectorAll('.js-delete-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.remove();
            updateCartQuantity();
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-update-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            const inputCart = document.querySelector(`.js-quantity-input-${productId}`);
            let matchingItem = cart.find(cartItem => cartItem.productId === productId);
            container.classList.add('is-editing-quantity');
            inputCart.value = matchingItem.quantity;
        });
    });

    document.querySelectorAll('.js-save-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.classList.remove('is-editing-quantity');

            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

            const newQuantity = Number(quantityInput.value);
            updateQuantity(productId, newQuantity);

            const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
            quantityLabel.innerHTML = newQuantity;
            updateCartQuantity();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((button) => {
        button.addEventListener('click', () => {
            // const productId = button.dataset.productId;
            // const deliveryOptionId = button.dataset.deliveryOptionId;
            //SHORTHAND METHOD
            const { productId, deliveryOptionId } = button.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });

    updateCartQuantity();
}




