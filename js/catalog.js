const menu = document.querySelector('.top-header__icon'),
    sideMenu = document.querySelector('.main__menu-header-icon'),
    sideMenuBody = document.querySelector('.main__menu-body'),
    sideBars = document.querySelectorAll('.body-menu-link-arrow'),
    sideBarItems = document.querySelectorAll('.list-body'),
    menuBody = document.querySelector('.menu__body'),
    sliders = document.querySelectorAll('.swiper-container');

    let isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};

const toggleBurger = (button, side) => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        side.classList.toggle('active');
    });
};

menu.addEventListener('click', toggleBurger(menu, menuBody));

sideMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');
    $('.main__menu-body').slideToggle();
});

function ibg() {
    let ibg = document.querySelectorAll(".ibg");
    for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector("img")) {
            ibg[i].style.backgroundImage =
                "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
        }
    }
}

ibg();

let mySwiper = new Swiper('.slider-main', {
    loop: true,
    slidesPerView: 1,
    autoHeight: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

let swiper = new Swiper('.products-slider__item', {
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
        nextEl: '.header-slider__arrow--next',
        prevEl: '.header-slider__arrow--prev',
    },
    pagination: {
        el: '.header-slider__info',
        type: 'fraction',
    },
});

let swiperBrands = new Swiper('.brands-slider__container', {
    slidesPerView: 5,
    autoHeight: false,
    loop: true,
    navigation: {
        nextEl: '.brands-slider__arrow--next',
        prevEl: '.brands-slider__arrow--prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        660: {
            slidesPerView: 3,
        },
        768: {
            slidesPerView: 4,
        },
        992: {
            slidesPerView: 5,
        }
    },
});

const inputLeft = document.querySelector('.input-left'),
      inputRight = document.querySelector('.input-right'),
      thumbLeft = document.querySelector('.slider > .thumb-left'),
      thumbRight = document.querySelector('.slider > .thumb-right'),
      range = document.querySelector('.slider > .range'),
      thumbNumLeft = document.querySelector('.thumb-left span'),
      thumbNumRight = document.querySelector('.thumb-right span'),
      valuesFilterPriceInput = document.querySelectorAll('.values-filter-price__input input'),
      inputs = document.querySelectorAll('.input-range');

const setLeftValue = () => {
    let inputThumb = inputLeft;
    let min = parseInt(inputThumb.min),
        max = parseInt(inputThumb.max);

    inputThumb.value = Math.min(parseInt(inputThumb.value), parseInt(inputRight.value) - 1);

    let percent = ((inputThumb.value - min) / (max - min)) * 100;

    thumbLeft.style.left = percent + '%';
    range.style.left = percent + '%';

    for (let i = 0; i < valuesFilterPriceInput.length; i++) {
        valuesFilterPriceInput[0].addEventListener('input', () => {
            
            let percent = ((valuesFilterPriceInput[0].value - min) / (max - valuesFilterPriceInput[0].value)) * 100;

            thumbLeft.style.left = percent + '%';
            range.style.left = percent + '%';
            thumbNumLeft.innerHTML = valuesFilterPriceInput[0].value;
            if (valuesFilterPriceInput[0].value === '') {
                thumbNumLeft.innerHTML = 0;
            }
        });
    }
};

setLeftValue();

const setRightValue = () => {
    let inputThumb = inputRight;
    let min = parseInt(inputThumb.min),
        max = parseInt(inputThumb.max);

    inputThumb.value = Math.max(parseInt(inputThumb.value), parseInt(inputLeft.value) + 1);

    let percent = ((inputThumb.value - min) / (max - min)) * 100;

    thumbRight.style.right = (100 - percent) + '%';
    range.style.right = (100 - percent) + '%';

    for (let i = 0; i < valuesFilterPriceInput.length; i++) {
        valuesFilterPriceInput[1].addEventListener('input', () => {
            
            let percent = ((inputThumb.value - -valuesFilterPriceInput[1].value) / (max - valuesFilterPriceInput[1].value)) * 100;

            thumbRight.style.right = (100 - percent) + '%';
            range.style.right = (100 - percent) + '%';
            thumbNumRight.innerHTML = valuesFilterPriceInput[1].value;
            // if (valuesFilterPriceInput[0].value === '') {
            //     thumbNumLeft.innerHTML = 0;
            // }
        });
    }
};

setRightValue();

inputLeft.addEventListener('input', setLeftValue);
inputRight.addEventListener('input', setRightValue);

inputs.forEach( item => {
    item.addEventListener('input', () => {
        thumbNumLeft.innerHTML = inputLeft.value;
        thumbNumRight.innerHTML = inputRight.value;
    });
});

document.querySelectorAll('.filter-section__spoil').forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.closest('.header-filter')) {
            item.classList.toggle('active');   
        }
    });

});