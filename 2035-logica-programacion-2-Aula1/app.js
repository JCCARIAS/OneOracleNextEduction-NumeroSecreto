let numeroSecreto;
let intentos;
let listNumerosSorteados = [];
let numerosIngresados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (isNaN(numeroDeUsuario) || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo) {
        asignarTextoElemento('p', `Por favor, ingresa un número entre 1 y ${numeroMaximo}`);
        limpiarCaja();
        return;
    }

    if (numerosIngresados.includes(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Ya ingresaste ese número, intenta con otro.');
        limpiarCaja();
        return;
    }

    numerosIngresados.push(numeroDeUsuario);
    intentos++;

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    if (listNumerosSorteados.length >= numeroMaximo) {
        asignarTextoElemento('p', '¡Se han sorteado todos los números posibles!');
        return null;
    }

    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listNumerosSorteados.includes(numeroGenerado));

    listNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    intentos = 0;
    numerosIngresados = [];
    numeroSecreto = generarNumeroSecreto();
}

function reiniciarJuego() {
    limpiarCaja();
    listNumerosSorteados = [];
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

condicionesIniciales();
