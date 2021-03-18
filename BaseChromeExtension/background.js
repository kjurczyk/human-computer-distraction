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

function createNotification(){
  var opt;
  // if (state == nudge_1):
  opt = {
      type: "basic",
      title: "Time to take a break!",
      message: "Did you know if you snooze your breaks you will literally die?",
      iconUrl: "images/teapot.png",
    };
    chrome.notifications.create("BreakTimeNotification", opt, function(){});
  
    //include this line if you want to clear the notification after 5 seconds
    setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}