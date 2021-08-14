const btnInicioSesion=document.getElementById('btnIniciarSesion');
const input_email = document.getElementById('emailModal');
const input_password = document.getElementById('passwordModal');
const labeluniqueemail = document.querySelector('.label-unique-email');
const labeluniquepassword = document.querySelector('.label-unique-password');

const closeBoton = document.querySelector('.popup_close_button');

btnInicioSesion.addEventListener('click', () => {
    alert()
});

input_email.addEventListener('click', () => {
    labeluniqueemail.classList.remove('label-unique-email')
    labeluniqueemail.classList.add('label-js-email')
});

input_password.addEventListener('click', () => {
    labeluniquepassword.classList.remove('label-unique-password')
    labeluniquepassword.classList.add('label-js-password')
});