window.addEventListener('DOMContentLoaded', () => {
    classes(document.querySelector('.buttons__bottom button.favorite'));
    classes(document.querySelector('.buttons__bottom button.task-list'));

    const btns_change = document.querySelectorAll('.change');
    const kits = document.querySelectorAll('.equipment .item');
    let isVisible = false;

    kits.forEach(el => {
        const btn_in = el.querySelector('button.in-set');
        const btn_primary = el.querySelector('button.primary');
        const input = el.querySelector('input');
        const element = el.querySelector('.select');
        const choices = new Choices(element, {
            placeholder: false,
            searchEnabled: false,
            itemSelectText: '',
        });


        if(!el.classList.contains('disabled')) {
            input.addEventListener('change', () => change_kit_state(el, 'CHECKBOX'));
            btn_in.addEventListener('click', () => change_kit_state(el, 'BUTTON'));
            btn_primary.addEventListener('click', () => change_kit_state(el, 'BUTTON'));
        }
    });

    btns_change.forEach(button => {
        button.addEventListener('click', () => changeState());
    });

    const check_on_load = () => {
        kits.forEach(el => {
            if(el.classList.contains('selected')) {
                el.querySelector('input').checked = true;
                el.querySelector('button.primary').classList.add('hide');
                el.querySelector('button.in-set').classList.remove('hide');
            } else if(el.classList.contains('disabled')) {
                el.querySelector('input').checked = false;
            } else {
                el.querySelector('input').checked = false;
                el.querySelector('button.primary').classList.remove('hide');
                el.querySelector('button.in-set').classList.add('hide');
            }
        });
    };

    const change_kit_state = (item, btn) => {
        if(item.classList.contains('disabled')) {
            return;
        } else if(item.classList.contains('selected') && btn === 'CHECKBOX') {
            item.classList.remove('selected');
            item.querySelector('input').checked = false;
            item.querySelector('button.primary').classList.remove('hide');
            item.querySelector('button.in-set').classList.add('hide');

        } else if(item.classList.contains('selected') && btn === 'BUTTON') {
            item.classList.remove('selected');
            item.querySelector('input').checked = false;
            item.querySelector('button.primary').classList.remove('hide');
            item.querySelector('button.in-set').classList.add('hide');

        } else if(btn === 'CHECKBOX' && !item.classList.contains('selected')) {
            item.classList.add('selected');
            item.querySelector('input').checked = true;
            item.querySelector('button.primary').classList.add('hide');
            item.querySelector('button.in-set').classList.remove('hide');

        } else if(btn === 'BUTTON' && !item.classList.contains('selected')) {
            item.classList.add('selected');
            item.querySelector('input').checked = true;
            item.querySelector('button.primary').classList.add('hide');
            item.querySelector('button.in-set').classList.remove('hide');
        }
    };

    const changeState = () => {
        if(isVisible) {
            btns_change.forEach(button => button.textContent = 'Изменить комплект');
            kits.forEach(el => el.classList.remove('active'));
            isVisible = false;
        } else {
            btns_change.forEach(button => button.textContent = 'Стандартный комплект');
            kits.forEach(el => el.classList.add('active'));
            isVisible = true;
        }
    };

    check_on_load();
});