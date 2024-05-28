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

// --------------------------------------------------------------------------

const statisticsList = document.querySelector('.statistics__list')

placesArr.map((place) => {

    // console.log(place.id)

    let rating

    if (window.localStorage.getItem(`${place.id}`) == null) {
        rating = 'Вы еще не оценили'
    } else {
        rating = window.localStorage.getItem(`${place.id}`)
    }

    console.log(rating)

    let div = document.createElement('div')
    div.innerHTML = `
        <li class="statistics__item">
            <div class="statistics__number">
                <p>${place.id}</p>
            </div>
            <div class="statistics__foto">
                <img src="images/foto/${place.id}.jpg" alt="">
            </div>
            <div class="statistics__rating rating">
                <ul class="rating__list">
                    <li class="rating__item">
                        <p class="rating__text">Рейтинг 1:</p>
                        <p class="rating__grade">${place.rating[0]}%</p>
                    </li>
                    <li class="rating__item">
                        <p class="rating__text">Рейтинг 2:</p>
                        <p class="rating__grade">${place.rating[1]}%</p>
                    </li>
                    <li class="rating__item">
                        <p class="rating__text">Рейтинг 3:</p>
                        <p class="rating__grade">${place.rating[2]}%</p>
                    </li>
                    <li class="rating__item">
                        <p class="rating__text">Рейтинг 4:</p>
                        <p class="rating__grade">${place.rating[3]}%</p>
                    </li>
                    <li class="rating__item">
                        <p class="rating__text">Рейтинг 5:</p>
                        <p class="rating__grade">${place.rating[4]}%</p>
                    </li>
                </ul>
            </div>
            <div class="statistics__grade">
                <p>${rating}</p>
            </div>
        </li>
    `
    statisticsList.appendChild(div)

})

window.localStorage.getItem('name')