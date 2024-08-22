import { cart } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDelivery } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary(){

    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem, index) => {
        cartItem = cart[index];

        const { productId, quantity, deliveryOptionId } = cartItem;
        const matchingProduct = getProduct(productId);
        const { priceCents } = matchingProduct;
        productPriceCents += priceCents * quantity;

        const deliveryOption = getDelivery(deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const estimatedTax = totalBeforeTaxCents * 0.1;

    const totalCents = totalBeforeTaxCents + estimatedTax;

    const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}