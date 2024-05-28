// Места, в rating: index + 1 - рейтинг, элемент - % людей оценивших
const placesArr = [
    {
        id: 1,
        rating: [2, 12, 19, 15, 52]
    },
    {
        id: 2,
        rating: [6, 8, 25, 23, 38]
    },
    {
        id: 3,
        rating: [0, 4, 6, 25, 65]
    },
    {
        id: 4,
        rating: [4, 4, 9, 32, 51]
    },
    {
        id: 5,
        rating: [0, 2, 15, 30, 53]
    },
    {
        id: 6,
        rating: [11, 26, 21, 23, 19]
    },
    {
        id: 7,
        rating: [0, 9, 19, 33, 39]
    },
    {
        id: 8,
        rating: [6, 6, 22, 22, 44]
    },
    {
        id: 9,
        rating: [0, 2, 2, 31, 65]
    },
    {
        id: 10,
        rating: [0, 4, 6, 11, 79]
    },
    {
        id: 11,
        rating: [0, 2, 17, 21, 60]
    },
    {
        id: 12,
        rating: [0, 2, 2, 17, 79]
    },
    {
        id: 13,
        rating: [0, 0, 12, 23, 65]
    },
    {
        id: 14,
        rating: [2, 10, 23, 27, 38]
    },
    {
        id: 15,
        rating: [4, 9, 31, 27, 29]
    },
    {
        id: 16,
        rating: [11, 15, 25, 32, 17]
    },
    {
        id: 17,
        rating: [0, 6, 15, 31, 48]
    },
    {
        id: 18,
        rating: [4, 6, 25, 36, 29]
    },
    {
        id: 19,
        rating: [14, 14, 36, 19, 17]
    },
    {
        id: 20,
        rating: [2, 10, 21, 27, 40]
    },
    {
        id: 21,
        rating: [2, 6, 17, 10, 65]
    },
    {
        id: 22,
        rating: [2, 8, 13, 33, 44]
    },
    {
        id: 23,
        rating: [10, 8, 17, 25, 40]
    },
    {
        id: 24,
        rating: [17, 15, 36, 9, 23]
    },
    {
        id: 25,
        rating: [17, 14, 29, 23, 17]
    },
    {
        id: 26,
        rating: [0, 2, 15, 13, 70]
    },
    {
        id: 27,
        rating: [2, 17, 17, 19, 45]
    },
    {
        id: 28,
        rating: [9, 13, 30, 24, 24]
    },
    {
        id: 29,
        rating: [6, 6, 15, 30, 43]
    },
    {
        id: 30,
        rating: [2, 4, 20, 24, 50]
    },
    {
        id: 31,
        rating: [7, 11, 11, 15, 56]
    },
    {
        id: 32,
        rating: [0, 2, 2, 28, 68]
    },
    {
        id: 33,
        rating: [2, 4, 24, 33, 37]
    },
    {
        id: 34,
        rating: [0, 4, 7, 15, 74]
    },
    {
        id: 35,
        rating: [0, 6, 28, 9, 57]
    },
]

// -------------------------------------------------------------------------------------------------

const modal = document.getElementById('modal')
const modalMessage = document.getElementById('modal-message')

// Создаем карту
ymaps.ready().then(function () {
    var LAYER_NAME = 'user#layer',
        MAP_TYPE_NAME = 'user#customMap',
        /* Для того чтобы вычислить координаты левого нижнего и правого верхнего углов прямоугольной координатной
         * области, нам необходимо знать максимальный зум, ширину и высоту изображения в пикселях на максимальном зуме.
         */
        MAX_ZOOM = 4,
        PIC_WIDTH = 4096,
        PIC_HEIGHT = 4096;
    /**
     * Конструктор, создающий собственный слой.
     */
    var Layer = function () {
        var layer = new ymaps.Layer('images/tiles/%z/%yx%x.png', {
            // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
            // раскомментируйте эту строчку и укажите ссылку на изображение.
            // notFoundTile: 'url'
        });
        // Указываем доступный диапазон масштабов для данного слоя.
        layer.getZoomRange = function () {
            return ymaps.vow.resolve([0, 4]);
        };
        // Добавляем свои копирайты.
        layer.getCopyrights = function () {
            return ymaps.vow.resolve('©');
        };
        return layer;
    };
    // Добавляем в хранилище слоев свой конструктор.
    ymaps.layer.storage.add(LAYER_NAME, Layer);
    /**
     * Создадим новый тип карты.
     * MAP_TYPE_NAME - имя нового типа.
     * LAYER_NAME - ключ в хранилище слоев или функция конструктор.
     */
    var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
    // Сохраняем тип в хранилище типов.
    ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);
    // Вычисляем размер всех тайлов на максимальном зуме.
    var worldSize = Math.pow(2, MAX_ZOOM) * 256,
        /**
         * Создаем карту, указав свой новый тип карты.
         */
        map = new ymaps.Map('map', {
            center: [0, 0],
            zoom: 0,
            // controls: ['zoomControl'],
            controls: [],
            type: MAP_TYPE_NAME
        }, {

            // Задаем в качестве проекции Декартову. При данном расчёте центр изображения будет лежать в координатах [0, 0].
            projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]),
            // Устанавливаем область просмотра карты так, чтобы пользователь не смог выйти за пределы изображения.
            restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]

            // При данном расчёте, в координатах [0, 0] будет находиться левый нижний угол изображения,
            // правый верхний будет находиться в координатах [PIC_HEIGHT, PIC_WIDTH].
            // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT - worldSize, 0], [PIC_HEIGHT, worldSize]], [false, false]),
            // restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
        });

    // Создадим пользовательский макет ползунка масштаба.

    ZoomLayout = ymaps.templateLayoutFactory.createClass("<div>" +
        "<div id='zoom-in' class='btn-map btn-map__plus'><img src='images/plus.png'></div>" +
        "<div id='zoom-out' class='btn-map btn-map__minus'><img src='images/minus.png'></div>" +
        "</div>", {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            $('#zoom-in').bind('click', this.zoomInCallback);
            $('#zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            $('#zoom-in').unbind('click', this.zoomInCallback);
            $('#zoom-out').unbind('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, { checkZoomRange: true });
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, { checkZoomRange: true });
        }
    }),
        zoomControl = new ymaps.control.ZoomControl({ options: { layout: ZoomLayout, position: { right: 10, bottom: 100 } } });

    map.controls.add(zoomControl);

    // Метки
    // Создаём макет содержимого.
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #000000; font-weight: bold; font-size: 8px">$[properties.iconContent]</div>'
    )
    // Создадим коллекцию геообъектов.
    var collection = new ymaps.GeoObjectCollection(null, {
        // Запретим появление балуна.
        hasBalloon: false,
        iconColor: '#3b5998'
    });
    // Добавим геообъекты в коллекцию.
    collection
        .add(new ymaps.Placemark([-150, -300], {
            // balloonContent: firstPlace,
            // url: 'grade.html',
            id: '1',
            iconContent: '1'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([160, -300], {
            id: '2',
            iconContent: '2'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([400, -360], {
            id: '3',
            iconContent: '3'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([280, -480], {
            id: '4',
            iconContent: '4'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([60, -380], {
            id: '5',
            iconContent: '5'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-150, -1120], {
            id: '6',
            iconContent: '6'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-200, -1700], {
            id: '7',
            iconContent: '7'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-200, -1600], {
            id: '8',
            iconContent: '8'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-40, -1600], {
            id: '9',
            iconContent: '9'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([100, -1700], {
            id: '10',
            iconContent: '10'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([50, -1950], {
            id: '11',
            iconContent: '11'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([100, -1850], {
            id: '12',
            iconContent: '12'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([100, -1900], {
            id: '13',
            iconContent: '13'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-20, -1830], {
            id: '14',
            iconContent: '14'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-130, -1750], {
            id: '15',
            iconContent: '15'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-30, 1060], {
            id: '16',
            iconContent: '16'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-70, 1200], {
            id: '17',
            iconContent: '17'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([0, 1150], {
            id: '18',
            iconContent: '18'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([0, 650], {
            id: '19',
            iconContent: '19'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-50, 650], {
            id: '20',
            iconContent: '20'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([40, 600], {
            id: '21',
            iconContent: '21'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([40, 700], {
            id: '22',
            iconContent: '22'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([180, 500], {
            id: '23',
            iconContent: '23'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([180, 300], {
            id: '24',
            iconContent: '24'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([150, 220], {
            id: '25',
            iconContent: '25'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-100, 700], {
            id: '26',
            iconContent: '26'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-50, 750], {
            id: '27',
            iconContent: '27'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-170, 760], {
            id: '28',
            iconContent: '28'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-200, 800], {
            id: '29',
            iconContent: '29'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-220, 760], {
            id: '30',
            iconContent: '30'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-50, 300], {
            id: '31',
            iconContent: '31'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([280, 380], {
            id: '32',
            iconContent: '32'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-160, 590], {
            id: '33',
            iconContent: '33'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-160, 630], {
            id: '34',
            iconContent: '34'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
        .add(new ymaps.Placemark([-150, 670], {
            id: '35',
            iconContent: '35'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            // iconImageHref: 'images/icons.png',
            iconImageHref: 'images/location-mark.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [19, 12],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        }))
    // Добавим коллекцию на карту.
    map.geoObjects.add(collection);
    // Подпишемся на событие клика по коллекции.
    collection.events.add('click', function (e) {
        // Получим ссылку на геообъект, по которому кликнул пользователь.
        var target = e.get('target');
        // console.log(target.properties._data.iconContent)
        // Переход на ссылку
        // document.location = e.get('target').properties.get('url');

        // Модальное окно
        modal.style.display = 'flex'
        modal.innerHTML = `
            <div class="modal__content">
                <div class="modal__row">
                    <div class="modal__collum"></div>
                    <div class="modal__number">${target.properties._data.id}</div>
                    <button class="modal__btn-close">X</button>
                </div>
                <div class="modal__grade grade">
                    <div class="grade__foto">
                        <img src="images/foto/${target.properties._data.id}.jpg" alt="">
                    </div>
                    <div class="grade__block-range">
                        <input type="range" class="grade__range" min="1" max="5">
                        <div class="grade__display-block">
                            <p class="grade__rating">Рейтинг</p>
                            <div class="grade__display">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div class="grade__block-btn">
                        <button class="grade__btn">Оценить</button>
                    </div>
                </div>
            </div>
        `

        const closeBtn = document.querySelector('.modal__btn-close')
        const inputRange = document.querySelector('.grade__range')
        const gradeBtn = document.querySelector('.grade__btn')
        const gradeDisplay = document.querySelector('.grade__display p')

        gradeDisplay.innerText = inputRange.value

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'
            modal.innerHTML = ''
        })

        gradeBtn.addEventListener('click', () => {
            // modal.style.display = 'none'

            // Запись оценки вида
            placesArr.map((place) => {
                console.log(place.id)
                console.log(target.properties._data.id)
                if (place.id == target.properties._data.id) {
                    console.log('Место', place)

                    console.log(place.rating)

                    place.rating.map((r, index) => {
                        console.log(r, index + 1)
                        if ((index + 1) == inputRange.value) {
                            console.log(r, '% людей оценили так же как и вы')

                            // Запись данных в локасторедж
                            window.localStorage.setItem(`${place.id}`, `${inputRange.value}`)


                            // Модальное окно с сообщением
                            modalMessage.style.display = 'flex'
                            modalMessage.innerHTML = `
                                <div class="modal-message__content">
                                    <p class="modal-message__text">${r}% людей оценили так же как и вы</p>
                                    <button class="modal-message__btn">Ок</button>
                                </div>
                            `

                            const modalMessageBtn = document.querySelector('.modal-message__btn')

                            modalMessageBtn.addEventListener('click', () => {
                                modalMessage.style.display = 'none'
                                modalMessage.innerHTML = ''
                                modal.style.display = 'none'
                                modal.innerHTML = ''
                            })
                        }
                    })
                }
            })





            // console.log('Оценка вида:', target.properties._data.id, 'рейтинг:', inputRange.value)
        })

        inputRange.addEventListener('change', () => {
            gradeDisplay.innerText = ''
            gradeDisplay.innerText = inputRange.value
        })


        // Зададим контент боковой панели.
        // panel.setContent(target.properties.get('balloonContent'));
        // Переместим центр карты по координатам метки с учётом заданных отступов.
        map.panTo(target.geometry.getCoordinates(), { useMapMargin: true });
    });

});

// ----------------------------------------------------------------------------

const header = document.querySelector('.header')
const menu = document.querySelector('.menu')
const burger = document.querySelector('.burger')
const links = document.querySelectorAll('a.menu__link')

// Добавляет классы для анимации бургера, открытия меню и 
// блокировки тела страницы от пролистывания
const addActivClass = function () {
    menu.classList.toggle('_active')
    burger.classList.toggle('_active')
    document.body.classList.toggle('_lock')
}

// Бургер меню
burger.addEventListener('click', () => {
    addActivClass()
})

// При изменении размера окна браузера меню закрывается, бурер возвращается в исходное положение
// и тело страницы разблокирывается
window.addEventListener('resize', () => {
    if (document.body.classList.contains('_lock')) {
        addActivClass()
    }
})

