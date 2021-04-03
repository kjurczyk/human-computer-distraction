var startButton = document.getElementById("start-button");
var snoozeButton = document.getElementById("snooze-button");
var notificationContent = document.getElementById("notificationContent");
var confronts = [];
confronts.push("Brain systems that get activated while you rest are important for mental health.");
confronts.push("Brain systems activated during rest are important for cognitive abilities like reading comprehension and divergent thinking.");
confronts.push("Giving your brain a break every now and then reduces stress.");
confronts.push("Getting up and moving around will help both your physical and emotional health.");
confronts.push("Breaks can prevent “decision fatigue,” which can lead to simplistic decision-making and procrastination.");
confronts.push("You will be more productive and creative after you take a break from what you’ve been working on.");
confronts.push("You know how you sometimes think better after you’ve slept? The same idea applies for “waking rest.” There is evidence to suggest that resting while awake (aka taking a break) will help improve your memory formation.");
confronts.push("Give your back and neck a break by standing up and walking around for a couple minutes.");
confronts.push("Did you know that taking breaks that are completely unrelated to your work can increase your energy levels?");
confronts.push("Spending too much time in front of your screen can lead to poor posture and its resulting problems (headaches, shoulder pain, back pain).");
confronts.push("The main issue with spending so much time in front of your screen isn’t necessarily the screen itself - it’s the fact that you’re sitting still for such prolonged periods of time. (If you have a standing desk, great job!)");
confronts.push("Staring at your screen for too long has been attributed to myopia (nearsightedness). Take some time to look at something farther away.");
var tip = "Fun Fact: ";
var r = Math.floor(Math.random() * Math.floor(confronts.length));

if (r == 7) {
    tip = "Try This: ";
}
if (r >= 9) {
    tip = "Not So Fun Fact: ";
}
localStorage.setItem("confrontQuote", confronts[r]);

var confrontsList = JSON.parse(localStorage.getItem("completeListOfConfrontsGiven"));
confrontsList.push(confronts[r]);
localStorage.setItem("completeListOfConfrontsGiven", confrontsList);
switch (localStorage.getItem("currentPart")) {
    case "0":
        // focus
        startButton.innerHTML = "Start focus session";
        snoozeButton.style.display = "none";
        break;

    case "1":
        // short
        startButton.innerHTML = "Start short break";
        notificationContent.innerHTML = tip + confronts[r];
        localStorage.setItem("typeOfBreak", "shortBreak");
        break;

    case "2":
        // long
        startButton.innerHTML = "Start long break";
        notificationContent.innerHTML = tip + confronts[r];
        localStorage.setItem("typeOfBreak", "longBreak");
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