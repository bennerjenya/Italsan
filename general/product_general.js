window.addEventListener('DOMContentLoaded', () => {
    let all_images = document.querySelectorAll('.product .swiper-main .swiper-slide'),
        mobile_swiper = document.querySelector('.mobile-swiper'),
        mobile_swiper_btn = mobile_swiper.querySelector('.close');

    all_images.forEach(image => {
        image.addEventListener('click', () => {
            if(image.getAttribute('data-slide-type') === 'img') {
                mobile_swiper.classList.add('active');
                document.body.classList.add('not-scroll');
                mobile_main_swiper.slideTo(+image.getAttribute('data-index'));
                mobile_swiper_thumb.slideTo(+image.getAttribute('data-index'));
            }
        });
    });
    const collectionSwiper = document.querySelector('.from-collection .list');
    const swiper = new Swiper(collectionSwiper, {
        slidesPerView: 2,
        spaceBetween: 9,
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom'
        },
        breakpoints: {
            744: {
                spaceBetween: 24
            },
            1152: {
                slidesPerView: 3,
                spaceBetween: 24,
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
                const activeSlide1 = collectionSwiper.querySelector('.swiper-slide-active');
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

    document.querySelector('.from-collection .swiper-button-prev-custom').addEventListener('click', () => {
        const activeSlide = collectionSwiper.querySelector('.swiper-slide-next');

        document.querySelectorAll('.from-collection .swiper-slide').forEach(el => {
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
    });

    document.querySelector('.from-collection .swiper-button-next-custom').addEventListener('click', () => {
        const activeSlide1 = collectionSwiper.querySelector('.swiper-slide-active');
        const activeSlide2 = activeSlide1.nextElementSibling;
        const activeSlide3 = activeSlide2.nextElementSibling;
        const activeSlide4 = activeSlide3.nextElementSibling;
    
        document.querySelectorAll('.from-collection .swiper-slide').forEach(el => {
          el.classList.remove('slider-visible');
        });
        
        if(window.innerWidth >= 1364) {
            activeSlide4.classList.add('slider-visible');
        }

        activeSlide1.classList.add('slider-visible');
        activeSlide2.classList.add('slider-visible');
        activeSlide3.classList.add('slider-visible');
    });

    var swiper_thumb = new Swiper('.product .swiper-thumb', {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 24,
        watchSlidesProgress: true,
        breakpoints: {
            744: {
                direction: 'vertical',
                slidesPerView: 4
            }
        }
    });
    
    var main_swiper = new Swiper('.product .swiper-main', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
            nextEl: '.swiper-thumb-button-next-custom',
            prevEl: '.swiper-thumb-button-prev-custom'
        },
        thumbs: {
            swiper: swiper_thumb
        },
    });
    
    var mobile_swiper_thumb = new Swiper('.mobile-swiper .swiper-thumb', {
        direction: 'horizontal',
        slidesPerView: 4,
        spaceBetween: 24,
        watchSlidesProgress: true
    });
    
    var mobile_main_swiper = new Swiper('.mobile-swiper .swiper-main', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
            nextEl: '.swiper-thumb-button-next-custom',
            prevEl: '.swiper-thumb-button-prev-custom'
        },
        thumbs: {
            swiper: mobile_swiper_thumb
        }
    });
    
    
    let btn_next = document.querySelector('.swiper-thumb-button-next-custom'),
        btn_prev = document.querySelector('.swiper-thumb-button-prev-custom');
    
    btn_next.addEventListener('click', () => {
        let visible_slides = document.querySelectorAll('.swiper-thumb .swiper-slide-visible');
    
        if(visible_slides[visible_slides.length - 1].classList.contains('swiper-slide-thumb-active')) {
            swiper_thumb.slideNext();
        }
    });
    
    btn_prev.addEventListener('click', () => {
        let visible_slides = document.querySelectorAll('.swiper-thumb .swiper-slide-visible');
    
        if(visible_slides[0].classList.contains('swiper-slide-thumb-active')) {
            swiper_thumb.slidePrev();
        }
    });
    
    
    var VIDEO_PLAYING_STATE = {
        "PLAYING": "PLAYING",
        "PAUSE": "PAUSE"
      }
      var videoPlayStatus = VIDEO_PLAYING_STATE.PAUSE
      var options = {};
      var player = videojs('my-player', options);
      var playerMobile = videojs('my-player-mobile', options);
    
    main_swiper.on('slideChangeTransitionEnd', function () {
        var index = main_swiper.activeIndex
        var currentSlide = main_swiper.slides[index]
        var currentSlideType = currentSlide.getAttribute('data-slide-type') === 'vdo'
        
        // incase user click next before video ended
        if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
          player.pause()
        }
        
        if(currentSlideType) {
            player.currentTime(0)
            videoPlayStatus = VIDEO_PLAYING_STATE.PLAYING
        }
      })
    
      mobile_main_swiper.on('slideChangeTransitionEnd', function () {
        var index = mobile_main_swiper.activeIndex
        var currentSlide = mobile_main_swiper.slides[index]
        var currentSlideType = currentSlide.getAttribute('data-slide-type') === 'vdo'
        
        // incase user click next before video ended
        if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
            playerMobile.pause()
        }
        
        if(currentSlideType) {
            playerMobile.currentTime(0)
            videoPlayStatus = VIDEO_PLAYING_STATE.PLAYING
        }
      })
    
    mobile_swiper_btn.addEventListener('click', () => {
        mobile_swiper.classList.remove('active');
        document.body.classList.remove('not-scroll');
        if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
            playerMobile.pause()
        }
    });

    document.body.addEventListener('keydown', function (e) {
        if(e.key === 'Escape') {
            mobile_swiper.classList.remove('active');
            document.body.classList.remove('not-scroll');
            if (videoPlayStatus === VIDEO_PLAYING_STATE.PLAYING) {
                playerMobile.pause()
            }
        }
    });

    const tabs = document.querySelector('.tabs');
	const tabsBtn = tabs.querySelectorAll('.tab');
	const tabsContent = document.querySelectorAll('.tabs__content');

    if (tabs) {
		tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__btn')) {
				const tabsPath = e.target.dataset.tabsPath;
                let tab = document.querySelector(`[data-tabs-path="${tabsPath}"]`);
                if(tab) {
                    tabsBtn.forEach(el => {el.classList.remove('active')});
                    tab.parentElement.classList.add('active');
				    tabsHandler(tabsPath);
                }
			}
		});
	}

	const tabsHandler = (path) => {
		tabsContent.forEach(el => {el.classList.remove('tabs__content--active')});
		document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
	};
});

