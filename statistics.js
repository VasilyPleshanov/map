// Места, в rating: index + 1 - рейтинг, элемент - % людей оценивших
const placesArr = [
    {
        id: 1,
        rating: [10, 20, 30, 40, 50]
    },
    {
        id: 2,
        rating: [60, 100, 3, 34, 8]
    },
    {
        id: 3,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 4,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 5,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 6,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 7,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 8,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 9,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 10,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 11,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 12,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 13,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 14,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 15,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 16,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 17,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 18,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 19,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 20,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 21,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 22,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 23,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 24,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 25,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 26,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 27,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 28,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 29,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 30,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 31,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 32,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 33,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 34,
        rating: [1, 2, 3, 4, 5]
    },
    {
        id: 35,
        rating: [1, 2, 3, 4, 5]
    },
]

// --------------------------------------------------------------------------

const statisticsList = document.querySelector('.statistics__list')

placesArr.map((place) => {

    // console.log(place.id)

    let rating

    if (window.localStorage.getItem(`${place.id}`) == null) {
        rating = 'нет оценки'
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