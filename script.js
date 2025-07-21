// Lang va city select
document.getElementById('lang-select').onchange = function () {
    console.log('Til:', this.value);
};
document.getElementById('city-select').onchange = function () {
    console.log('Shahar:', this.value);
};

// Modal tugmalar
document.querySelectorAll('.modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        let modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'flex';
    });
});

// Modal yopish
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = 'none';
    });
});

// Modal foniga bosilsa yopiladi
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

// Profile modal (o'ngdan chiqadi)
const profileBtn = document.getElementById('profile-btn');
const profileModal = document.getElementById('profile-modal');
const closeProfile = document.querySelector('.close-profile');

profileBtn.addEventListener('click', () => {
    profileModal.classList.add('active');
});
closeProfile.addEventListener('click', () => {
    profileModal.classList.remove('active');
});

// Mahsulot ma'lumotlarini saqlash uchun ob'ektlar massivi
const products = [
    {
        id: 1,
        name: "Zenbook Pro 14 Duo OLED (UX8402, 11th Gen Intel)",
        price: 1854,
        sold: 120,
        image: "assets/img-1-removebg-preview.png"
    },
    {
        id: 2,
        name: "Vivobook S 16X OLED (M5602, AMD Ryzen 5000)",
        price: 1439,
        sold: 50,
        image: "assets/img-2-removebg-preview.png"
    },
    {
        id: 3,
        name: "Vivobook 13 Slate OLED (T3300, 11th Gen Intel)",
        price: 575,
        sold: 24,
        image: "assets/img-3-removebg-preview.png"
    },
    {
        id: 4,
        name: "Zenbook Pro 16X OLED (UX7602, 11th Gen Intel)",
        price: 2237,
        sold: 80,
        image: "assets/img-4-removebg-preview.png"
    },
    {
        id: 5,
        name: "ProArt Studiobook 16 OLED (W7600, 11th Gen Intel)",
        price: 5881,
        sold: 68,
        image: "assets/img-1-removebg-preview.png"
    },
    {
        id: 6,
        name: "Vivobook Go 14 Flip (TP1400, 11th Gen Intel)",
        price: 400,
        sold: 32,
        image: "assets/img-3-removebg-preview.png"
    },
    {
        id: 7,
        name: "Zenbook 14 Flip OLED (UP5401, 11th Gen Intel)",
        price: 450,
        sold: 100,
        image: "assets/img-1-removebg-preview.png"
    },
    {
        id: 8,
        name: "ProArt Studiobook 16 OLED (H7600, 12th Gen Intel)",
        price: 2890,
        sold: 140,
        image: "assets/img-4-removebg-preview.png"
    }
];

// Saralash parametrlari uchun ob'ekt
const sortSettings = {
    sort: "Best Match"
};

// HTML elementlariga murojaatlar - will be defined after dynamic injection
let productGrid;
let sortDropdown;
let resultCount;

// Mahsulotlarni ko'rsatish funksiyasi
function displayProducts(sortedProducts) {
    if (!productGrid) return; // Ensure element exists

    productGrid.innerHTML = '';
    if (sortedProducts.length === 0) {
        productGrid.innerHTML = '<p class="text-center text-gray-500 col-span-full">Hech qanday mahsulot topilmadi.</p>';
        resultCount.textContent = '0';
        return;
    }

    sortedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <div class="stars">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bx-star"></i>
            </div>
            <p class="sold-count">Sotilgan: ${product.sold}</p>
            <button class="buy-btn">Sotib olish</button>
        `;
        productGrid.appendChild(productCard);
    });
    resultCount.textContent = sortedProducts.length;
}

// Saralash funksiyasi
function applySorting() {
    let sorted = [...products];

    if (sortSettings.sort === "Best Match") {
        // No specific sorting for "Best Match" - keep original order
    } else if (sortSettings.sort === "Price: Low to High") {
        sorted.sort((a, b) => a.price - b.price);
    } else if (sortSettings.sort === "Price: High to Low") {
        sorted.sort((a, b) => b.price - a.price);
    } else if (sortSettings.sort === "Newest") {
        sorted.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
    }

    displayProducts(sorted);
}

// Boshlang'ich qiymatlarni o'rnatish
function initializeSortInput() {
    if (sortDropdown) { // Check if sortDropdown exists before accessing its value
        sortDropdown.value = sortSettings.sort;
    }
}

// Function to dynamically inject main content
function injectMainContent() {
    const mainElement = document.querySelector('main');
    if (!mainElement) {
        console.error("Main element not found!");
        return;
    }

    const mainContentHTML = `
        <div class="main-content">
            <aside class="filters-sidebar">
                <h3>Filters</h3>

                <div class="filter-group">
                    <h4>Supplier Types</h4>
                    <label><input type="checkbox" data-category="supplierTypes" data-type="tradeAssurance"> Trade Assurance</label>
                    <label><input type="checkbox" data-category="supplierTypes" data-type="verifiedSuppliers"> Verified Suppliers</label>
                </div>

                <div class="filter-group">
                    <h4>Product Types</h4>
                    <label><input type="checkbox" data-category="productTypes" data-type="readyToShip"> Ready to Ship</label>
                    <label><input type="checkbox" data-category="productTypes" data-type="paidSamples"> Paid Samples</label>
                </div>

                <div class="filter-group">
                    <h4>Condition</h4>
                    <label><input type="checkbox" data-category="condition" data-type="newStuff"> New Stuff</label>
                    <label><input type="checkbox" data-category="condition" data-type="secondHand"> Second Hand</label>
                </div>

                <div class="filter-group">
                    <h4>Min. Order</h4>
                    <input type="range" id="min-order-range" min="0" max="1000" value="10">
                    <input type="number" id="min-order-input" min="0" max="1000" value="10">
                </div>

                <div class="filter-group">
                    <h4>Price Range ($)</h4>
                    <div class="price-range-inputs">
                        <input type="range" id="price-min-range" min="0" max="6000" value="100">
                        <input type="number" id="price-min-input" min="0" max="6000" value="100">
                    </div>
                    <div class="price-range-inputs">
                        <input type="range" id="price-max-range" min="0" max="6000" value="6000">
                        <input type="number" id="price-max-input" min="0" max="6000" value="6000">
                    </div>
                </div>

                <button id="clear-filters-btn" class="clear-filters-btn">Clear Filters</button>
            </aside>

            <section class="product-listing">
                <div class="sort-controls">
                    <span class="result-count-text">Found <span id="result-count">0</span> results</span>
                    <select id="sort-dropdown" aria-label="Sort products by">
                        <option value="Best Match">Best Match</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                        <option value="Newest">Newest</option>
                    </select>
                </div>
                <div class="product-grid" id="product-grid">
                    </div>
            </section>
        </div>
    `;

    // Append the dynamically created content to the main element
    mainElement.insertAdjacentHTML('beforeend', mainContentHTML);

    // After content is injected, get references to the elements
    productGrid = document.getElementById('product-grid');
    sortDropdown = document.getElementById('sort-dropdown');
    resultCount = document.getElementById('result-count');

    // Attach sorting event listener after element is in DOM
    if (sortDropdown) {
        sortDropdown.addEventListener('change', (e) => {
            sortSettings.sort = e.target.value;
            applySorting();
        });
    }

    // Initialize display
    initializeSortInput();
    applySorting();
}


document.addEventListener('DOMContentLoaded', () => {
    injectMainContent(); // Inject content on DOM load
});