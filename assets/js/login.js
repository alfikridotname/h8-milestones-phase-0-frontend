// Initialize
const formLogin = document.querySelector('#form-login');
const alertLogin = document.querySelector('#alert-login');
const logRegContainer = document.querySelector('#log-reg-container');
const userSuccessLogin = document.querySelector('#user-success-login');
const usernameSuccessLogin = document.querySelector('#username-success-login');

// Login
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    fetch('http://localhost:1993/?page=login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    })
        .then((res) => res.json())
        .then(data => {
            if (data.status == true) {
                document.cookie = "token_pt_pupuk_indo_jaya_sukses=" + data.token;
                logRegContainer.classList.add('d-none');
                userSuccessLogin.classList.remove('d-none');
                window.location.href = "product.html";
            } else {
                alertLogin.classList.remove('d-none');
                alertLogin.innerHTML = `
                    ${data.message}
                `;
            }
        }).catch(err => {
            console.log(err);
        });
});