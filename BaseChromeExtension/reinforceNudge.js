var startButton = document.getElementById("start-button");
var snoozeButton = document.getElementById("snooze-button");
var notificationContent = document.getElementById("notificationContent");
var tomatoGif = document.getElementById("tomatoGif");
var timeIsUp = document.getElementById("timeIsUp");

var gifs = [];
gifs.push("reinforce/gif/tomato-01.gif");
gifs.push("reinforce/gif/tomato-02.gif");
gifs.push("reinforce/gif/tomato-03.gif");
gifs.push("reinforce/gif/tomato-04.gif");
gifs.push("reinforce/gif/tomato-05.gif");
var pngs = [];
pngs.push("reinforce/img/deadtomato-01.png");
pngs.push("reinforce/img/deadtomato-02.png");
pngs.push("reinforce/img/deadtomato-03.png");

var lastLevel = localStorage.getItem("lastLevel");
var lastAction = localStorage.getItem("lastAction");
localStorage.setItem("reinforceLevelWhenSkipped", lastLevel);
var which = lastLevel;
    if (lastLevel.includes(gifs[0])) {
        if (lastAction == "break") {
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
            which = gifs[1];
        }
        else if (lastAction == "snooze") {
            which = pngs[0];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dead... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(gifs[1])) {
        if (lastAction == "break") {
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
            which = gifs[2];
        }
        else if (lastAction == "snooze") {
            which = gifs[0];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }    
    else if (lastLevel.includes(gifs[2])) {
        if (lastAction == "break") {
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
            which = gifs[3];
        }
        else if (lastAction == "snooze") {
            which = pngs[1];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(gifs[3])) {
        if (lastAction == "break") {
            which = gifs[4];
            timeIsUp.innerHTML = "Your Pomodoro Partner is fully grown!  Taking more breaks won't make them grow any larger, but snoozing will still hurt them!";
        }
        else if (lastAction == "snooze") {
            which = pngs[2];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(gifs[4])) {
        if (lastAction == "break") {
            which = gifs[4];
            timeIsUp.innerHTML = "Your Pomodoro Partner is fully grown!  Taking more breaks won't make them grow any larger, but snoozing will still hurt them!";
        }
        else if (lastAction == "snooze") {
            which = pngs[2];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(pngs[0])) {
        if (lastAction == "break") {
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
            which = gifs[0];
        }
        else if (lastAction == "snooze") {
            which = pngs[0];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dead... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(pngs[1])) {
        if (lastAction == "break") {
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
            which = gifs[1];
        }
        else if (lastAction == "snooze") {
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
            which = pngs[0];
        }
        else {
            console.log("error");
        }
    }
    else if (lastLevel.includes(pngs[2])) {
        if (lastAction == "break") {
            which = gifs[2];
            timeIsUp.innerHTML = "\"Thanks for taking that break! I'm feeling great after that. I hope you are too!\"";
        }
        else if (lastAction == "snooze") {
            which = pngs[1];
            timeIsUp.innerHTML = "Your Pomodoro Partner is dying... You can still save them by taking regular breaks!";
        }
        else {
            console.log("error");
        }
    }
tomatoGif.src = which;
localStorage.setItem("lastLevel", which);
var reinforceSequence = JSON.parse(localStorage.getItem("reinforceSequence"));
reinforceSequence.push(which);
localStorage.setItem("reinforceSequence", JSON.stringify(reinforceSequence));
switch (localStorage.getItem("currentPart")) {
    case "0":
        // focus
        startButton.innerHTML = "Start focus session";
        snoozeButton.style.display = "none";
        break;

    case "1":
        // short
        startButton.innerHTML = "Start short break";
        localStorage.setItem("typeOfBreak", "shortBreak");
        // timeIsUp.innerHTML = tip + confronts[r];
        break;

    case "2":
        // long
        startButton.innerHTML = "Start long break";
        localStorage.setItem("typeOfBreak", "longBreak");
        // notificationContent.innerHTML = tip + confronts[r];
        break;

    default:
        console.log("error");
        break;
}

startButton.addEventListener('click', function () {
    localStorage.setItem("autoStartTimer", "start");
    window.close();
    chrome.tabs.create({url: "options.html"});
    parent.focus();
    window.focus();
})

snoozeButton.addEventListener('click', function () {
    localStorage.setItem("autoStartTimer", "snooze");
    window.close();
    chrome.tabs.create({url: "options.html"});
    parent.focus();
    window.focus();
})