let avg,
    countdown,
    interval,
    limit,
    user;
let count = 0;
let countdownEl = document.getElementById("countdown-el");
let countdownSecondDialogEl = document.getElementById(
    "countdown-second-dialog-el"
);
let countEl = document.getElementById("count-el");
let dialogEls = document.getElementsByClassName("dialog");
let incrementBtn = document.getElementById("increment-btn");
let playAgainBtn = document.getElementById("play-again-btn");
let playAgainDialogEl = document.getElementById("play-again-dialog-el");
let overlay = document.getElementById("overlay");
let secondDialogEl = document.getElementById("second-dialog-el");
let scoreboardEl = document.getElementById("scoreboard-el");
let usernameSecondDialogEl = document.getElementById(
    "username-second-dialog-el"
);
let welcomeDialogEl = document.getElementById("welcome-dialog-el");
const availableUsernames = new Set([
    "NoNameTapper",
    "TipTapper",
    "TappiestTapper",
    "GhostTapper",
    "FlashTapper",
    "GrumpyTapper",
    "EnergeticTapper",
    "MarathonTapper",
    "OutOfBreathTapper",
    "FocusedTapper",
    "UnderdogTapper",
    "AnonymousTapper",
    "MoonTapper",
    "SunTapper",
    "LazyTapper",
    "ZigZagTapper",
    "CasualTapper",
    "BlimpedTapper",
    "SleepyTapper",
    "TryHardTapper"
]);

// close dialog with tap anywhere on screen
function hidePopup() {
    document
        .body
        .addEventListener('click', function () {
            [...dialogEls].forEach(el => el.style.display = "none")
            overlay.style.display = "none";
        }, {once: true});
}

function getRandomInt() {
    const length = availableUsernames.size;
    return Math.floor(Math.random() * length);
}

// Dialog that appears after welcome dialog
function triggerSecondDialog() {
    countdownSecondDialogEl.textContent = countdown;
    usernameSecondDialogEl.textContent = user;
    welcomeDialogEl.style.display = "none";
    secondDialogEl.style.display = "block";
    hidePopup();
}

// User input from form in welcome dialog
function getUserInput() {
    const randomUsername = [...availableUsernames][getRandomInt()];
    const userInput = document
        .getElementById("username")
        .value;
    user = userInput === ""
        ? randomUsername
        : userInput;
    if (user === randomUsername) {
        availableUsernames.delete(randomUsername);
    }
    const countdownInput = document.querySelector(
        'input[name="countdown-time"]:checked'
    );
    countdown = countdownInput === null
        ? 30
        : countdownInput.value;
    countdownEl.textContent = countdown;
    limit = countdown;
    triggerSecondDialog();
}

// Countdown function ran at each second interval
function countdownInterval() {
    if (countdown == 0) {
        clearInterval(interval);
        incrementBtn.onclick = null;
        record();
        playAgainBtn.style.display = "block";
        return;
    }
    countdown--;
    countdownEl.textContent = countdown;
}

function startCountdown() {
    interval = setInterval(countdownInterval, 1000);
}

function increment() {
    if (count == 0) {
        startCountdown();
    }
    count += 1;
    countEl.textContent = count;
}

// Round average to two decimal places
function roundToTwo(num) {
    return + (Math.round(num + "e+2") + "e-2");
}

// Add recent round to scoreboard
function record() {
    avg = roundToTwo(count / limit);
    scoreboardEl.innerHTML += (
        "<tr><td>" + user + "</td><td>" + count + "</td><td>" + avg + "</td></tr>"
    );
}

function playAgain() {
    count = 0;
    overlay.style.display = "flex";
    playAgainDialogEl.style.display = "block";
}

// Reset info for next round
function reset() {
    countdown = limit;
    countdownEl.textContent = limit;
    countEl.textContent = count;
    incrementBtn.onclick = increment;
}

function playAgainKeep() {
    reset();
    hidePopup();
}

function playAgainChange() {
    playAgainDialogEl.style.display = "none";
    welcomeDialogEl.style.display = "block";
    reset();
}
