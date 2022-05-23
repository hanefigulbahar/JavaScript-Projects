var foods = [{
        name: "Yiyecek1",
        image: "img/img-1.jpg",
        info: "Enfes 1"
    },
    {
        name: "Yiyecek2",
        image: "img/img-2.jpg",
        info: "Enfes 2"
    },
    {
        name: "Yiyecek3",
        image: "img/img-3.jpg",
        info: "Enfes 3"
    },
    {
        name: "Yiyecek4",
        image: "img/img-4.jpg",
        info: "Enfes 4"
    },
    {
        name: "Yiyecek5",
        image: "img/img-5.jpg",
        info: "Enfes 5"
    }
];



var index = 0;
var slaytCount = foods.length
var interval;

var settings = {
    duration: '1000',
    random: false
}

init(settings)

document.querySelector(".tikLeft").addEventListener('click', function() {
    index--;
    showSlayts(index)
    console.log(index)

})
document.querySelector(".tikRight").addEventListener('click', function() {
    index++;
    showSlayts(index)
})
document.querySelectorAll('.clk').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
        clearInterval(interval)
    })
})
document.querySelectorAll('.clk').forEach(function(item) {
    item.addEventListener('mouseleave', function() {
        init(settings)

    })
})

function init(settings) {
    var prev;
    interval = setInterval((e) => {
        if (settings.random) {
            do {
                index = Math.floor(Math.random() * slaytCount)
            } while (index == prev);
            prev = index
        } else {
            if (slaytCount == index + 1) {
                index = -1
            }
            index++;
        }

        showSlayts(index)

    }, settings.duration);
}

function showSlayts(i) {
    if (i < 0) {
        index = slaytCount - 1
    }
    if (i >= slaytCount) {
        index = 0
    }

    document.querySelector('.card-img-top').setAttribute('src', foods[index].image)
    document.querySelector('.card-title').textContent = foods[index].name
    document.querySelector('.card-text').textContent = foods[index].info
}