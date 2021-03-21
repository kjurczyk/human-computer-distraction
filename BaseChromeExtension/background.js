chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('Nudged Pomodoros.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

// Should we clear right away
localStorage.clear();

var FOCUS = 0;
var SHORT = 1;
var LONG = 2;
var todaysCycles = 0;
var totalCycles = 0;
if (localStorage.getItem("focusTime") == null) {
    localStorage.setItem("focusTime", 0.1);
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
if (localStorage.getItem("totalCycles") == null) {
    localStorage.setItem("totalCycles", 0);
}
else {
    totalCycles = localStorage.getItem("totalCycles");
}
if (localStorage.getItem("currentPart") == null) {
  localStorage.setItem("currentPart", FOCUS);
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
  localStorage.setItem("buttonStage", "PressToPause");
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
if (localStorage.getItem("completedAny") == null){
  localStorage.setItem("completedAny", "false");
}

var test = true;

// Check and set date
// Loop every 10 minutes? Every hour? 

function timerLoopFunction() {
  var timerPaused = localStorage.getItem("timerPaused");
  var inProgress = localStorage.getItem("inProgress");

  if(timerPaused=="false" && inProgress=="true")
  {
    console.log(localStorage.getItem("endTime"));
    updateTimer();
  }
}

var y = setInterval(function() {
  timerLoopFunction();
}, 1000);

var dateLoop = setInterval(function () {
  d = new Date();
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
  }
}, 600000);


var minutes;
var seconds;
// keep track of current info
var currentPart = FOCUS;  // start with the assumption that the user will want to start with the focus
var sectionsOfCycleCompleted = 0; // start at 0 sections completed
var cyclesCompleted = 0;  // start with 0 cycles completed. In the future, this can pull from the chrome plugin

function setters() {
  console.log("in here");
  localStorage.setItem("inProgress", "false");
  localStorage.setItem("proceed", "true");
  console.log("end");
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

function updateTimer()
{
  var now = new Date();
  var end = localStorage.getItem("endTime");
  end = Date.parse(end);
  console.log("end " + end);
  var distance = end - now;
  console.log("distance: " + distance);
  localStorage.setItem("distance", distance);
  //console.log("distance", distance);
  // If the count down is over, write some text 
  if (distance < 0) {
    // clearInterval(x);
    // increase the current part, as long as
    updateCycleCounts();
  }
  // if the count is not negative, show what time is left
  else{
    // Time calculations for minutes and seconds
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    console.log(minutes);
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log(seconds);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    console.log("Time Remaining: " + minutes + ":" + seconds);
 }
}

function updateCycleCounts()
{
  currentPart = localStorage.getItem("currentPart");
  sectionsOfCycleCompleted = localStorage.getItem("sectionsOfCycleCompleted")
  console.log("We've completed PRE : " + sectionsOfCycleCompleted);
  console.log("We are in part PRE : " + currentPart);
  localStorage.setItem("completedAny", "true");

  if(currentPart == "0")
  {
    createNotification();
    audioNotification();
    // check if the next part should be long or short break
    if(sectionsOfCycleCompleted >= 3) // if 3 sections have already been completed, user gets to be on long break now
    {
      currentPart = LONG;
    }
    else // we must still be due for a short break
    {
      console.log("we should end up here.");
      currentPart = SHORT;
    }
  }
  else if(currentPart == "1")  // the next part is definitely focus
  {
    breakOverNotification();
    audioNotification();
    currentPart = FOCUS;
    // they have completed another section of the cycle, so increase that by 1
    sectionsOfCycleCompleted++;
  }
  else  // the only other option is to currently be in a long 
  {
    breakOverNotification();
    audioNotification();
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
  console.log("We've completed : " + sectionsOfCycleCompleted);
  console.log("We are in part : " + currentPart);
  localStorage.setItem("currentPart", currentPart);
  localStorage.setItem("sectionsOfCycleCompleted", sectionsOfCycleCompleted);

}

function checkTime(i) {
  if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
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
function audioNotification(){
    var yourSound = new Audio('audio/mario_coin.mp3');
    yourSound.play();
    console.log("here3");
}

function createDeceptiveNotification() {
  var opt;
  opt = {
    type: "basic",
    title: "Time to take a break!",
    iconUrl: "images/teapot.png",
    buttons: [
      {title: "Start Break"},
      {title: "Snooze"}
    ]
  };
  chrome.notifications.create("DeceptiveNotification", opt, function(){ console.log("test test test");});
}

function createNotification2(){
  var opt = {type: "basic",title: "Your Title",message: "Your message",iconUrl: "your_icon.png"}
  chrome.notifications.create("notificationName",opt,function(){});

  //include this line if you want to clear the notification after 5 seconds
  setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}

function breakOverNotification() {
  var opt;
  var d = Date.now();
  console.log(d);
  // if (state == nudge_1):
  opt = {
      type: "basic",
      title: "Break over!",
      message: "Back to the grind, you slacker.",
      iconUrl: "images/teapot.png"
    }
    chrome.notifications.create(`breakOver-${Date.now()}`, opt, function(){ console.log("Last error:", chrome.runtime.lastError);});
    //include this line if you want to clear the notification after 5 seconds
}

function createNotification(){
  var opt;
  var d = Date.now();
  console.log(d);
  // if (state == nudge_1):
  opt = {
      type: "basic",
      title: "Time to take a break!",
      message: "Did you know if you snooze your breaks you will literally die?",
      iconUrl: "images/teapot.png"
    }
    chrome.notifications.create(`focusOver-${Date.now()}`, opt, function(){ console.log("Last error:", chrome.runtime.lastError);});
    //include this line if you want to clear the notification after 5 seconds
    // setTimeout(function(){chrome.notifications.clear("BreakTimeNotification",function(){});},5000);
}

chrome.notifications.onClicked.addListener(function() {
  chrome.tabs.create({url: "options.html"});
});