chrome.runtime.onInstalled.addListener(function () {
  /*chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("Nudged Pomodoros.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });*/
  localStorage.clear();

  if (localStorage.getItem("focusTime") == null) {
    localStorage.setItem("focusTime", 25);
  }
  if (localStorage.getItem("shortBreak") == null) {
    localStorage.setItem("shortBreak", 5);
  }
  if (localStorage.getItem("longBreak") == null) {
    localStorage.setItem("longBreak", 30);
  }
  if (localStorage.getItem("todaysCycles") == null) {
      localStorage.setItem("todaysCycles", 0);
  }
  else {
    todaysCycles = localStorage.getItem("todaysCycles");
  }
  if (localStorage.getItem("isFinalCycle") == null) {
    localStorage.setItem("isFinalCycle", false);
  }
  if (localStorage.getItem("snooze") == null) {
    localStorage.setItem("snooze", 2);
  }
  if (localStorage.getItem("totalCycles") == null) {
    localStorage.setItem("totalCycles", 0);
  } else {
    totalCycles = localStorage.getItem("totalCycles");
  }
  if (localStorage.getItem("currentPart") == null) {
    localStorage.setItem("currentPart", FOCUS);
  }
  if (localStorage.getItem("isSnooze") == null) {
    localStorage.setItem("isSnooze", false);
  }
  if (localStorage.getItem("sectionsOfCycleCompleted") == null) {
    localStorage.setItem("sectionsOfCycleCompleted", 0);
  }
  if (localStorage.getItem("pomodoroDate") == null) {
    var d = new Date();
    localStorage.setItem("pomodoroDate", d.getDate());
  }
  if (localStorage.getItem("inProgress") == null) {
    localStorage.setItem("inProgress", false);
  }
  if (localStorage.getItem("startTime") == null) {
    localStorage.setItem("startTime", new Date());
  }
  if (localStorage.getItem("endTime") == null) {
    localStorage.setItem("endTime", new Date());
  }
  if (localStorage.getItem("timerPaused") == null) {
    localStorage.setItem("timerPaused", false);
  }
  if (localStorage.getItem("buttonState") == null) {
    localStorage.setItem("buttonState", "PressToPause");
  }
  if (localStorage.getItem("timePaused") == null) {
    localStorage.setItem("timePaused", 0);
  }
  if (localStorage.getItem("distance") == null) {
    localStorage.setItem("distance", 0);
  }
  if (localStorage.getItem("proceed") == null) {
    localStorage.setItem("proceed", "false");
  }
  if (localStorage.getItem("completedAny") == null) {
    localStorage.setItem("completedAny", "false");
  }
  if (localStorage.getItem("nudgeState") == null){
    // Set to random level
    var px = randomPage(getRandomInt(4));
    localStorage.setItem("nudgeState", px);
  }
  if (localStorage.getItem("nudgeLevel") == null){
    localStorage.setItem("nudgeLevel", 3);
  }
  if (localStorage.getItem("lastLevel") == null){
    localStorage.setItem("lastLevel", "reinforce/gif/tomato-01.gif");
  }
  if (localStorage.getItem("lastAction") == null){
    localStorage.setItem("lastAction", "null");
  }
  if (localStorage.getItem("goalPomodoros") == null){
    localStorage.setItem("goalPomodoros", "0");
  }
  if (localStorage.getItem("breaksTaken") == null){
    localStorage.setItem("breaksTaken", 0);
  }
  if (localStorage.getItem("nudgesCompleted") == null){
    var n = [];
    localStorage.setItem("nudgesCompleted", JSON.stringify(n));
  }
  if (localStorage.getItem("autoStartTimer") == null){
    localStorage.setItem("autoStartTimer", "null");
  }
  if (localStorage.getItem("breaksSkipped") == null){
    localStorage.setItem("breaksSkipped", 0);
  }
});

// Should we clear right away



var FOCUS = 0;
var SHORT = 1;
var LONG = 2;
var SNOOZE = 3;
var todaysCycles = 0;
var totalCycles = 0;


// Check and set date
// Loop every 10 minutes? Every hour?

function timerLoopFunction() {
  var timerPaused = localStorage.getItem("timerPaused");
  var inProgress = localStorage.getItem("inProgress");

  if (timerPaused == "false" && inProgress == "true") {
    updateTimer();
  }
}

var y = setInterval(function () {
  var date = new Date();
  if (localStorage.getItem("pomodoroDate") == null || localStorage.getItem("pomodoroDate") != date.getDate()){
    localStorage.setItem("pomodoroDate", date.getDate());
  }
  timerLoopFunction();
}, 1000);

var dateLoop = setInterval(function () {
  var d = new Date();
  if (localStorage.getItem("pomodoroDate") == null) {
    localStorage.setItem("pomodoroDate", d.getDate());
  }
  // If its a new day
  // Set the date to the new day
  // Set the cyclestoday to 0
  // Reset cycle
  if (localStorage.getItem("pomodoroDate") != d.getDate()) {
    localStorage.setItem("pomodoroDate", d.getDate());
    localStorage.setItem("todaysCycles", 0);
    localStorage.setItem("currentPart", FOCUS);
    localStorage.setItem("sectionsOfCycleCompleted", 0);
    localStorage.setItem("inProgress", false);
    localStorage.setItem("startTime", new Date());
    localStorage.setItem("endTime", new Date());
    localStorage.setItem("breaksTaken", 0);
    localStorage.setItem("goalPomodoros", "0");
    localStorage.setItem("lastAction", "null");
    localStorage.setItem("lastLevel", "reinforce/gif/tomato-01.gif");
    localStorage.setItem("nudgeLevel", 3);
    localStorage.setItem("completedAny", "false");
    localStorage.setItem("autoStartTimer", "null");
    localStorage.setItem("timerPaused", "false");

    localStorage.setItem("inProgress", "false");
    localStorage.setItem("isFinalCycle", false);
    localStorage.setItem("isSnooze", false);
    localStorage.setItem("timePaused", 0);
    localStorage.setItem("distance", 0);
    localStorage.setItem("proceed", "false");
    localStorage.setItem("timerPaused", false);

    var repeat = true;
    var nudgesCompleted = JSON.parse(localStorage.getItem("nudgesCompleted"));
    if (nudgesCompleted.length == 4) {
      localStorage.setItem("nudgeState", "default");
      repeat = false;
    }
    while (repeat) {
      switch (getRandomInt(4)) {
        /*
        case 0:
          // default
          if (!nudgesCompleted.includes('default')) {
            repeat = false;
            nudgesCompleted.push('default');
            localStorage.setItem("nudgesCompleted", JSON.stringify(nudgesCompleted));
            localStorage.setItem("nudgeState", "default");
          }
          break;
          */
        case 0:
          // confront
          if (!nudgesCompleted.includes('confront')) {
            repeat = false;
            nudgesCompleted.push('confront');
            localStorage.setItem("nudgesCompleted", JSON.stringify(nudgesCompleted));
            localStorage.setItem("nudgeState", "confront");
          }
          break;
        case 1:
          // facilitate
          if (!nudgesCompleted.includes('facilitate')) {
            repeat = false;
            nudgesCompleted.push('facilitate');
            localStorage.setItem("nudgesCompleted", JSON.stringify(nudgesCompleted));
            localStorage.setItem("nudgeState", "facilitate");
          }
          break;
        case 2:
          // leveraging
          if (!nudgesCompleted.includes('leveraging')) {
            repeat = false;
            nudgesCompleted.push('leveraging');
            localStorage.setItem("nudgesCompleted", JSON.stringify(nudgesCompleted));
            localStorage.setItem("nudgeState", "leveraging");
          }
          break;
        case 3:
          // reinforce
          if (!nudgesCompleted.includes('reinforce')) {
            repeat = false;
            nudgesCompleted.push('reinforce');
            localStorage.setItem("nudgesCompleted", JSON.stringify(nudgesCompleted));
            localStorage.setItem("nudgeState", "reinforce");
          }
          break;
      }
    }
  }
}, 30000);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var minutes;
var seconds;
// keep track of current info
var currentPart = FOCUS; // start with the assumption that the user will want to start with the focus
var sectionsOfCycleCompleted = 0; // start at 0 sections completed
var cyclesCompleted = 0; // start with 0 cycles completed. In the future, this can pull from the chrome plugin

function setters() {
  localStorage.setItem("inProgress", "false");
  localStorage.setItem("proceed", "true");
  test = false;
}
/*
var check = function(){
  if(condition){
      // run when condition is met
  }
  else {
      setTimeout(check, 1000); // check again in a second
  }
}
check();
*/

function updateTimer() {
  var now = new Date();
  var end = localStorage.getItem("endTime");
  end = Date.parse(end);
  var distance = end - now;
  // console.log("distance: " + distance);
  var ignoreThisVar = distance + distance - distance;
  localStorage.setItem("distance", distance);
  // If the count down is over, write some text
  if (distance < 0) {
    // clearInterval(x);
    // increase the current part, as long as
    updateCycleCounts();
    localStorage.setItem("inProgress", "false");
    localStorage.setItem("proceed", "true");
  }
  // if the count is not negative, show what time is left
  else {
    // Time calculations for minutes and seconds
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
  }
}

function updateCycleCounts()
{
  var isSnooze = localStorage.getItem("isSnooze");
  if (isSnooze == "true") {
    var html = notifyFocusOver();
    chrome.tabs.create({url: html});
    parent.focus();
    window.focus();
    return;
  }
  currentPart = localStorage.getItem("currentPart");
  sectionsOfCycleCompleted = localStorage.getItem("sectionsOfCycleCompleted");
  localStorage.setItem("completedAny", "true");
  if(currentPart == "0")
  {
    var html = notifyFocusOver();

    chrome.tabs.create({url: html});
    parent.focus();
    window.focus();
    // check if the next part should be long or short break
    if (sectionsOfCycleCompleted >= 3) {
      // if 3 sections have already been completed, user gets to be on long break now
      currentPart = LONG;
    } // we must still be due for a short break
    else {
      currentPart = SHORT;
    }
  }
  else if(currentPart == "1")  // the next part is definitely focus
  {
    html = notifyBreakOver();

    chrome.tabs.create({url: html});
    parent.focus();
    window.focus();
    currentPart = FOCUS;
    // they have completed another section of the cycle, so increase that by 1
    sectionsOfCycleCompleted++;
  }
  else  // the only other option is to currently be in a long 
  {
    html = notifyBreakOver();

    chrome.tabs.create({url: html});
    parent.focus();
    window.focus();
    // reset the sectionsOfCycleCompleted back to 0
    sectionsOfCycleCompleted = 0;
    if (localStorage.getItem("todaysCycles") == 0) {
      var temp = localStorage.getItem("totalCycles");
      temp++;
      localStorage.setItem("totalCycles", temp);
    }
    temp = localStorage.getItem("todaysCycles");
    temp++;
    localStorage.setItem("todaysCycles", temp);

    // the next step will be a focus cycle
    currentPart = FOCUS;
  }
  localStorage.setItem("currentPart", currentPart);
  localStorage.setItem("sectionsOfCycleCompleted", sectionsOfCycleCompleted);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

/*
let alarmid = document.getElementById('alarm');
// Currently alarm is set to go off every 25 minutes
// We will need to update this var (25)
// Uncomment when you want the alarm to start.
var alarm = chrome.alarms.create("Pomodoro Timer", {periodInMinutes: 1});
alarmid.addEventListener('click', function () {
    createNotification2();
    audioNotification();
    console.log("here2");
});

createNotification2();
audioNotification();
console.log("here");



chrome.alarms.onAlarm.addListener( function (alarm) {
  createNotification2();
  audioNotification();
});
*/

function notifyFocusOver() {
  // audioNotification();
  createNotification();
  return whichPage();
}

function notifyBreakOver() {
  // audioNotification();
  breakOverNotification();
  return whichPage();
}

function whichPage() {
  switch(localStorage.getItem("nudgeState")) {
    case "default":
      return "defaultNudge.html"
    case "confront":
      return "confrontNudge.html"
    case "facilitate":
      return "facilitateNudge.html"
    case "leveraging":
      return "leveragingNudge.html"
    case "reinforce":
      return "reinforceNudge.html"
    default:
      console.log("ERROR ERROR ERROR");
  }
}

function randomPage(x) {
  switch(x) {
    /*
    case 0:
      return "default";
      */
    case 0:
      return "confront";
    case 1: 
      return "facilitate";
    case 2:
      return "leveraging";
    case 3:
      return "reinforce";
  }
}

function audioNotification(){
    var yourSound = new Audio('audio/mario_coin.mp3');
    yourSound.play();
}

function createDeceptiveNotification() {
  var opt;
  opt = {
    type: "basic",
    title: "Time to take a break!",
    iconUrl: "images/teapot.png",
    buttons: [{ title: "Start Break" }, { title: "Snooze" }],
  };
  chrome.notifications.create("DeceptiveNotification", opt, function () {
    console.log("test test test");
  });
}

function createNotification2() {
  var opt = {
    type: "basic",
    title: "Your Title",
    message: "Your message",
    iconUrl: "your_icon.png",
  };
  chrome.notifications.create("notificationName", opt, function () {});

  //include this line if you want to clear the notification after 5 seconds
  setTimeout(function () {
    chrome.notifications.clear("notificationName", function () {});
  }, 5000);
}

function breakOverNotification() {
  var opt;
  var d = Date.now();
  // if (state == nudge_1):
  opt = {
      type: "basic",
      title: "Break over!",
      message: "Your break is over.  Go to your Chrome tab to start your new focus session.",
      iconUrl: "images/teapot.png"
    }
    chrome.notifications.create(`breakOver1-${Date.now()}`, opt, function(){ console.log("Last error:", chrome.runtime.lastError);});
    //include this line if you want to clear the notification after 5 seconds
}

function createNotification() {
  var opt;
  var d = Date.now();
  // if (state == nudge_1):
  opt = {
      type: "basic",
      title: "Time is up!",
      message: "Go to your Chrome tab to start break or snooze.",
      iconUrl: "images/teapot.png"
    }
    chrome.notifications.create(`focusOver1-${Date.now()}`, opt, function(){ console.log("Last error:", chrome.runtime.lastError);});
    //include this line if you want to clear the notification after 5 seconds
    // setTimeout(function(){chrome.notifications.clear("BreakTimeNotification",function(){});},5000);
}

chrome.notifications.onClicked.addListener(function() {
  parent.focus();
  window.focus();
});
