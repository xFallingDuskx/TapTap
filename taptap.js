let user;
let countdown;
let limit;

function getUserInput() {
    let inputs = prompt("Enter your name and desired time limit (greater than 0) separated by a common (i.e. User,15). Invalid or no input will result in the default of Nameless,30 being used :)", "User,15");

    if (inputs === null) {
        user = "Nameless";
        countdown = 30;
    } else {
        inputs = inputs.split(",");
        user = inputs[0] ?? "Nameless";
        countdown = inputs[1] ?? 30;
    }
    
    const correct = confirm("Welcome " + user + "! You have decided to tap like crazy for " + countdown + " seconds! If this is incorrect, press the cancel button to re-enter the information. If this is correct, get ready to tap tap away :) The timer will start after the first click on the 'Tap' button. ")

    if (!correct) {
        getUserInput();
    }
}

let countdownEl = document.getElementById("countdown-el");

let interval;
function countdownInterval() {
    if (countdown == 0) {
        clearInterval(interval);
        return;
    }
    countdown--;
    countdownEl.innerText = countdown;
}

function startCountdown() {
    interval = setInterval(countdownInterval, 1000);
}

let countEl = document.getElementById("count-el");
let count = 0;

function increment() {
    if (count == 0) {
        startCountdown();
    }

    count += 1;
    countEl.innerText = count;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

let scoreboardEl = document.getElementById("scoreboard-el");
let avg;
function record() {
    avg = roundToTwo(count / limit);
    scoreboardEl.innerHTML += ("<tr><td>" + user + "</td><td>" + count + "</td><td>" + avg + "</td></tr>");
}
