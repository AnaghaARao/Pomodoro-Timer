let focusButton = document.getElementById('focus');
let buttons = document.querySelectorAll('.btn');
let shortBreakButton = document.getElementById('shortbreak')
let longBreakButton = document.getElementById('longbreak');
let startButton = document.getElementById('btn-start');
let pauseButton = document.getElementById('btn-pause');
let resetButton = document.getElementById('btn-reset');
let time = document.getElementById('time');
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount+1}:00`;

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

resetButton.addEventListener('click',
    (resetTime =() => {
        pauseTimer();
        switch(active){
            case "long":
                minCount = 14;
                break;
            case "short":
                minCount = 4;
                break;
            default:
                minCount = 24;
                break;
        }
        count = 59;
        time.textContent = `${minCount+1}:00`;
    })
);

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove('btn-focus');
    });
};

focusButton.addEventListener('click',()=>{
    removeFocus();
    focusButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount+1}:00`;
});

shortBreakButton.addEventListener('click',()=>{
    active = "short";
    removeFocus();
    shortBreakButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

longBreakButton.addEventListener('click',()=>{
    active = "long";
    removeFocus();
    longBreakButton.classList.add('btn-focus');
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${appendZero(minCount+1)}:00`;
});

pauseButton.addEventListener('click',
    (pauseTimer = ()=>{
        paused = true;
        clearInterval(set);
        startButton.classList.remove('hide');
        pauseButton.classList.remove("show");
        resetButton.classList.remove("show");
    })
);

startButton.addEventListener('click',()=>{
    resetButton.classList.add('show');
    pauseButton.classList.add('show');
    startButton.classList.add('hide');
    startButton.classList.remove('show');
    if(paused){
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() =>{
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if(count==0){
                if(minCount != 0){
                    minCount--;
                    count = 60;
                }
                else{
                    clearInterval(set);
                }
            }
        },1000);
    }
});

/* 
    for toggle timer shd be set to 25 min
    for short break timer shd be set to 5 min
    for long break timer shd be set to 15min
*/

