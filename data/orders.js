const getItem = JSON.parse(localStorage.getItem('orders'));
export const orders = getItem || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

