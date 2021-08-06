const fila = document.querySelector('.home-products-scroll');
const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');


flechaDerecha.addEventListener('click', () => {
    fila.scrollLeft += fila.offsetWidth;
});
