const galleryContainer = document.getElementById("gallery-container");
const contactLokasi = document.querySelector("#contact-lokasi");
const contactEmail = document.getElementById("contact-email");
const contactTelepon = document.getElementById("contact-telepon");
const formContactUs = document.getElementById("form-contact-us");
const alertContactUs = document.getElementById("alert-contact-us");

// Window Load
window.addEventListener("load", () => {
    fetchGallery();
    fetchIdentitas();
});

// Fetch Identitas
function fetchIdentitas() {
    fetch("http://127.0.0.1:1993/?page=identity")
        .then((res) => res.json())
        .then((data) => {
            contactLokasi.innerHTML = data.lokasi;
            contactEmail.innerHTML = data.email;
            contactTelepon.innerHTML = data.telpon;
        });
}

// Fetch Gallery
function fetchGallery() {
    fetch("http://127.0.0.1:1993/?page=product")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((product) => {
                galleryContainer.innerHTML += `
                    <div class="col-lg-6 mb-3">
                        <div class="member d-flex align-items-start">
                            <div class="pic">
                                <img src="http://127.0.0.1:1990/assets/img/${product.foto}" class="img-fluid" alt="">
                            </div>
                            <div class="member-info">
                                <h4>${product.nama_produk}</h4>
                                <span>${product.nama_kategory}</span>
                                <p>
                                    lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

// Kirim Pesan
formContactUs.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formContactUs);

    fetch("http://127.0.0.1:1993/?page=send-contact-us", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                // show alert
                alertContactUs.classList.remove("d-none");
                // reset form
                formContactUs.reset();
            }
        });
});