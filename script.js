document.addEventListener('DOMContentLoaded', () => {
    // ? object
    const filters = {
        category: "all",
        supplierTypes: { tradeAssurance: false, verifiedSuppliers: false },
        productTypes: { goldSupplier: false, paidSamples: false },
        condition: { newStuff: false, secondHand: false },
        minOrder: 10,
        priceRange: { min: 0, max: 6000 },
        sort: "Best Match"
    };

    // ? divlar va imglar
    const products = [
        {
            name: "Zenbook Pro 14 Duo OLED (UX8402, 11th Gen Intel)",
            price: 1854,
            originalPrice: 1911,
            rating: 5,
            sold: 120,
            image: "assets/img-1-removebg-preview.png"
        },
        {
            name: "Vivobook S 16X OLED (M5602, AMD Ryzen 5000)",
            price: 1439,
            originalPrice: 1410,
            rating: 4.8,
            sold: 50,
            image: "assets/img-2-removebg-preview.png"
        },
        {
            name: "Vivobook 13 Slate OLED (T3300, 11th Gen Intel)",
            price: 575,
            originalPrice: 580,
            rating: 4.8,
            sold: 24,
            image: "assets/img-3-removebg-preview.png"
        },
        {
            name: "Zenbook Pro 16X OLED (UX7602, 11th Gen Intel)",
            price: 2237,
            originalPrice: 2340,
            rating: 4.7,
            sold: 80,
            image: "assets/img-4-removebg-preview.png"
        },
        {
            name: "ProArt Studiobook Pro 16 OLED (W7600,11th Gen Intel)",
            price: 5881,
            originalPrice: 5900,
            rating: 4.9,
            sold: 68,
            image: "assets/img-1-removebg-preview.png"
        },
        {
            name: "Vivobook Go 14 Flip (TP1400, 11th Gen Intel)",
            price: 400,
            originalPrice: 450,
            rating: 3.5,
            sold: 32,
            image: "assets/img-3-removebg-preview.png"
        },
        {
            name: "Zenbook 14 Flip OLED (UP5401, 11th Gen Intel)",
            price: 450,
            originalPrice: 560,
            rating: 4.5,
            sold: 100,
            image: "assets/img-4-removebg-preview.png"
        },
        {
            name: "ProArt Studiobook 16 OLED (H7600, 12th Gen Intel)",
            price: 2890,
            originalPrice: 2900,
            rating: 4.9,
            sold: 140,
            image: "assets/img-2-removebg-preview.png"
        }
    ];

    const cart = [];
    let selectedProduct = null;

    function getNestedFilterValue(obj, path) {
        return path.split('.').reduce((o, k) => o[k], obj);
    }

    function setNestedFilterValue(obj, path, value) {
        const keys = path.split('.');
        keys.reduce((o, k, i) => {
            if (i === keys.length - 1) o[k] = value;
            return o[k];
        }, obj);
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        let html = '';
        for (let i = 0; i < full; i++) html += '<i class="bx bxs-star"></i>';
        if (half) html += '<i class="bx bxs-star-half"></i>';
        for (let i = 0; i < 5 - full - (half ? 1 : 0); i++) html += '<i class="bx bx-star"></i>';
        return html;
    }

    function applyFilters() {
        let filteredProducts = [...products];

        if (filters.category !== "all") {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(filters.category.toLowerCase())
            );
        }

        filteredProducts = filteredProducts.filter(product =>
            product.price >= filters.priceRange.min &&
            product.price <= filters.priceRange.max
        );

        filteredProducts = filteredProducts.filter(product =>
            product.price >= filters.minOrder
        );

        if (filters.sort === "Price Low to High") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filters.sort === "Price High to Low") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProducts);
    }

    function displayProducts(productsToDisplay) {
        const grid = document.getElementById('product-grid');
        grid.innerHTML = '';

        if (productsToDisplay.length === 0) {
            grid.innerHTML = '<p class="no-products">No products match your filters</p>';
            return;
        }
        // ? product cardlar
        productsToDisplay.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h3>${p.name}</h3>
                <div class="price">$${p.price}</div>
                <div class="stars">${renderStars(p.rating)}</div>
                <div class="sold-count">Sold ${p.sold}</div>
                <button class="buy-btn" data-id="${p.name}">Add to Cart</button>
            `;
            grid.appendChild(card);
        });

        const resultCount = document.querySelector('.result-count-text');
        if (resultCount) {
            resultCount.textContent = `Showing ${productsToDisplay.length} of ${products.length} products`;
        }
    }

    function updateCartDisplay() {
        const cartItemsElement = document.getElementById('cart-items');
        if (!cartItemsElement) return;

        if (cart.length === 0) {
            cartItemsElement.innerHTML = '<p>Your cart is currently empty</p>';
            return;
        }

        cartItemsElement.innerHTML = `
            <div class="cart-items-list">
                ${cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" width="50">
                        <div>
                            <h4>${item.name}</h4>
                            <div>$${item.price} x ${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <strong>Total: $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
            </div>
        `;
    }

    function openCartModal() {
        document.getElementById('cart-modal-right').classList.add('active');
        document.getElementById('quantity-input').value = 1;
    }

    function closeCartModal() {
        document.getElementById('cart-modal-right').classList.remove('active');
    }

    ['lang-select', 'city-select'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.onchange = e => console.log(`${el.id === 'lang-select' ? 'Language' : 'City'}:`, e.target.value);
    });

    document.querySelectorAll('.modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = document.getElementById(btn.getAttribute('data-modal'));
            if (modal) modal.style.display = 'flex';
        });
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.style.display = 'none';
        });
    });

    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeProfile = document.querySelector('.close-profile');

    if (profileBtn && profileModal && closeProfile) {
        profileBtn.addEventListener('click', () => profileModal.classList.add('active'));
        closeProfile.addEventListener('click', () => profileModal.classList.remove('active'));
    }

    const filterInputs = {
        minOrder: {
            input: document.getElementById('min-order-input'),
            range: document.getElementById('min-order-range')
        },
        priceMin: {
            input: document.getElementById('price-min-input'),
            range: document.getElementById('price-min-range')
        },
        priceMax: {
            input: document.getElementById('price-max-input'),
            range: document.getElementById('price-max-range')
        }
    };

    for (let key in filterInputs) {
        const { input, range } = filterInputs[key];
        const filterKey = key === 'priceMin' ? 'priceRange.min' : key === 'priceMax' ? 'priceRange.max' : 'minOrder';

        [input, range].forEach(el => {
            if (el) {
                el.value = getNestedFilterValue(filters, filterKey);
                el.addEventListener('input', e => {
                    setNestedFilterValue(filters, filterKey, parseInt(e.target.value));
                    if (input) input.value = e.target.value;
                    if (range) range.value = e.target.value;
                    applyFilters();
                });
            }
        });
    }

    const categorySelect = document.getElementById('category-select');
    if (categorySelect) {
        categorySelect.value = filters.category;
        categorySelect.onchange = e => {
            filters.category = e.target.value;
            applyFilters();
        };
    }

    const sortDropdown = document.getElementById('sort-dropdown');
    if (sortDropdown) {
        sortDropdown.value = filters.sort;
        sortDropdown.onchange = e => {
            filters.sort = e.target.value;
            applyFilters();
        };
    }

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', e => {
            const { category, type } = e.target.dataset;
            if (filters[category] && filters[category][type] !== undefined) {
                filters[category][type] = e.target.checked;
                applyFilters();
            }
        });
    });

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            filters.category = "all";
            filters.supplierTypes = { tradeAssurance: false, verifiedSuppliers: false };
            filters.productTypes = { goldSupplier: false, paidSamples: false };
            filters.condition = { newStuff: false, secondHand: false };
            filters.minOrder = 10;
            filters.priceRange = { min: 0, max: 6000 };
            filters.sort = "Best Match";

            if (categorySelect) categorySelect.value = filters.category;
            if (sortDropdown) sortDropdown.value = filters.sort;

            document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                if (cb.dataset.category && cb.dataset.type) {
                    cb.checked = false;
                }
            });

            Object.keys(filterInputs).forEach(key => {
                const { input, range } = filterInputs[key];
                const value = getNestedFilterValue(filters,
                    key === 'priceMin' ? 'priceRange.min' :
                        key === 'priceMax' ? 'priceRange.max' : 'minOrder');
                if (input) input.value = value;
                if (range) range.value = value;
            });

            applyFilters();
        });
    }

    document.addEventListener('click', e => {
        if (e.target.classList.contains('buy-btn')) {
            const productName = e.target.getAttribute('data-id');
            selectedProduct = products.find(p => p.name === productName);
            openCartModal();
        }

        if (e.target.id === 'confirm-btn') {
            const qty = parseInt(document.getElementById('quantity-input').value);
            if (!qty || qty < 1) {
                alert('Please enter a valid quantity');
                return;
            }

            cart.push({ ...selectedProduct, quantity: qty });
            updateCartDisplay();
            closeCartModal();

            document.getElementById('cart-modal').style.display = 'flex';
        }
    });

    applyFilters();
    updateCartDisplay();
});


// script.js faylingizga qo'shimchalar
document.addEventListener('DOMContentLoaded', () => {
    // ... (mavjud kodingiz) ...

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // ... (qolgan kodingiz) ...
});