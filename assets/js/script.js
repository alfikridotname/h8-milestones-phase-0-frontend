const productCategory = document.getElementById("product-category");
const productContainer = document.getElementById("product-container");

// Window Load
window.addEventListener("load", () => {
    fetchCategory();
    fetchProduct();
    fetchGallery();
});

// Set Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Fetch Category
function fetchCategory() {
    fetch("http://127.0.0.1:1993/?page=category")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((category) => {
                productCategory.innerHTML += `
                    <li id="category-${category.id}">${category.nama_kategory}</li>
                `;
            });
        });
}

// Fetch Products
function fetchProduct() {
    fetch("http://127.0.0.1:1993/?page=product")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((product) => {
                productContainer.innerHTML += `
                    <div class="col-lg-3 col-md-6 product-item">
                        <div class="products-img">
                            <img src="http://127.0.0.1:1990/assets/img/${product.foto}" height="300px" alt="">
                        </div>
                        <div class="products-info">
                            <h4>${product.nama_produk}</h4>
                            <p>Rp. ${parseFloat(product.harga).toLocaleString('id-ID')}</p>
                            <button class="btn btn-primary" onclick="addToBasket(${product.id})"
                                title="Tambahkan ke keranjang">
                                <i class="bx bx-plus"></i>
                            </button>
                        </div>
                    </div>
                `;
            });
        });
}

let basket = [];

function addToBasket(id) {
    // add to basket
    // basket.push(id);

    // set cookie
    // setCookie("basket", JSON.stringify(basket), 1);
}
