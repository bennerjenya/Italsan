let block = document.querySelector('.products'),
    block_params = block.getBoundingClientRect(),
    cards = block.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    window.scrollY >= block_params.top ? block.classList.add('sticky') : block.classList.remove('sticky');
});

let params = document.querySelectorAll('.info .items');
let products_swiper = null;
let info = document.querySelector('.infos .info');
let products_list = block.querySelector('.products-list');
// document.addEventListener('mousedown', () => document.querySelector('.info').style.transform = getComputedStyle(block.querySelector('.products-list')).transform);

let btn_next = document.querySelector('.btn-next'),
    btn_prev = document.querySelector('.btn-prev');

let counter = 0;

function increase() {
    counter++;
    info.style.transform += `translateX(-${cards[0].getBoundingClientRect().width + 32}px)`;
}
function decrease() {
    counter--;
    info.style.transform += `translateX(${cards[0].getBoundingClientRect().width + 32}px)`;
}

function handle_click_prev() {
    if(window.innerWidth < 744 && counter !== 0) {
        decrease();
    } else if((window.innerWidth > 743 && window.innerWidth < 1152) && counter !== 0) {
        decrease();
    } else if((window.innerWidth > 1151 && window.innerWidth < 1364) && counter !== 0) {
        decrease();
    } else if((window.innerWidth > 1363 && window.innerWidth < Infinity) && counter !== 0) {
        decrease();
    }
}

function handle_click_next() {
    if(window.innerWidth < 744 && counter !== cards.length - 2) {
        increase();
    } else if((window.innerWidth > 743 && window.innerWidth < 1152) && counter !== cards.length - 3) {
        increase();
    } else if((window.innerWidth > 1151 && window.innerWidth < 1364) && counter !== cards.length - 4) {
        increase();
    } else if((window.innerWidth > 1363 && window.innerWidth < Infinity) && counter !== cards.length - 5) {
        increase();
    }
}

btn_next.addEventListener('click', () => handle_click_next());
btn_prev.addEventListener('click', () => handle_click_prev());

function reload() {
    if(window.innerWidth < 744 && cards.length > 2) {
        // init swiper
        block.classList.add('active');
        info.classList.add('active');
        products_swiper = new Swiper('.products-swiper', {
            slidesPerView: 2,
            spaceBetween: 32,
            allowTouchMove: false,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev'
            }
        });
    } else if((window.innerWidth > 743 && window.innerWidth < 1152) && cards.length > 3) {
        // init swiper
        block.classList.add('active');
        info.classList.add('active');
        products_swiper = new Swiper('.products-swiper', {
            slidesPerView: 3,
            spaceBetween: 32,
            allowTouchMove: false,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev'
            }
        });
    } else if((window.innerWidth > 1151 && window.innerWidth < 1364) && cards.length > 4) {
        // init swiper
        block.classList.add('active');
        info.classList.add('active');
        products_swiper = new Swiper('.products-swiper', {
            slidesPerView: 4,
            spaceBetween: 32,
            allowTouchMove: false,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev'
            }
        });
    } else if((window.innerWidth > 1363 && window.innerWidth < Infinity) && cards.length > 5) {
        // init swiper
        block.classList.add('active');
        info.classList.add('active');
        products_swiper = new Swiper('.products-swiper', {
            slidesPerView: 5,
            spaceBetween: 32,
            allowTouchMove: false,
            navigation: {
                nextEl: '.btn-next',
                prevEl: '.btn-prev'
            }
        });
    } else {
        // destroy swiper
        if(products_swiper) {
            products_swiper.destroy(true, true);
            products_swiper = null;
            block.classList.remove('active');
            info.classList.remove('active');
        }
    }
}

['load', 'resize'].forEach(i => {
    window.addEventListener(i, () => {
        reload();
    });
});

['load', 'scroll', 'resize'].forEach(i => {
    window.addEventListener(i, () => {
        params.forEach(param => {
            param.querySelectorAll('.item').forEach(item => item.style.width = `${cards[0].getBoundingClientRect().width}px`)
        });
    });
});

reload();