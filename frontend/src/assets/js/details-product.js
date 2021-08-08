const fila2 = document.querySelector('.home-description-scroll');
const scrollX= document.querySelector('.mat-drawer-content');
const flechaStatica = document.getElementById('fixedDescription');
const flechaMid = document.getElementById('scrollMidInformation');
const flechaEnd = document.getElementById('scrollEndComentarios');
    
flechaStatica.addEventListener('click', () => {
    fila2.scrollLeft = 0;
    if(scrollX.scrollTop > 930){
        scrollX.scrollTop = 930;
    }
    flechaStatica.classList.add('selected')
    flechaMid.classList.remove('selected')
    flechaEnd.classList.remove('selected')
});

flechaMid.addEventListener('click', () => {
    fila2.scrollLeft = 833.3333129882812;
    if(scrollX.scrollTop > 930){
        scrollX.scrollTop = 930;
    }
    flechaStatica.classList.remove('selected')
    flechaMid.classList.add('selected')
    flechaEnd.classList.remove('selected')
});

flechaEnd.addEventListener('click', () => {
    fila2.scrollLeft = 1666,666625976562;
    if(scrollX.scrollTop > 930){
        scrollX.scrollTop = 930;
    }
    flechaStatica.classList.remove('selected')
    flechaMid.classList.remove('selected')
    flechaEnd.classList.add('selected')
});
