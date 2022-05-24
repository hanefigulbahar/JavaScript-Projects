const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const password = document.getElementById('password')
const rePassword = document.getElementById('repassword')
const btn = document.querySelector('#btn')



function error(input, message) {
    input.className = 'form-control is-invalid'
    const div = input.nextElementSibling
    div.innerText = message
    div.className = 'invalid-feedback'
}

function success(input) {
    input.className = 'form-control is-valid'
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(input.value)) {
        success(input)
    } else {
        error(input, 'hatalı')
    }
}

function checkRequired(inputs) {
    inputs.forEach(input => {
        if (input.value === '') {
            error(input, `${input.id} is required`)
        } else {
            success(input)
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        error(input, `${input.id} en az ${min} karakter olmalıdır.`)
    } else if (input.value.length > max) {
        error(input, `${input.id} en fazla ${max} karakter olmalıdır `)
    } else {
        success(input)
    }

}

function checkPassword(input1, input2) {
    if (input1.value !== input2.value)
        error(input2, 'Parolalar eşleşmiyor')
}

function checkPhone(input, max) {
    var exp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    if (!exp.test(input.value)) {
        error(input, `${input.id} ${max} karakter olmalıdır`)
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault()

    checkRequired([username, email, password, rePassword, phone])
    checkEmail(email)
    checkLength(username, 7, 15)
    checkLength(password, 7, 12)
    checkPassword(password, rePassword)
    checkPhone(phone, 10)


})