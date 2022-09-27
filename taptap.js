
let countEl = document.getElementById("count-el");
let count = 0;

function increment() {
    count += 1;
    countEl.innerText = count;
}

let scoreboardEl = document.getElementById("scoreboard-el");
let roundNum = 0;

function record() {
    roundNum += 1;
    scoreboardEl.innerHTML += ('<li> Round #'+roundNum + ' had a score of ' + count +'</li>');
}