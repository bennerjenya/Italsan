const topSwiper = new Swiper('.top-swiper', {
    // loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
        el: '.swiper-pagination'
    },
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom'
    },
    breakpoints: {
        744: {
            spaceBetween: 28,
        },
        1152: {
            spaceBetween: 42
        }
    }
});

const brandsSwiper = new Swiper('.brands-swiper', {
    spaceBetween: 32,
    slidesPerView: 2.5,
    // freeMode: true,
    navigation: {
        nextEl: '.popular-brands__arrow-next',
        prevEl: '.popular-brands__arrow-prev'
    },
    breakpoints: {
        744: {
            slidesPerView: 4,
            spaceBetween: 0
        },
        1152: {
            // centeredSlides: true,
            slidesPerView: 5,
            spaceBetween: 43
        }
    }
});

function place_top_swiper_buttons() {
    let top_swiper_next_btn = document.querySelector('.swiper-button-next-custom'),
        top_swiper_prev_btn = document.querySelector('.swiper-button-prev-custom'),
        top_swiper = document.querySelector('.top-swiper .swiper-wrapper');


    // Prev button
    top_swiper_prev_btn.style.left = `${top_swiper.getBoundingClientRect().left - 19}px`;
    top_swiper_prev_btn.style.top = `${top_swiper.getBoundingClientRect().top + top_swiper.getBoundingClientRect().height / 2 - 19}px`;

    // Next button
    top_swiper_next_btn.style.left = `${top_swiper.getBoundingClientRect().left + top_swiper.getBoundingClientRect().width - 19}px`;
    top_swiper_next_btn.style.top = `${top_swiper.getBoundingClientRect().top + top_swiper.getBoundingClientRect().height / 2 - 19}px`;
};

window.addEventListener('resize', () => place_top_swiper_buttons());

function init() {
    window.scrollTo({ top: 0 });
    place_top_swiper_buttons();
}

let best_collections_swiper = null, novelties_swiper = null;
let best_collections_swiper_init = () => {
    if (!best_collections_swiper) {
        best_collections_swiper = new Swiper('.best-collections__list', {
            slidesPerView: 2,
            spaceBetween: 32,
            navigation: {
                nextEl: '.best-collections__button-next',
                prevEl: '.best-collections__button-prev'
            },
            breakpoints: {
                1152: {
                    slidesPerView: 3,
                    spaceBetween: 64
                },
                1364: {
                    slidesPerView: 4
                }
            }
        });
    }
};

let novelties_swiper_init = () => {
    if (!novelties_swiper) {
        novelties_swiper = new Swiper('.novelties_swiper', {
            slidesPerView: 2,
            spaceBetween: 9,
            navigation: {
                nextEl: '.novelties__button-next',
                prevEl: '.novelties__button-prev'
            },
            breakpoints: {
                744: {
                    spaceBetween: 24
                },
                1152: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                    allowTouchMove: false
                },
                1364: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    allowTouchMove: false
                }
            }
        });
    }
};

let best_collections_swiper_destroy = () => {
    if (best_collections_swiper) {
        best_collections_swiper.destroy();
        best_collections_swiper = null;
    }
};

let novelties_swiper_destroy = () => {
    if (novelties_swiper) {
        novelties_swiper.destroy();
        novelties_swiper = null;
    }
};

['load', 'resize'].forEach(i => {
    window.addEventListener(i, () => {
        if (window.matchMedia("(min-width: 744px)").matches) {
            best_collections_swiper_init();
            novelties_swiper_init();
        } else {
            best_collections_swiper_destroy();
            novelties_swiper_destroy();
        }
    });
});
// var controller = new ScrollMagic.Controller({container: '#instagram'});
//         var scene = new ScrollMagic.Scene({triggerElement: "#trigger1"})
//         addTo(controller)
//         .setTween(TweenMax.to("#container1 .animated", 0.5, {backgroundColor: "green"}))
//         .addIndicators() // add indicators (requires plugin)
//         .setPin("#container1 .animated");
init();