ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("map", {
            center: [55.75335717863191,37.71549824673464],
            zoom: 17
        }),

        // Создаем метку с помощью вспомогательного класса.
        myPlaceMark = new ymaps.Placemark([55.75335717863191,37.71549824673464], {
            // Свойства.
            // Содержимое хинта.
            // hintContent: 'Надпись, которая всплаывет при наведении на метку'
        }, {
            // Опции
            // Своё изображение иконки метки.
            iconImageHref: '../images/carbon_location-filled.svg',
            // Размеры метки.
            iconImageSize: [42, 42],
        })


    // Добавляем все метки на карту.
    myMap.geoObjects
        .add(myPlaceMark)
}