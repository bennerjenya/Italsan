window.addEventListener('DOMContentLoaded', () => {
    let buttons = document.querySelectorAll('.brands .list .button'),
    blocks =  document.querySelectorAll('.top-brands .brand'),
    buttonAll = document.querySelector('.show-all');

    const closeAllBlocks = () => blocks.forEach(block => block.classList.remove('active'));

    buttons.forEach(button => {
        if(!button.classList.contains('disabled')) {
            button.addEventListener('click', () => {
                document.querySelector('.brands .list .button.active').classList.remove('active');
                closeAllBlocks();
                buttonAll.classList.remove('hide');
                button.classList.add('active');
                let attr = button.getAttribute('data-show');
                if(attr === 'all') {
                    showAllBlocks();
                } else {
                    let needed = document.querySelector(`.top-brands .brand[data-show="${attr}"]`);
                    needed.classList.add('active');
                }
            });
        }
    });

    const showAllBlocks = () => {
        blocks.forEach(block => block.classList.add('active'));
        buttons.forEach(button => button.classList.remove('active'));
        buttons[buttons.length - 1].classList.add('active');
        buttonAll.classList.add('hide');
    };
    buttonAll.addEventListener('click', () => showAllBlocks());

    let from_collection_swiper = null;
    const from_coll = document.querySelector('.from-collection_swiper');
    let from_collection_swiper_init = () => {
        if (!from_collection_swiper) {
            from_collection_swiper = new Swiper(from_coll, {
                spaceBetween: 24,
                slidesPerView: 2,
                navigation: {
                    nextEl: '.from-collection__button-next',
                    prevEl: '.from-collection__button-prev'
                },
                breakpoints: {
                    1152: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                        allowTouchMove: false
                    },
                    1364: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                        allowTouchMove: false
                    }
                },
                on: {
                    init: function () {
                        const activeSlide1 = from_coll.querySelector('.swiper-slide-active');
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

    document.querySelector('.from-collection__button-prev').addEventListener('click', () => {
        from_collection_swiper.on('slideChangeTransitionStart', () => {
            const activeSlide = from_coll.querySelector('.swiper-slide-next');

            document.querySelectorAll('.from-collection_swiper .slider-visible').forEach(el => {
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

    document.querySelector('.from-collection__button-next').addEventListener('click', () => {
        from_collection_swiper.on('slideChangeTransitionStart', () => {
            const activeSlide1 = from_coll.querySelector('.swiper-slide-active');
            const activeSlide2 = activeSlide1.nextElementSibling;
            const activeSlide3 = activeSlide2.nextElementSibling;
            const activeSlide4 = activeSlide3.nextElementSibling;

            document.querySelectorAll('.from-collection_swiper .slider-visible').forEach(el => {
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


    let from_collection_swiper_destroy = () => {
        if (from_collection_swiper) {
            from_collection_swiper.destroy();
            from_collection_swiper = null;
        }
    };

    ['load', 'resize'].forEach(i => {
        window.addEventListener(i, () => {
            if (window.matchMedia("(min-width: 744px)").matches) {
                from_collection_swiper_init();
            } else {
                from_collection_swiper_destroy();
            }
        });
    });
});