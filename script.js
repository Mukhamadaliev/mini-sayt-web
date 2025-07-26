// Product data
const products = [
    {
        id: 1,
        name: { uz: "Zenbook Pro 14 Duo OLED (UX8402, 11th Gen Intel)", ru: "Zenbook Pro 14 Duo OLED (UX8402, 11-поколение Intel)" },
        price: 1854,
        originalPrice: 1911,
        rating: 3.0,
        sold: 120,
        image: "assets/img-1-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: false },
        productTypes: { goldSupplier: true, paidSamples: false },
        condition: { newStuff: true, secondHand: false }
    },
    {
        id: 2,
        name: { uz: "Vivobook S 16X OLED (M5602, AMD Ryzen 5000)", ru: "Vivobook S 16X OLED (M5602, AMD Ryzen 5000)" },
        price: 1439,
        originalPrice: 1410,
        rating: 4.8,
        sold: 50,
        image: "assets/img-2-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: true },
        productTypes: { goldSupplier: false, paidSamples: true },
        condition: { newStuff: true, secondHand: false }
    },
    {
        id: 3,
        name: { uz: "Vivobook 13 Slate OLED (T3300, 11th Gen Intel)", ru: "Vivobook 13 Slate OLED (T3300, 11-поколение Intel)" },
        price: 575,
        originalPrice: 580,
        rating: 4.8,
        sold: 24,
        image: "assets/img-3-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: false, verifiedSuppliers: true },
        productTypes: { goldSupplier: true, paidSamples: false },
        condition: { newStuff: false, secondHand: true }
    },
    {
        id: 4,
        name: { uz: "Zenbook Pro 16X OLED (UX7602, 11th Gen Intel)", ru: "Zenbook Pro 16X OLED (UX7602, 11-поколение Intel)" },
        price: 2237,
        originalPrice: 2340,
        rating: 4.7,
        sold: 80,
        image: "assets/img-4-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: true },
        productTypes: { goldSupplier: true, paidSamples: true },
        condition: { newStuff: true, secondHand: false }
    },
    {
        id: 5,
        name: { uz: "ProArt Studiobook Pro 16 OLED (W7600, 11th Gen Intel)", ru: "ProArt Studiobook Pro 16 OLED (W7600, 11-поколение Intel)" },
        price: 5881,
        originalPrice: 5900,
        rating: 4.0,
        sold: 68,
        image: "assets/img-1-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: false, verifiedSuppliers: true },
        productTypes: { goldSupplier: false, paidSamples: false },
        condition: { newStuff: true, secondHand: false }
    },
    {
        id: 6,
        name: { uz: "Vivobook Go 14 Flip (TP1400, 11th Gen Intel)", ru: "Vivobook Go 14 Flip (TP1400, 11-поколение Intel)" },
        price: 400,
        originalPrice: 450,
        rating: 3.5,
        sold: 32,
        image: "assets/img-2-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: false },
        productTypes: { goldSupplier: true, paidSamples: true },
        condition: { newStuff: false, secondHand: true }
    },
    {
        id: 7,
        name: { uz: "Zenbook 14 Flip OLED (UP5401, 11th Gen Intel)", ru: "Zenbook 14 Flip OLED (UP5401, 11-поколение Intel)" },
        price: 450,
        originalPrice: 560,
        rating: 4.2,
        sold: 100,
        image: "assets/img-3-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: true },
        productTypes: { goldSupplier: false, paidSamples: false },
    },
    {
        id: 8,
        name: { uz: "ProArt Studiobook 16 OLED (H7600, 12th Gen Intel)", ru: "ProArt Studiobook 16 OLED (H7600, 12-поколение Intel)" },
        price: 2890,
        originalPrice: 2900,
        rating: 4.9,
        sold: 140,
        image: "assets/img-4-removebg-preview.png",
        category: "laptops",
        supplierTypes: { tradeAssurance: true, verifiedSuppliers: true },
        productTypes: { goldSupplier: true, paidSamples: true },
        condition: { newStuff: true, secondHand: false }
    }
];

// Filtrlar obyekti
const filters = {
    category: "all",
    supplierTypes: {
        tradeAssurance: false,
        verifiedSuppliers: false
    },
    productTypes: {
        goldSupplier: false,
        paidSamples: false
    },
    condition: {
        newStuff: false,
        secondHand: false
    },
    minOrder: 10,
    priceRange: {
        min: 0,
        max: 6000
    },
    sort: "Best Match"
};

// Joriy til (standart: O'zbekcha)
let currentLanguage = 'Uz';

// DOM elementlari
const productGrid = document.getElementById('product-grid');
const minOrderInput = document.getElementById('min-order-input');
const minOrderRange = document.getElementById('min-order-range');
const priceMinInput = document.getElementById('price-min-input');
const priceMaxInput = document.getElementById('price-max-input');
const priceMinRange = document.getElementById('price-min-range');
const priceMaxRange = document.getElementById('price-max-range');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const resultCountSpan = document.getElementById('result-count');


const cart = [];
let selectedProduct = null;


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');


if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
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


function displayProducts(filteredProducts) {
    productGrid.innerHTML = '';
    if (filteredProducts.length === 0) {
        const noProductsText = currentLanguage === 'Uz'
            ? ''
            : '';
        productGrid.innerHTML = `<p class="text-center text-gray-500 col-span-full">${noProductsText}</p>`;
        resultCountSpan.textContent = '0';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        const productName = currentLanguage === 'Uz' ? product.name.uz : product.name.ru;
        const addToCartText = currentLanguage === 'Uz' ? 'Savatga qo\'shish' : 'Добавить в корзину';
        const soldText = currentLanguage === 'Uz' ? 'Sotilgan' : 'Продано';

        productCard.innerHTML = `
      <img src="${product.image}" alt="${productName}">
      <h3>${productName}</h3>
      <div class="price">$${product.price} <span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span></div>
      <div class="stars">${renderStars(product.rating)}</div>
      <div class="sold-count">${soldText} ${product.sold}</div>
      <button class="buy-btn" data-product-id="${product.id}">${addToCartText}</button>
    `;
        productGrid.appendChild(productCard);
    });
    resultCountSpan.textContent = filteredProducts.length;
}


function applyFilters() {
    let filtered = [...products];

    
    if (filters.category !== "all") {
        filtered = filtered.filter(product => product.category === filters.category);
    }

    
    if (filters.supplierTypes.tradeAssurance) {
        filtered = filtered.filter(product => product.supplierTypes?.tradeAssurance);
    }
    if (filters.supplierTypes.verifiedSuppliers) {
        filtered = filtered.filter(product => product.supplierTypes?.verifiedSuppliers);
    }

   
    if (filters.productTypes.goldSupplier) {
        filtered = filtered.filter(product => product.productTypes?.goldSupplier);
    }
    if (filters.productTypes.paidSamples) {
        filtered = filtered.filter(product => product.productTypes?.paidSamples);
    }

    
    if (filters.condition.newStuff) {
        filtered = filtered.filter(product => product.condition?.newStuff);
    }
    if (filters.condition.secondHand) {
        filtered = filtered.filter(product => product.condition?.secondHand);
    }

   
    filtered = filtered.filter(product =>
        product.price >= filters.minOrder &&
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

   
    if (filters.sort === "Eng mos keladigan" || filters.sort === "Best Match") {
        filtered.sort((a, b) => a.id - b.id);
    } else if (filters.sort === "Narx: Pastdan balandga" || filters.sort === "Price Low to High") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "Narx: Balanddan pastga" || filters.sort === "Price High to Low") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "Eng yangi" || filters.sort === "Newest") {
        filtered.sort((a, b) => b.id - a.id);
    }

    displayProducts(filtered);
}

// ? karzinka yangilash
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    if (!cartItemsElement) return;

    if (cart.length === 0) {
        const emptyCartText = currentLanguage === 'Uz'
            ? 'Sizning savatingiz hozircha bo\'sh.'
            : 'Ваша корзина пуста.';
        cartItemsElement.innerHTML = `<p>${emptyCartText}</p>`;
        return;
    }

    const totalText = currentLanguage === 'Uz' ? 'Jami' : 'Итого';

    cartItemsElement.innerHTML = `
    <div class="cart-items-list">
      ${cart.map(item => {
        const itemName = currentLanguage === 'Uz' ? item.name.uz : item.name.ru;
        return `
          <div class="cart-item">
            <img src="${item.image}" alt="${itemName}" width="50">
            <div>
              <h4>${itemName}</h4>
              <div>$${item.price} x ${item.quantity}</div>
            </div>
          </div>
        `;
    }).join('')}
    </div>
    <div class="cart-total">
      <strong>${totalText}: $${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</strong>
    </div>
  `;
}

// ? Karzinka modalini ochish
function openCartModal() {
    const cartModalRight = document.getElementById('cart-modal-right');
    const selectedProductImage = document.getElementById('selected-product-image');
    const quantityInput = document.getElementById('quantity-input');

    if (cartModalRight && selectedProductImage && quantityInput && selectedProduct) {
        selectedProductImage.src = selectedProduct.image;
        quantityInput.value = 1;
        cartModalRight.style.display = 'flex';
    }
}

// ? Karzinka modalini yopish
function closeCartModal() {
    const cartModalRight = document.getElementById('cart-modal-right');
    if (cartModalRight) {
        cartModalRight.style.display = 'none';
    }
}




document.addEventListener('DOMContentLoaded', () => {
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

   
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !e.target.closest('.nav-menu') &&
            !e.target.closest('#menu-toggle')) {
            navMenu.classList.remove('active');
        }
    });

    document.querySelectorAll('.modal-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    document.querySelectorAll('.modal-trigger-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });


    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });

    
    const profileBtn = document.getElementById('profile-btn');
    const profileModal = document.getElementById('profile-modal');
    const closeProfile = document.querySelector('.close-profile');

    if (profileBtn && profileModal && closeProfile) {
        profileBtn.addEventListener('click', () => {
            profileModal.classList.add('active');
        });

        closeProfile.addEventListener('click', () => {
            profileModal.classList.remove('active');
        });
    }

    
    document.querySelectorAll('.modal-options-list li').forEach(option => {
        option.addEventListener('click', function () {
            const targetTextId = this.parentElement.getAttribute('data-target-text');
            const modalId = this.parentElement.getAttribute('data-modal-id');
            const value = this.getAttribute('data-value');

            if (targetTextId) {
                const targetElement = document.getElementById(targetTextId);
                if (targetElement) {
                    targetElement.textContent = value;

                    if (modalId === 'lang-modal') {
                        changeLanguage(value);
                    }
                }
            }

            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'none';
                }
            }

            
            if (modalId === 'category-modal') {
                let categoryValue = this.getAttribute('data-value').toLowerCase();
                if (categoryValue === "barcha kategoriyalar") {
                    filters.category = "all";
                } else if (categoryValue === "noutbuklar") {
                    filters.category = "laptops";
                } else {
                    filters.category = categoryValue;
                }
                applyFilters();
            } else if (modalId === 'sort-modal') {
                if (value === "Eng mos keladigan") {
                    filters.sort = "Best Match";
                } else if (value === "Narx: Pastdan balandga") {
                    filters.sort = "Price Low to High";
                } else if (value === "Narx: Balanddan pastga") {
                    filters.sort = "Price High to Low";
                } else if (value === "Eng yangi") {
                    filters.sort = "Newest";
                } else {
                    filters.sort = value;
                }
                applyFilters();
            }
        });
    });

   
    if (minOrderInput) {
        minOrderInput.value = filters.minOrder;
        minOrderInput.addEventListener('input', (e) => {
            filters.minOrder = parseInt(e.target.value);
            if (minOrderRange) minOrderRange.value = e.target.value;
            applyFilters();
        });
    }
    if (minOrderRange) {
        minOrderRange.value = filters.minOrder;
        minOrderRange.addEventListener('input', (e) => {
            filters.minOrder = parseInt(e.target.value);
            if (minOrderInput) minOrderInput.value = e.target.value;
            applyFilters();
        });
    }

    if (priceMinInput) {
        priceMinInput.value = filters.priceRange.min;
        priceMinInput.addEventListener('input', (e) => {
            filters.priceRange.min = parseInt(e.target.value);
            if (priceMinRange) priceMinRange.value = e.target.value;
            applyFilters();
        });
    }
    if (priceMinRange) {
        priceMinRange.value = filters.priceRange.min;
        priceMinRange.addEventListener('input', (e) => {
            filters.priceRange.min = parseInt(e.target.value);
            if (priceMinInput) priceMinInput.value = e.target.value;
            applyFilters();
        });
    }

    if (priceMaxInput) {
        priceMaxInput.value = filters.priceRange.max;
        priceMaxInput.addEventListener('input', (e) => {
            filters.priceRange.max = parseInt(e.target.value);
            if (priceMaxRange) priceMaxRange.value = e.target.value;
            applyFilters();
        });
    }
    if (priceMaxRange) {
        priceMaxRange.value = filters.priceRange.max;
        priceMaxRange.addEventListener('input', (e) => {
            filters.priceRange.max = parseInt(e.target.value);
            if (priceMaxInput) priceMaxInput.value = e.target.value;
            applyFilters();
        });
    }

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            filters.category = "all";
            filters.supplierTypes = { tradeAssurance: false, verifiedSuppliers: false };
            filters.productTypes = { goldSupplier: false, paidSamples: false };
            filters.condition = { newStuff: false, secondHand: false };
            filters.minOrder = 10;
            filters.priceRange = { min: 0, max: 6000 };
            filters.sort = "Best Match";

            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            if (minOrderInput) minOrderInput.value = filters.minOrder;
            if (minOrderRange) minOrderRange.value = filters.minOrder;
            if (priceMinInput) priceMinInput.value = filters.priceRange.min;
            if (priceMinRange) priceMinRange.value = filters.priceRange.min;
            if (priceMaxInput) priceMaxInput.value = filters.priceRange.max;
            if (priceMaxRange) priceMaxRange.value = filters.priceRange.max;

            document.getElementById('selected-category-text').textContent = currentLanguage === 'Uz'
                ? "Barcha kategoriyalar"
                : "Все категории";
            document.getElementById('selected-sort-text').textContent = currentLanguage === 'Uz'
                ? "Eng mos keladigan"
                : "Лучшее соответствие";

            applyFilters();
        });
    }

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            const type = e.target.dataset.type;
            if (filters[category] && filters[category][type] !== undefined) {
                filters[category][type] = e.target.checked;
            }
            applyFilters();
        });
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('buy-btn')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            selectedProduct = products.find(p => p.id === productId);
            if (selectedProduct) {
                openCartModal();
            }
        }

        if (e.target.id === 'confirm-btn') {
            const qty = parseInt(document.getElementById('quantity-input').value);
            if (!qty || qty < 1) {
                const alertText = currentLanguage === 'Uz'
                    ? ''
                    : '';
               
                console.log(alertText);
                return;
            }

            const existingItemIndex = cart.findIndex(item => item.id === selectedProduct.id);
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += qty;
            } else {
                cart.push({ ...selectedProduct, quantity: qty });
            }

            updateCartDisplay();
            closeCartModal();

            const mainCartModal = document.getElementById('cart-modal');
            if (mainCartModal) {
                mainCartModal.style.display = 'flex';
            }
        }
    });

   
    document.querySelectorAll('input').forEach(input => {
        
        input.addEventListener('focus', function () {
            if (window.innerWidth <= 768) {
                this.style.fontSize = '16px';
            }
        });

        
        if (input.type === 'number') {
            input.addEventListener('input', function () {
                if (this.value.length > 4) {
                    this.value = this.value.slice(0, 4);
                }
            });
        }
    });





  
    window.closeCartModal = closeCartModal;

    // Dastlabki ko'rinish
    applyFilters();
    updateCartDisplay();
});


document.addEventListener('DOMContentLoaded', () => {
    // ... (mavjud kodingiz) ...

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }


});