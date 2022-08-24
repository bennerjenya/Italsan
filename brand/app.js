window.addEventListener('DOMContentLoaded', () => {

    ['load', 'resize'].forEach(i => {
        window.addEventListener(i, () => {
            if (window.matchMedia("(min-width: 1152px)").matches) {
                viewed_swiper_init();
            } else {
                viewed_swiper_destroy();
            }
        });
    });

    let viewed_swiper = null;
    const viewed = document.querySelector('.viewed__swiper');

    let viewed_swiper_init = () => {
        if (!viewed_swiper) {
            viewed_swiper = new Swiper('.viewed__swiper', {
                navigation: {
                    nextEl: '.viewed__swiper__button-next',
                    prevEl: '.viewed__swiper__button-prev'
                },
                breakpoints: {
                    1152: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                        allowTouchMove: false
                    },
                    1364: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                        allowTouchMove: false
                    }
                },
                on: {
                    init: function () {
                        const activeSlide1 = viewed.querySelector('.swiper-slide-active');
                        const activeSlide2 = activeSlide1.nextElementSibling;
                        const activeSlide3 = activeSlide2.nextElementSibling;
                        const activeSlide4 = activeSlide3.nextElementSibling;
        
                        if(window.innerWidth >= 1364) {
                            activeSlide4.classList.add('slider-visible');
                        }
        
                        activeSlide1.classList.add('slider-visible');
                        activeSlide2.classList.add('slider-visible');
                        activeSlide3.classList.add('slider-visible');
                    }
                }
            });
        }
    };

    

    document.querySelector('.viewed__swiper__button-prev').addEventListener('click', () => {
        viewed_swiper.on('slideChangeTransitionStart', () => {
            const activeSlide = viewed.querySelector('.swiper-slide-next');

            document.querySelectorAll('.viewed__swiper .slider-visible').forEach(el => {
                el.classList.remove('slider-visible');
            });

            if (activeSlide.previousElementSibling) {
                const nextActiveSlide = activeSlide.previousElementSibling;
                const nextNextActiveSlide = activeSlide.nextElementSibling.nextElementSibling;

                if(window.innerWidth >= 1364) {
                    nextNextActiveSlide.classList.add('slider-visible');
                }

                activeSlide.classList.add('slider-visible');
                nextActiveSlide.classList.add('slider-visible');
                activeSlide.nextElementSibling.classList.add('slider-visible');
            }
        })
    });

    document.querySelector('.viewed__swiper__button-next').addEventListener('click', () => {
        viewed_swiper.on('slideChangeTransitionStart', () => {
            const activeSlide1 = viewed.querySelector('.swiper-slide-active');
            const activeSlide2 = activeSlide1.nextElementSibling;
            const activeSlide3 = activeSlide2.nextElementSibling;
            const activeSlide4 = activeSlide3.nextElementSibling;

            document.querySelectorAll('.viewed__swiper .slider-visible').forEach(el => {
                el.classList.remove('slider-visible');
            });
            
            if(window.innerWidth >= 1364) {
                activeSlide4.classList.add('slider-visible');
            }

            activeSlide1.classList.add('slider-visible');
            activeSlide2.classList.add('slider-visible');
            activeSlide3.classList.add('slider-visible');
        })
    });

    let viewed_swiper_destroy = () => {
        if (viewed_swiper) {
            viewed_swiper.destroy();
            viewed_swiper = null;
        }
    };
});