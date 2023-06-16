const d = document;

const BTN_START_GAME = d.getElementById('btn-start-game');
const BTN_PLAY_AGAIN = d.getElementById('btn-play-again');
const CONTENT_TIMER = d.getElementsByClassName('content-timer')
const SPAN_TIMER = d.getElementById('timer')
const SPAN_PTS_PINK = d.getElementById('puntuation-pink')
const SPAN_PTS_BLUE = d.getElementById('puntuation-blue');
const HOMES = d.querySelectorAll('.item-home')

let posPajaro = null, resultAzul = 0, resultRosa = 0, intervalGame = null;

//listeners
d.addEventListener('click', e => {
    if(e.target.matches(`#${BTN_START_GAME.id}`)){
        startGame(60);
    }
    if(e.target.matches(`#${BTN_PLAY_AGAIN.id}`)){
        resetGame();
    }
})

//listeners para cada casita
HOMES.forEach((HOME,idx) => {
    HOME.addEventListener("click", () => {
      if (HOME.id === posPajaro) {
        if(idx % 2 == 0) {
            resultAzul += 1;
            SPAN_PTS_BLUE.textContent = resultAzul;
        }else{
            resultRosa += 1;
            SPAN_PTS_PINK.textContent = resultRosa;
        }
        cleanPajaros();
        posPajaro = null;
      }
    });
});

//funciones
function startGame(tiempo){
    setTimer(tiempo)
    const timers = [1000, 800, 1100];
    const timersAzar = timers[Math.floor(Math.random() * timers.length)];  
    intervalGame = setInterval(homeAzar, timersAzar);
}

function homeAzar() {
    cleanPajaros();

    let posAzar = Math.floor(Math.random() * HOMES.length);
    let homeAzar = HOMES[posAzar];
    if(posAzar % 2 == 0) homeAzar.classList.add("pajaro-azul");
    else homeAzar.classList.add("pajaro-rosa");
  
    posPajaro = homeAzar.id;
}

function setTimer(tiempo){
    CONTENT_TIMER[0].style.display = 'block'
    BTN_PLAY_AGAIN.style.display = 'none'
    BTN_START_GAME.style.display = 'none'
    SPAN_TIMER.textContent  = tiempo;
    let timerInterval = setInterval(() => {
        
        tiempo--;

        if(tiempo <= 10) SPAN_TIMER.classList.add("last-seconds");
 
        SPAN_TIMER.textContent  = tiempo;

        if(tiempo === 0){
            clearInterval(timerInterval)
            clearInterval(intervalGame)
            cleanPajaros();
            setTimeout(()=>{
                window.alert('Tiempo terminado')
                CONTENT_TIMER[0].style.display = 'none'
                BTN_PLAY_AGAIN.style.display = 'block'
                SPAN_TIMER.classList.remove("last-seconds");
            },800)
        }
        
    }, 1000);
}

function resetGame (){
    posPajaro = null
    resultAzul = 0 
    resultRosa = 0 
    intervalGame = null
    SPAN_PTS_PINK.textContent = '0';
    SPAN_PTS_BLUE.textContent = '0';
    BTN_PLAY_AGAIN.style.display = 'none'
    BTN_START_GAME.style.display = 'block'
}

function cleanPajaros() {
    HOMES.forEach((home,idx) => {
        home.classList.remove("pajaro-azul");
        home.classList.remove("pajaro-rosa");
        
    });
}
