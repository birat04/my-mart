document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const clearCartButton = document.querySelector('.clear-cart');

    
    loadCart();

    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    
    function addToCart(event) {
        const button = event.target;
        const item = button.closest('.category-card');
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = 10.00; 

        
        const existingItem = Array.from(cartItemsContainer.querySelectorAll('.cart-item-name'))
            .find(cartItemName => cartItemName.textContent === itemName);

        if (existingItem) {
            alert('Item already in cart!');
            return;
        }

        
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="cart-item-name">${itemName}</span>
            <span class="cart-item-price">$${itemPrice.toFixed(2)}</span>
            <button class="remove-from-cart">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);

        
        cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
            cartItem.remove();
            updateTotalPrice();
            saveCart();
        });

        updateTotalPrice();
        saveCart();
    }

    
    function updateTotalPrice() {
        const totalPrice = Array.from(cartItemsContainer.querySelectorAll('.cart-item-price'))
            .map(priceElement => parseFloat(priceElement.textContent.replace('$', '')))
            .reduce((sum, price) => sum + price, 0);

        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    
    clearCartButton.addEventListener('click', () => {
        cartItemsContainer.innerHTML = '';
        updateTotalPrice();
        localStorage.removeItem('cartItems');
    });

    
    function saveCart() {
        const cartItems = Array.from(cartItemsContainer.querySelectorAll('.cart-item')).map(item => ({
            name: item.querySelector('.cart-item-name').textContent,
            price: item.querySelector('.cart-item-price').textContent,
        }));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${item.price}</span>
                <button class="remove-from-cart">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
                cartItem.remove();
                updateTotalPrice();
                saveCart();
            });
        });
        updateTotalPrice();
    }
});
