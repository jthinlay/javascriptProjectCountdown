const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownElTitle = document.getElementById('countdown-title');
const countdownEl = document.getElementById('countdown');
const countdownBtn = document.getElementById('reset-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive; 
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM(){
      countdownActive = setInterval(()=>{
        const now = new Date().getTime();
        const distance = countdownValue - now;
    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

         //  Hide Input
         inputContainer.hidden = true;

        //  If the countdown has finished, show complete
        if(distance < 0){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Else, show the countdown in progress
            // Populate Countdown
             countdownElTitle.textContent = `${countdownTitle}`;
             timeElements[0].textContent = `${days}`;
             timeElements[1].textContent = `${hours}`;
             timeElements[2].textContent = `${minutes}`;
             timeElements[3].textContent = `${seconds}`;
             completeEl.hidden = true;
             countdownEl.hidden = false;
        }     
      }, second);
    };
   
// Take Values from Form Input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    if(savedCountdown.title === ""){
        localStorage.removeItem('countdown');
    } else {
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    }
    // Check for valid date
     if(countdownDate === ''){
         alert("Please select a countdown date!")
     } else {
          // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        let countdownDay = (countdownValue / 24) / 60;
        updateDOM();
     } 
}

// Reset All Values
function reset(){
    // Hide Countdown, show Input
        countdownEl.hidden = true;
    // Hide complete 
        completeEl.hidden = true;
    // // Show Input 
        inputContainer.hidden = false;
    // Stop the countdown
        clearInterval(countdownActive);
    // Rset values
        countdownTitle = '';
        countdownDate = '';
        localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // Get countdown from localstorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load, check localstorage
restorePreviousCountdown();







