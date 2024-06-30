const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es"
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH', "ANGEL", "MOUSE", "PLATE"]
let random = Math.random() * diccionario.length
random = Math.floor(random)
let palabraSecreta = diccionario[random]
fetch(API)
    .then((response) => {
        response.json()
            .then((data) => {
                palabraSecreta = data[0].toUpperCase()
            })
    }).catch((e) => {
        console.log("ERROR")
    })

let oportunidades = 30 //Al parecer las oportunidades se dividen, por lo tanto debo de colocar 30 para tener 6 intentos

let button = document.getElementById("guess-button")
let input = document.getElementById("guess-input")

button.addEventListener("click", intentar)

function intentar() {
    let intento = input.value.toUpperCase()
    if (intento == palabraSecreta) {
        acabar("¡Ganaste!😀")
    }
    let row = document.createElement("div")
    row.className = "row"
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabraSecreta) {
        let letra = document.createElement("span")
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        letra.className = "Letter"
        if (palabraSecreta[i] == intento[i]) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = '#79b851';
        }
        else if (palabraSecreta.includes(intento[i])) {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = '#f3c237';
        }
        else {
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = '#a4aec4';
        }
        ROW.appendChild(SPAN)


        GRID.appendChild(ROW)
        oportunidades--
        if (oportunidades == 0) {
            acabar("¡Perdiste!😖")
        }
    }
    function acabar(mensaje) {
        button.disabled = true
        input.disabled = true
        let contenedor = document.getElementById("guesses")
        contenedor.innerHTML = "<h1>" + mensaje + "</h1>"
    }
}
