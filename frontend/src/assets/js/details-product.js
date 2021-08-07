const fila2 = document.querySelector('.home-description-scroll');

const flechaStatica = document.getElementById('fixedDescription');
const flechaMid = document.getElementById('scrollMidInformation');
const flechaEnd = document.getElementById('scrollEndComentarios');
    
flechaStatica.addEventListener('click', () => {
    fila2.scrollLeft = 0;
});

flechaMid.addEventListener('click', () => {
    fila2.scrollLeft = 833.3333129882812;
});

flechaEnd.addEventListener('click', () => {
    fila2.scrollLeft = 1666,666625976562;
});
