const daftarBelanja = document.getElementById("daftar-belanja");
const alertSuccess = document.getElementById("alert-success");
const alertDanger = document.getElementById("alert-danger");

// Fetch Basket on onload
window.addEventListener("load", () => {
    fetchBasketFromCookie();
});

// Get Cookie
function getCookie(cname) {
    let getData = document.cookie;
    let regex = /basket=([^\;]+)/;
    let match = regex.exec(getData);

    // if match not null
    if (match != null) {

        match.forEach((item, key) => {
            if (item.includes("basket")) {
                let splitData = item.split("=");
                if (splitData[ 0 ] == cname) {
                    let data = splitData[ 1 ];
                    let convertData = JSON.parse(data);
                    let totalHarga = 0;

                    // Check length convertData
                    if (convertData.length == 0) {
                        daftarBelanja.innerHTML = `
                        <tr>
                            <td colspan="6" class="text-center">Tidak ada barang di keranjang</td>
                        </tr>
                    `;
                    } else {

                        // Looping data
                        convertData.forEach((item, key) => {
                            totalHarga += item.harga * item.qty;
                            daftarBelanja.innerHTML += `
                        <tr>
                            <td>${key + 1}</td>
                            <td>${item.nama}</td>
                            <td>${item.harga}</td>
                            <td>${item.qty}</td>
                            <td class="text-end">${item.harga * item.qty}</td>
                            <td>
                                <button class="btn btn-danger" onclick="deleteItem(${item.id})">
                                    <i class="bx bx-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                        });

                        // Set total harga
                        let totalHargaDiv = document.getElementById("total-harga");
                        totalHargaDiv.innerHTML = `
                        ${totalHarga.toLocaleString('id-ID')}
                    `;

                        // Show checkout button
                        let checkoutBtn = document.getElementById("checkout");
                        checkoutBtn.classList.remove("d-none");
                    }
                }
            }
        });
    }
}

// Set Cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete item from basket
function deleteItem(keyID) {
    let getData = document.cookie;
    let regex = /basket=([^\;]+)/;
    let match = regex.exec(getData);

    match.forEach((item, key) => {
        if (item.includes("basket")) {
            let splitData = item.split("=");
            let convertData = JSON.parse(splitData[ 1 ]);
            convertData.forEach((item, index) => {
                if (item.id == keyID) {
                    convertData.splice(index, 1);
                    // remove from cookie
                    setCookie("basket", JSON.stringify(convertData), 1);
                    // reload page
                    location.reload();
                }
            });
        }
    });

}

// Fetch Basket
function fetchBasketFromCookie() {
    const basket = getCookie("basket");
    if (basket != "") {
        return basket;
    } else {
        return [];
    }
}

// checkout
function checkout() {
    let getData = document.cookie;
    let regex = /token_pt_pupuk_indo_jaya_sukses=([^\;]+)/;
    let match = regex.exec(getData);

    if (match != null) {
        match.forEach((item, key) => {
            if (item.includes("token_pt_pupuk_indo_jaya_sukses")) {
                let splitData = item.split("=");
                if (splitData[ 1 ] != '') {
                    let regex = /basket=([^\;]+)/;
                    let match = regex.exec(getData);
                    match.forEach((item, key) => {
                        if (item.includes("basket")) {
                            let splitData = item.split("=");
                            let convertData = JSON.parse(splitData[ 1 ]);

                            // find userid
                            let regex = /userid_pt_pupuk_indo_jaya_sukses=([^\;]+)/;
                            let match = regex.exec(getData);
                            let userID = 0;
                            match.forEach((item, key) => {
                                if (item.includes("userid_pt_pupuk_indo_jaya_sukses")) {
                                    let splitData = item.split("=");
                                    userID = splitData[ 1 ];
                                }
                            });


                            fetch("http://127.0.0.1:1993/?page=checkout", {
                                method: "POST",
                                body: JSON.stringify({
                                    data: convertData,
                                    user_id: userID,
                                })
                            })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data.status == true) {
                                        // delete cookie
                                        setCookie("basket", "", -1);
                                        // show alert
                                        alertSuccess.classList.remove("d-none");
                                        daftarBelanja.innerHTML = `
                                        <tr>
                                            <td colspan="6" class="text-center">Tidak ada barang di keranjang</td>
                                        </tr>
                                    `;

                                        // Hide checkout button
                                        let checkoutBtn = document.getElementById("checkout");
                                        checkoutBtn.classList.add("d-none");
                                    }
                                });
                        }
                    });
                }
            }
        });
    } else {
        alertDanger.classList.remove("d-none");
    }
}