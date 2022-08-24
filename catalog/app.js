let forms = document.querySelectorAll('aside form');
let active_filters = document.querySelectorAll('.main__active-filters .item'),
    btn_clear_filters = document.querySelector('.main__active-filters .clear');
let filter_button = document.querySelector('.filter-mobile-btn'),
    filter_popup = document.querySelector('.filter-popup'),
    filter_confirm_button = filter_popup.querySelector('.confirm');
let list_btns = document.querySelectorAll('aside li');
forms.forEach(form => {
    let btn = form.querySelector('svg.toggle');
    btn.addEventListener('click', () => {
        form.classList.toggle('hide');
        btn.classList.toggle('hide');
    });
});

function list_btn_remove() {
    list_btns.forEach(list_btn => list_btn.classList.remove('active'));
}
function remove_all_filters() {
    active_filters.forEach(item => item.remove());
}
list_btns.forEach(list_btn => {
    list_btn.addEventListener('click', () => {
        list_btn_remove();
        list_btn.classList.add('active');
    });
});

btn_clear_filters.addEventListener('click', () => remove_all_filters());

active_filters.forEach(filter => {
    filter.querySelector('svg').addEventListener('click', () => {
        filter.remove();
    });
});

filter_button.addEventListener('click', () => filter_popup.classList.toggle('active'));
filter_confirm_button.addEventListener('click', () => filter_popup.classList.remove('active'));

document.addEventListener('click', (e) => {
    const target = e.target;

    const popup = target == filter_popup || filter_popup.contains(target);
    const btnPopup = target == filter_button || filter_button.querySelector('span').contains(target) || filter_button.querySelector('svg').contains(target);
    const popup_is_active = filter_popup.classList.contains('active');

    if (!popup && !btnPopup && popup_is_active) {
        filter_popup.classList.remove('active');
    }
})