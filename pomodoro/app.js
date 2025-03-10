const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start'); 
const stopBtn = document.querySelector('.btn-stop');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes')
let myInterval
let state = true; 
let paused = false;
let totalSeconds = 0;

const appTimer = () => {
    if (state){
        state = false;
        if (!paused){
         totalSeconds = Number.parseInt(session.textContent) * 60;
        }
        paused = false;
        const updateSeconds = () => {
            const mindiv = document.querySelector('.minutes');
            const secdiv = document.querySelector('.seconds');
            
            totalSeconds--;
            const minutesLeft = Math.floor(totalSeconds / 60);
            const secondsLeft = totalSeconds % 60;

            if (totalSeconds < 10){
                secdiv.textContent = '0' + secondsLeft;
            }else{
                secdiv.textContent = secondsLeft;
            }
            mindiv.textContent = minutesLeft;
            if (minutesLeft === 0 && secondsLeft === 0){
                bells.play();
                clearInterval(myInterval);
            }
        }
        myInterval = setInterval(updateSeconds, 1000);
       
        
    }else{
    alert("Timer is already running");
}}

function stop(){
    if(!state){
        clearInterval(myInterval);
        state = true;
        paused = true;
    }    
}

startBtn.addEventListener('click',appTimer);  
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', ()=>
{
    clearInterval(myInterval);
    state = true;
    paused = false;
    totalSeconds = 0;
    document.querySelector('.minutes').textContent = 25;
    document.querySelector('.seconds').textContent = '00';
}
);
    

    
    


