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
let incrementBtn = document.getElementById("increment-btn");
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
    "TheBlimpTapper",
    "SleepyTapper",
    "TryHardTapper"
]);

function getRandomInt() {
    const length = availableUsernames.size;
    return Math.floor(Math.random() * length);
}

function triggerSecondDialog() {
    countdownSecondDialogEl.innerText = countdown;
    usernameSecondDialogEl.innerText = user;
    welcomeDialogEl.style.display = "none";
    secondDialogEl.style.display = "block";

    // close dialog with tap anywhere on screen
    document
        .body
        .addEventListener('click', function () {
            overlay.style.display = "none";
        }, true);
}

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
    countdownEl.innerText = countdown;
    limit = countdown;
    triggerSecondDialog();
}

function countdownInterval() {
    if (countdown == 0) {
        clearInterval(interval);
        incrementBtn.onclick = null;
        record();
        return;
    }
    countdown--;
    countdownEl.innerText = countdown;
}

function startCountdown() {
    interval = setInterval(countdownInterval, 1000);
}

function increment() {
    if (count == 0) {
        startCountdown();
    }

    count += 1;
    countEl.innerText = count;
}

function roundToTwo(num) {
    return + (Math.round(num + "e+2") + "e-2");
}

function record() {
    avg = roundToTwo(count / limit);
    scoreboardEl.innerHTML += (
        "<tr><td>" + user + "</td><td>" + count + "</td><td>" + avg + "</td></tr>"
    );
}

function playAgain() {
    
}
