const container = document.querySelector('.container')
const count = document.getElementById('count')
const amount = document.getElementById('amount')
const select = document.getElementById('movie')
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage()
total()

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('rezerved')) {
        e.target.classList.toggle('selected')
        total()
    }
})

select.addEventListener('change', function(e) {
    total()
})

function total() {
    const selectedSeats = container.querySelectorAll('.seat.selected')
    const selectedSeatsArr = []
    const seatsArr = []

    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function(seat) {
        seatsArr.push(seat)
    })

    let selectedSeatsIndexs = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat)
    })

    let selectSeatCount = selectedSeats.length

    count.innerText = selectSeatCount
    amount.innerText = selectSeatCount * select.value

    saveToLocalStorage(selectedSeatsIndexs)
}

function saveToLocalStorage(indexs) {

    localStorage.setItem('selectedSeats', JSON.stringify(indexs))
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex
    }
}