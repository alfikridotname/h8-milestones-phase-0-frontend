const daftarBelanja = document.getElementById("daftar-belanja");

// Fetch Basket on onload
window.addEventListener("load", () => {
    fetchBasketFromCookie();
});

// Get Cookie
function getCookie(cname) {
    let getData = document.cookie;
    let splitData = getData.split("=");

    if (splitData[ 0 ] == cname) {
        let data = splitData[ 1 ];
        let convertData = JSON.parse(data);
        let totalHarga = 0;

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

        let totalHargaDiv = document.getElementById("total-harga");
        totalHargaDiv.innerHTML = `
            ${totalHarga.toLocaleString('id-ID')}
        `;
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
function deleteItem(key) {
    let getData = document.cookie;
    let splitData = getData.split("=");
    let convertData = JSON.parse(splitData[ 1 ]);

    convertData.forEach((item, index) => {
        if (item.id == key) {
            convertData.splice(index, 1);
            // remove from cookie
            setCookie("basket", JSON.stringify(convertData), 1);
            // reload page
            location.reload();
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
    let splitData = getData.split("=");
    let convertData = JSON.parse(splitData[ 1 ]);
    // let stringify = JSON.stringify(convertData);

    fetch("http://127.0.0.1:1993/?page=checkout", {
        method: "POST",
        body: JSON.stringify({
            data: convertData,
            userID: 123
        })
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.status == true) {
                // delete cookie
                setCookie("basket", "", -1);
                // reload
                location.reload();
            }
        });
}