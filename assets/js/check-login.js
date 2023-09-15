// init
const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const userSuccessLogin = document.getElementById("user-success-login");

// Onload
window.onload = function () {
    checkLogin();
};

// Check Login
function checkLogin() {
    let getData = document.cookie;
    let regex = /token_pt_pupuk_indo_jaya_sukses=([^\;]+)/;
    let match = regex.exec(getData);

    if (match != null) {
        match.forEach((item, key) => {
            if (item.includes("token_pt_pupuk_indo_jaya_sukses")) {
                let splitData = item.split("=");
                if (splitData[ 1 ] != '') {
                    btnLogin.style.display = "none";
                    btnRegister.style.display = "none";
                    userSuccessLogin.classList.remove("d-none");
                }
            }
        });
    } else {
    }
}

// Logout
function logout() {
    // remove cookie userid_pt_pupuk_indo_jaya_sukses
    document.cookie = "userid_pt_pupuk_indo_jaya_sukses=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // remove cookie token_pt_pupuk_indo_jaya_sukses
    document.cookie = "token_pt_pupuk_indo_jaya_sukses=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // redirect to login page
    window.location.href = "login.html";
}