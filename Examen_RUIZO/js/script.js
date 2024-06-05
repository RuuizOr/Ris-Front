document.getElementById('iniciar').addEventListener('click', function() {
    const posiblesResultados = ['piedra', 'papel', 'tijeras'];
    const jugador = posiblesResultados[Math.floor(Math.random() * posiblesResultados.length)];
    const compu = posiblesResultados[Math.floor(Math.random() * posiblesResultados.length)];

    document.getElementById('jugador').src = `img/${jugador}.svg`;
    document.getElementById('compu').src = `img/${compu}.svg`;

    const resultado = getResult(jugador, compu);
    document.getElementById('resultado').innerText = resultado;
});

function getResult(jugador, compu) {
    if (jugador === compu) {
        return 'Empate';
    } else if ((jugador === 'piedra' && compu === 'tijeras') ||
            (jugador === 'papel' && compu === 'piedra') ||
            (jugador === 'tijeras' && compu === 'papel')) {
        return 'Ganaste';
    } else {
        return 'Perdiste';
    }
}