// let page = document.getElementById('buttonDiv');
// const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];
// function constructOptions(kButtonColors) {
//   for (let item of kButtonColors) {
//     let button = document.createElement('button');
//     button.style.backgroundColor = item;
//     button.addEventListener('click', function() {
//       chrome.storage.sync.set({color: item}, function() {
//         console.log('color is ' + item);
//       })
//     });
//     page.appendChild(button);
//   }
// }
// constructOptions(kButtonColors);

// when you open options page

var focusTime = document.getElementById("focusTime");
var shortBreak = document.getElementById("shortBreak");
var longBreak = document.getElementById("longBreak");
var snooze = document.getElementById("snooze");
var updateId = document.getElementById("update-settings");

var todaysCycles = 0;
var totalCycles = 0;

var FOCUS = "0";
var SHORT = "1";
var LONG = "2";
var SNOOZE = "3";

var endTime = new Date();
var timerPaused = true;  // the timer starts out as non-paused
var minutes;
var seconds;
var timePaused;
var durationPaused;
var focusTime;
var shortTime;
var longTime;
var inProgress = false;
var closeMeOut = false;
var closeMeOutAgain = false;
// keep track of current info
var currentPart = FOCUS;  // start with the assumption that the user will want to start with the focus
var sectionsOfCycleCompleted = 0; // start at 0 sections completed
var cyclesCompleted = 0;  // start with 0 cycles completed. In the future, this can pull from the chrome plugin

/*
window.alert(localStorage.getItem("focusTime"));
window.alert(localStorage.getItem("shortBreak"));
window.alert(localStorage.getItem("longBreak"));
*/

if (localStorage.getItem("focusTime") == null) {
  localStorage.setItem("focusTime", 25);
}
if (localStorage.getItem("shortBreak") == null) {
  localStorage.setItem("shortBreak", 5);
}
if (localStorage.getItem("longBreak") == null) {
  localStorage.setItem("longBreak", 30);
}
if (localStorage.getItem("snooze") == null) {
  localStorage.setItem("snooze", 2);
}
if (localStorage.getItem("todaysCycles") == null) {
  localStorage.setItem("todaysCycles", 0);
} else {
  todaysCycles = localStorage.getItem("todaysCycles");
}
if (localStorage.getItem("totalCycles") == null) {
  localStorage.setItem("totalCycles", 0);
} else {
  totalCycles = localStorage.getItem("totalCycles");
}
if (localStorage.getItem("isFinalCycle") == null) {
  localStorage.setItem("isFinalCycle", false);
}

document.getElementById("focusTime").value = localStorage.getItem("focusTime");
document.getElementById("shortBreak").value = localStorage.getItem(
  "shortBreak"
);
document.getElementById("longBreak").value = localStorage.getItem("longBreak");
document.getElementById("snooze").value = localStorage.getItem("snooze");

document.getElementById("todaysCycles").innerHTML = localStorage.getItem("todaysCycles");
document.getElementById("totalCycles").innerHTML = localStorage.getItem("totalCycles");
/*
var asd = setInterval( function () {
  document
  .querySelectorAll(
    `#cycle${parseInt(
      localStorage.getItem("sectionsOfCycleCompleted")
    )} svg`
  )
  .forEach((value) => value.classList.remove("default"));
  document
  .querySelectorAll(
    `#cycle${parseInt(
      localStorage.getItem("sectionsOfCycleCompleted")
    )} svg`
  )
  .forEach((value) => value.classList.add("smiley-active"));
  }, 1000);
  */


// If we need to reset because its a new day and we haven't reset yet, we do it here. 
resetter();

// We use setInterval instead of just having the for loop by itself
// This is probably needed because of the querySelector grabbing the cycle initially
// And we need it to grab it after that -- so we just use a setInterval to grab it again.
var badgeLoop = setInterval( function () {
  for (var i = 0; i <= parseInt(localStorage.getItem("sectionsOfCycleCompleted")); i++) {
    
    // This makes sure that the last emoji (id = 0) is always off when its not final cycle.
    if ((i == 0 &&
      localStorage.getItem("isFinalCycle") == "false")) {
      // This is done so we don't continue on with this iteration.
      continue;
    }

    // If we're in the final cycle (4th pomodoro), all emojis should be turned on
    // So i == 0 is the 4th emoji.  The current part is focus meaning we JUST finished the LONG BREAK.
    // We turn on all of the emojis at that point.
    if ((i == 0 &&
      localStorage.getItem("currentPart") == FOCUS)) {
        for (let j = 0; j < 4; j++) {
          document
            .querySelectorAll(`#cycle${j} svg`)
            .forEach((value) => value.classList.remove("default"));
          document
            .querySelectorAll(`#cycle${j} svg`)
            .forEach((value) => value.classList.add("smiley-active"));
        }
        // This is done so we don't continue on with this iteration.
        continue;
      }

    // This is the ELSE case, when i != 0 
    // For anything other than 0, we look at what is the current cycle
    // We turn on all of the previous cycles and the current cycle
    // Excluding 0 (because 0 is the 4th emoji).
    if (i != 0) {
      document
      .querySelectorAll(
        `#cycle${i} svg`
      )
      .forEach((value) => value.classList.remove("default"));

      document
      .querySelectorAll(
        `#cycle${i} svg`
      )
      .forEach((value) => value.classList.add("smiley-active"));

    }
  }
}, 1000);
  
if (localStorage.getItem("autoStartTimer") == "snooze") {
  snoozeTimer();
  localStorage.setItem("autoStartTimer", "null");
  localStorage.setItem("lastAction", "snooze");
}
if (localStorage.getItem("autoStartTimer") == "start") {
  pausePlayTimer();
  localStorage.setItem("autoStartTimer", "null");
}
if (localStorage.getItem("timerPaused")=="false" && localStorage.getItem("inProgress")=="true") {
  var distance = localStorage.getItem("distance");
  if (distance > 0) {
    // Time calculations for minutes and seconds
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById("txt").innerHTML =
      "Time Remaining: " + minutes + ":" + seconds;
    if (localStorage.getItem("isSnooze") == "false") {
      document.getElementById("start-button").innerHTML = "Press to Pause";
      document.getElementById("start-button").style.backgroundColor = "#FFA500";
    }
    if (localStorage.getItem("isSnooze") == "true") {
      document.getElementById("start-button").style.display = "none";
    }
  }
} else {
  switch (localStorage.getItem("currentPart")) {
    case "0":
      if (localStorage.getItem("completedAny") == "false") {
        break;
      } else {
        document.getElementById("txt").innerHTML = "Continue Focusing";
        document.getElementById("start-button").innerHTML =
          "Press to start focusing";
      }
      break;
    case "1":
      document.getElementById("txt").innerHTML = "Begin Short Break";
      document.getElementById("start-button").innerHTML = "Press to start your short break";
      var snoozeButton = document.getElementById("snooze-button");
      snoozeButton.style.display = "block";
      break;
    case "2":
      document.getElementById("txt").innerHTML = "Begin Long Break";
      document.getElementById("start-button").innerHTML = "Press to start your long break";
      snoozeButton = document.getElementById("snooze-button");
      snoozeButton.style.display = "block";
      break;
  }
  changeBackgroundColor("start-button", "#4CAF50");
}

  

updateId.addEventListener('click', function () {
    focusTime = document.getElementById("focusTime");
    shortBreak = document.getElementById("shortBreak");
    longBreak = document.getElementById("longBreak");
    snooze = document.getElementById("snooze");
    if (isNaN(focusTime.value) || focusTime.value < 1) {
      window.alert("Please make sure all times are at least 1 minute");
      return;
    }
    if (isNaN(shortBreak.value) || shortBreak.value < 1) {
      window.alert("Please make sure all times are at least 1 minute");
      return;
    }
    if (isNaN(longBreak.value) || longBreak.value < 1) {
      window.alert("Please make sure all times are at least 1 minute");
      return;
    }
    if (isNaN(snooze.value) || snooze.value < 1 || snooze.value >= 30) {
      window.alert("Please make sure all times are at least 1 minute.  Snooze also cannot be greater than 30 minutes.");
      return;
    }
    localStorage.setItem("focusTime", focusTime.value);
    localStorage.setItem("shortBreak", shortBreak.value);
    localStorage.setItem("longBreak", longBreak.value);
    localStorage.setItem("snooze", snooze.value);

    window.alert("Successfully updated timers!");
})

// all the pomodoros and whether they are complete or not
//var currentCyclePomodoros = ["firstPomo","secondPomo","thirdPomo","fourthPomo"];

// function resetCurrentCycle()
// {
//   for(int i = 0; i < 4; i++)
//   {
//     currentCyclePomodoros[i] = false;
//   }
// };

//changes the fourth Pomodoro either from a greyed out smiley or a super smiley smiley

//updateSettings.addEventListener("click", fourthPomodoro);
function fourthPomodoro() {
  // if(currentCyclePomodoros[i] == false)
  // {
  //document.getElementById("fourthPomodoro").className = "fad fa-meh-blank smiley";
  document.getElementById("fourthPomodoro").classList.toggle("fa-grin-hearts");
  document.getElementById("fourthPomodoro").classList.toggle("fa-grin-beam");
  // }
}

// all the listeners
document.getElementById("start-button").addEventListener("click", function() {
  pausePlayTimer()});
document.getElementById("snooze-button").addEventListener("click", function() {
  snoozeTimer();
});

function startTimer() {
  startTime();
}

// decide whether to call the pause or play functino
function pausePlayTimer() {
  closeMeOut = true;
  if (localStorage.getItem("inProgress") == "false") {
    // if the timer has never been started
    startTimer();
    // change the button to say "pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    // it's been started and is now in progress
    inProgress = true;
    localStorage.setItem("inProgress", true);
    document.getElementById("start-button").style.backgroundColor = "#FFA500";
  } 
  else if (localStorage.getItem("inProgress") == "true" && localStorage.getItem("timerPaused") == "true") {
    // if the timer is paused
    playTimer();
    // change the button to say "Pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    changeBackgroundColor("start-button", "#FFA500");
  } else if (
    localStorage.getItem("inProgress") == "true" &&
    localStorage.getItem("timerPaused") == "false"
  ) {
    // if the timer is playing
    pauseTimer();
    // change the button to say "Play"
    document.getElementById("start-button").innerHTML = "Press to Play";
    changeBackgroundColor("start-button", "#4CAF50");
  } else {
    console.log("something happened");
  }
}


function snoozeTimer() {
  closeMeOut = true;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("snooze-button").style.display = "none";
  localStorage.setItem("isSnooze", true);
  startTimer();
  localStorage.setItem("timerPaused", false);
  localStorage.setItem("inProgress", true);
}
//pause the timer
function pauseTimer() {
  timerPaused = true;
  localStorage.setItem("timerPaused", true);
  timePaused = new Date();
  localStorage.setItem("timePaused", timePaused);
  // rename the button to be called play now that you have paused it
}

// unpause the timer
function playTimer() {
  timerPaused = false;
  localStorage.setItem("timerPaused", false);
  durationPaused = new Date() - Date.parse(localStorage.getItem("timePaused"));
  var end = new Date(localStorage.getItem("endTime"));
  end.setTime(end.getTime() + durationPaused);
  localStorage.setItem("endTime", end);
}

function getMinutes(d) {
  return Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
}

function getSeconds(d) {
  return Math.floor((d % (1000 * 60)) / 1000);
}

function updateTimer() {
  // clearInterval(x);
  document.getElementById("txt").innerHTML = "Time's up!";
  // increase the current part, as long as
  if (localStorage.getItem("isSnooze") == "true") {
    localStorage.setItem("isSnooze", false);
    inProgress = false;
    localStorage.setItem("timerPaused", false);
    document.getElementById("start-button").style.display = "block";
    document.getElementById("snooze-button").style.display = "block";
    return;
  }
  if (localStorage.getItem("currentPart") == FOCUS) {
    document
      .querySelectorAll(
        `#cycle${parseInt(
          localStorage.getItem("sectionsOfCycleCompleted")
        )} svg`
      )
      .forEach((value) => value.classList.remove("default"));
    document
      .querySelectorAll(
        `#cycle${parseInt(
          localStorage.getItem("sectionsOfCycleCompleted")
        )} svg`
      )
      .forEach((value) => value.classList.add("smiley-active"));
  }

  if (localStorage.getItem("currentPart") == LONG) {
    localStorage.setItem("isFinalCycle", true);
  }

  // focus - short - focus - short - focus - short - focus - long --> focus

  updateCycleCounts();
  updateButton();
  inProgress = false;
  localStorage.setItem("timerPaused", false);
  if (
    localStorage.getItem("isFinalCycle") == "true" &&
    localStorage.getItem("currentPart") == SHORT
  ) {
    for (let i = 0; i < 4; i++) {
      document
        .querySelectorAll(`#cycle${i} svg`)
        .forEach((value) => value.classList.add("default"));
      document
        .querySelectorAll(`#cycle${i} svg`)
        .forEach((value) => value.classList.remove("smiley-active"));
    }
    localStorage.setItem("isFinalCycle", false);
  }

  inProgress = false;
  localStorage.setItem("timerPaused", false);

  //Time is up - grant badge
  // localStorage.getItem("sectionsOfCycleCompleted");

  // window.alert(localStorage.getItem("sectionsOfCycleCompleted"));
}

function updateButton()
{
    if(localStorage.getItem("currentPart") == FOCUS)
    {
      document.getElementById("start-button").innerHTML = "Press to start focusing";
      localStorage.setItem("proceed", "false");
      snoozeButton = document.getElementById("snooze-button");
      snoozeButton.style.display = "none";
    }
    else if(localStorage.getItem("currentPart") == SHORT)
    {
      document.getElementById("start-button").innerHTML = "Press to start your short break";
      localStorage.setItem("proceed", "false");
      snoozeButton = document.getElementById("snooze-button");
      snoozeButton.style.display = "block";
    }
    else if(localStorage.getItem("currentPart") == LONG)
    {
      document.getElementById("start-button").innerHTML = "Press to start your long break";
      localStorage.setItem("proceed", "false");
      snoozeButton = document.getElementById("snooze-button");
      snoozeButton.style.display = "block";
    }
  changeBackgroundColor("start-button", "#4CAF50");
}

// update the cycle counts so that we know where we're headed next
function updateCycleCounts() {
  document.getElementById("totalCycles").innerHTML = localStorage.getItem(
    "totalCycles"
  );
  document.getElementById("todaysCycles").innerHTML = localStorage.getItem(
    "todaysCycles"
  );
}

// var add_minutes =  function (dt, minutes) {
//   return new Date(dt.getTime() + minutes*60000);
// }

function startTime() {
  endTime = new Date();
  currentPart = localStorage.getItem("currentPart");
  var isSnooze = localStorage.getItem("isSnooze");
  if (isSnooze == "true") {
    var snoozeTime = document.getElementById("snooze").value;
    endTime.setTime(endTime.getTime() + snoozeTime * 60000);
    localStorage.setItem("endTime", endTime);
  }
  else if(currentPart == FOCUS)
  {
    focusTime = document.getElementById("focusTime").value;
    endTime.setTime(endTime.getTime() + focusTime * 60000);
    localStorage.setItem("endTime", endTime);
    snoozeButton = document.getElementById("snooze-button");
    snoozeButton.style.display = "none";
    localStorage.setItem("lastAction", "focus");

  }
  else if(currentPart == SHORT)
  {
    shortTime = document.getElementById("shortBreak").value;
    endTime.setTime(endTime.getTime() + shortTime * 60000);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("lastAction", "break");

    var bT = parseInt(localStorage.getItem("breaksTaken"));
    bT = bT + 1;
    localStorage.setItem("breaksTaken", bT);

  }
  else if (currentPart == LONG)
  {
    longTime = document.getElementById("longBreak").value;
    endTime.setTime(endTime.getTime() + longTime * 60000);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("lastAction", "break");
    bT = parseInt(localStorage.getItem("breaksTaken"));
    bT = bT + 1;
    localStorage.setItem("breaksTaken", bT);

  }
  else {
    console.log("error no match");
  }

  // un-pause the timer
  timerPaused = false;
  localStorage.setItem("timerPaused", false);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

// Update the countdown every 1 second
var x = setInterval(function () {
  var tPaused = localStorage.getItem("timerPaused");
  var iProgress = localStorage.getItem("inProgress");
  distance = parseInt(localStorage.getItem("distance"));
  document.getElementById("todaysCycles").innerHTML = localStorage.getItem("todaysCycles");
  document.getElementById("totalCycles").innerHTML = localStorage.getItem("totalCycles");
  if(tPaused=="false" && (iProgress=="true" || distance < 0))
  {
    if (distance < 0) {
      localStorage.setItem("inProgress", "false");
      localStorage.setItem("proceed", "true");
      updateTimer();
      localStorage.setItem("distance", 0);
      window.close();
    } else if (distance > 0) {
      // Time calculations for minutes and seconds
      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((distance % (1000 * 60)) / 1000);
      minutes = checkTime(minutes);
      seconds = checkTime(seconds);
      document.getElementById("txt").innerHTML =
        "Time Remaining: " + minutes + ":" + seconds;
//      console.log("Time Remaining: " + minutes + ":" + seconds);
        if (localStorage.getItem("isSnooze") == "false") {
          document.getElementById("start-button").innerHTML = "Press to Pause";
          document.getElementById("start-button").style.backgroundColor = "#FFA500";
        }
        if (localStorage.getItem("isSnooze") == "true") {
          document.getElementById("start-button").style.display = "none";
        }
    }
  }
}, 1000);

/*
var d = setInterval(function () {
  if (closeMeOutAgain) {
    closeMeOut = false;
    closeMeOutAgain = false;
    window.close();
  }
  if (closeMeOut) {
    closeMeOutAgain = true;
  }
}, 5000);
*/
function changeBackgroundColor(name, color)
{
  document.getElementById(name).style.backgroundColor = color;
}


function resetter() {
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
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}