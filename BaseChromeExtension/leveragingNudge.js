var startButton = document.getElementById("start-button");
var snoozeButton = document.getElementById("snooze-button");
var notificationContent = document.getElementById("notificationContent");
var timeIsUp = document.getElementById("timeIsUp");
var updateButton = document.getElementById("update-settings");
var goal = document.getElementById("goal");

var goalPomodoros = parseInt(localStorage.getItem("goalPomodoros"));
var breaksTaken = parseInt(localStorage.getItem("breaksTaken"))

if (parseInt(localStorage.getItem("goalPomodoros")) > 0) {
    var breaksLeft = goalPomodoros - breaksTaken;
    var goalText = "";
    goalText = "You have taken " + breaksTaken + " breaks today.  Keep it up!"
    if (breaksLeft > 0) {
        goalText += " You have " + breaksLeft + " breaks left to take to reach your goal for the day."
    }
    else {
        goalText += " You have hit your goal for breaks today.  Feel free to take more breaks as they come though or set a higher goal!"
    }
    document.getElementById("goalText").innerHTML = goalText;
}
switch (localStorage.getItem("currentPart")) {
    case "0":
        // focus
        timeIsUp.innerHTML = "Your time is up! Time to resume your focus session.";
        startButton.innerHTML = "Start focus session";
        snoozeButton.style.display = "none";
        break;

    case "1":
        // short
        startButton.innerHTML = "Start short break";
        break;

    case "2":
        // long
        startButton.innerHTML = "Start long break";
        break;

    default:
        console.log("error");
        break;
}

updateButton.addEventListener('click', function () {
    if (isNaN(parseInt(goal.value)) || goal.value <= 0) {
        window.alert("Please enter a number greater than 0");
        return;
    }
    localStorage.setItem("goalPomodoros", goal.value);
    window.alert("Your goal has been set for today.");
    location.reload();
})

startButton.addEventListener('click', function () {
    if (isNaN(parseInt(goal.value)) || goal.value <= 0) {
        window.alert("Please enter a goal before you continue! Make sure to click \"Update my settings\".");
        return;
    }
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