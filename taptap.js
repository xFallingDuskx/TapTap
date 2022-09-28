
let countEl = document.getElementById("count-el");
let count = 0;

function increment() {
    count += 1;
    countEl.innerText = count;
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

let scoreboardEl = document.getElementById("scoreboard-el");
let user = "Username";

let avg;
function record() {
    avg = roundToTwo(count / 30);
    scoreboardEl.innerHTML += ("<tr><td>" + user + "</td><td>" + count + "</td><td>" + avg + "</td></tr>");
}