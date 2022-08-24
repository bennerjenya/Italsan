let mobile_menu_btn = document.querySelector('.header__menu'),
    mobile_menu_link = document.querySelector('.header .catalog'),
    group = document.querySelector('.header__group'),
    mobile_menu = document.querySelector('.header__mobile-menu'),
    profile_btn = document.querySelector('.header .item.profile'),
    profile_popup = document.querySelector('.header .profile-popup'),
    header__group = document.querySelector('.header__mobile-group'),
    cart_popup = document.querySelector('.cart-popup'),
    cart_btn = document.querySelector('.header__group .item.cart'),
    body = document.body;

profile_btn.addEventListener('click', () => {
    profile_popup.classList.toggle('active');
    if(window.innerWidth < 1152) {
        body.classList.toggle('not-scroll');
    }
});
cart_btn.addEventListener('click', () => {
    cart_popup.classList.toggle('active');
    if(window.innerWidth < 1152) {
        body.classList.toggle('not-scroll');
    }
});
let catalog_item = document.querySelectorAll('.header__item'),
    returns = document.querySelectorAll('.back'),
    selected_item = document.querySelectorAll('.header__mobile-selected');

returns.forEach(back => {
    selected_item.forEach(item => {
        back.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
            }
            remove_active_item();
        });
    });
});

function remove_active_item() {
    catalog_item.forEach(item => item.classList.remove('active'));
}
function remove_selected() {
    selected_item.forEach(item => item.classList.remove('active'));
}
catalog_item.forEach(item => {
    let data_show = item.getAttribute('data-show'),
        selected = document.querySelector(`.header__mobile-selected[data-show="${data_show}"]`);

    item.addEventListener('click', () => {
        if (window.innerWidth >= 744 && window.innerWidth < 1152) {
            remove_selected();
        }
        remove_active_item();
        item.classList.add('active');
        selected.classList.add('active');
    });

    item.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1152) {
            remove_active_item();
            remove_selected();
            item.classList.add('active');
            selected.classList.add('active');
            document.querySelectorAll('.header__selected-image.active').forEach(el => el.classList.remove('active'));
            setTimeout(() => {
                selected.querySelector('.header__selected-image').classList.add('active');
            }, 0);
        }
    });

});


let container = document.querySelector('.container');
[mobile_menu_btn, mobile_menu_link].forEach(btn => {
    btn.addEventListener('click', () => {
        header__group.classList.toggle('active');
        mobile_menu_btn.classList.toggle('active');
        mobile_menu.classList.toggle('active');
        container.classList.toggle('ovv');
        remove_active_item();
        remove_selected();
        if(window.innerWidth < 1152) {
            body.classList.toggle('not-scroll');
        }
        if (window.innerWidth < 744) {
            group.classList.toggle('active');
        }
        if (window.innerWidth >= 744 && window.innerWidth < 1152 && mobile_menu_btn.classList.contains('active')) {
            let first_left = document.querySelector('.header__item'),
                first_right = document.querySelector('.header__mobile-selected');

            if (first_right.classList.contains('active')) {
                first_left.classList.remove('active');
                first_right.classList.remove('active');
            } else {
                first_left.classList.add('active');
                first_right.classList.add('active');
            }
        }
    });
})

const products = document.querySelectorAll('.product-card');

if (products) {
    products.forEach(el => {
        let currentProduct = el;
        const imageSwitchItems = currentProduct.querySelectorAll('.product-card__switch-item');
        const imagePagination = currentProduct.querySelector('.product-card__indicators');
        let price = currentProduct.querySelector('.sum');
        if (price.textContent.length > 3) {
            price.textContent = parseFloat(price.textContent).toLocaleString('ru-RU');
        }
        if (imageSwitchItems.length > 1) {
            imageSwitchItems.forEach((el, index) => {
                el.setAttribute('data-index', index);
                imagePagination.innerHTML += `<li class="product-card__indicator ${index == 0 ? 'active' : ''}" data-index="${index}"></li>`;
                el.addEventListener('mouseenter', (e) => {
                    currentProduct.querySelectorAll('.product-card__indicator').forEach(el => { el.classList.remove('active') });
                    currentProduct.querySelector(`.product-card__indicator[data-index="${e.currentTarget.dataset.index}"]`).classList.add('active');
                });

                el.addEventListener('mouseleave', (e) => {
                    currentProduct.querySelectorAll('.product-card__indicator').forEach(el => { el.classList.remove('active') });
                    currentProduct.querySelector(`.product-card__indicator[data-index="0"]`).classList.add('active');
                });
            });
        }
        if (window.innerWidth < 744) {
            el.querySelector('.product-card__button--cart').addEventListener('click', () => {
                el.querySelector('.product-card__button--cart').classList.add('hide');
                el.querySelector('.product-card__button--num').classList.add('active');
            });
        }
        let text = el.querySelector('p.counter');
        let count = parseInt(text.textContent);
        el.querySelector('span.minus').addEventListener('click', () => {
            if (count > 0) {
                count--;
                text.textContent = JSON.stringify(count);
            }
        });
        el.querySelector('span.plus').addEventListener('click', () => {
            count++;
            text.textContent = JSON.stringify(count);
        });
        let favorite = el.querySelector('.favorites');
        let task = el.querySelector('.list-task');
        classes(task);
        classes(favorite);
    });
}

function classes(el) {
    el.addEventListener('click', () => {
        if (el.classList.contains('active')) {
            el.classList.remove('active');
            el.classList.add('default');
            el.classList.add('animation');
            setTimeout(() => {
                el.classList.remove('animation');
            }, 700);
        } else {
            el.classList.add('active');
            el.classList.remove('default');
            el.classList.add('animation');
            setTimeout(() => {
                el.classList.remove('animation');
            }, 700);
        }
    });
}

['scroll', 'click', 'resize'].forEach(i => {
    document.addEventListener(i, (e) => {
        const target = e.target;

        const its_menu = target == mobile_menu || mobile_menu.contains(target);
        const its_btnMenu = target == mobile_menu_btn || document.querySelector('.header span.line').contains(target) || document.querySelector('.header__mobile-group').contains(target) || document.querySelector('.header .catalog').contains(target);
        const menu_is_active = mobile_menu.classList.contains('active');

        const its_profile = target == profile_popup || profile_popup.contains(target);
        const its_profileBtn = target == profile_btn || document.querySelector('svg.profile').contains(target) || document.querySelector('svg.chevron').contains(target);
        const profile_is_active = profile_popup.classList.contains('active');

        const its_cart = target == cart_popup || cart_popup.contains(target);
        const its_cartBtn = target == cart_btn || cart_btn.querySelector('svg').contains(target);
        const cart_is_active = cart_popup.classList.contains('active');

        function closeAll() {
            remove_selected();
            header__group.classList.remove('active');
            container.classList.remove('ovv');            
            profile_popup.classList.remove('active');
            profile_btn.classList.remove('active');
            cart_popup.classList.remove('active');
            mobile_menu.classList.remove('active');
            mobile_menu_btn.classList.remove('active');
        }
        if (window.innerWidth >= 1152 && !its_menu && !its_btnMenu && menu_is_active) {
            closeAll();
        }
        if (!its_cart && !its_cartBtn && cart_is_active) {
            closeAll();
        }
        if (!its_profile && !its_profileBtn && profile_is_active) {
            closeAll();
        }
    });
});