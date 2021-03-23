var startButton = document.getElementById("start-button");
var snoozeButton = document.getElementById("snooze-button");
var notificationContent = document.getElementById("notificationContent");
var timeIsUp = document.getElementById("timeIsUp");

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

startButton.addEventListener('click', function () {
    window.close();
    chrome.tabs.create({url: "options.html"});
    parent.focus();
    window.focus();
    localStorage.setItem("autoStartTimer", "start");

})

snoozeButton.addEventListener('click', function () {
    window.close();
    chrome.tabs.create({url: "options.html"});
    parent.focus();
    window.focus();
    localStorage.setItem("autoStartTimer", "snooze");
})