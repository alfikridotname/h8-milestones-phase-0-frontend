const formRegister = document.querySelector('#form-register');
const alertRegister = document.querySelector('#alert-register');

formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const first_name = document.querySelector('#first_name').value;
    const last_name = document.querySelector('#last_name').value;
    const email = document.querySelector('#email').value;
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const password_confirmation = document.querySelector('#password_confirmation').value;

    if (password != password_confirmation) {
        alertRegister.classList.remove('d-none');
        alertRegister.innerHTML = `
            Password dan Konfirmasi Password tidak sama
        `;
        return false;
    }


    fetch('http://localhost:1993/?page=register', {
        method: 'POST',
        body: JSON.stringify({
            first_name,
            last_name,
            email,
            username,
            password,
            password_confirmation
        }),
    })
        .then((res) => res.json())
        .then(data => {
            if (data.status == true) {
                window.location.href = "login.html";
            } else {
                alertRegister.classList.remove('d-none');
                alertRegister.innerHTML = `
                    ${data.message}
                `;
            }
        }).catch(err => {
            console.log(err);
        });
});