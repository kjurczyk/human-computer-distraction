let alarmid = document.getElementById('alarm');
// Currently alarm is set to go off every 25 minutes
// We will need to update this var (25)
// Uncomment when you want the alarm to start.
var alarm = chrome.alarms.create("Pomodoro Timer", {periodInMinutes: 1});
/*chrome.alarms.onAlarm.addListener( function (alarm) {
  createNotification2();
  audioNotification();
});*/

alarmid.addEventListener('click', function () {
    createNotification();
    audioNotification();
});

function audioNotification(){
  var yourSound = new Audio('audio/mario_coin.mp3');
  yourSound.play();
}

  function createNotification(){
    var opt;
    // if (state == nudge_1):
    opt = {
        type: "basic",
        title: "Time to take a break!",
        message: "Did you know if you snooze your breaks you will literally die?",
        iconUrl: "images/teapot.png",
        buttons: [
          {title: "Start Break"}
        ]
      }
      chrome.notifications.create("BreakTimeNotification", opt, function(){});
    
      //include this line if you want to clear the notification after 5 seconds
      setTimeout(function(){chrome.notifications.clear("BreakTimeNotification",function(){});},5000);
  }