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
var updateId = document.getElementById("update-settings");

var todaysCycles = 0;
var totalCycles = 0;

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

document.getElementById("focusTime").value = localStorage.getItem("focusTime");
document.getElementById("shortBreak").value = localStorage.getItem("shortBreak");
document.getElementById("longBreak").value = localStorage.getItem("longBreak");
document.getElementById("todaysCycles").innerHTML = localStorage.getItem("todaysCycles");
document.getElementById("totalCycles").innerHTML = localStorage.getItem("totalCycles");
console.log("refresh");
console.log(localStorage.getItem("currentPart"));

if (localStorage.getItem("timerPaused")=="false" && localStorage.getItem("inProgress")=="true") {
  var distance = localStorage.getItem("distance");
  if (distance > 0) {
    // Time calculations for minutes and seconds
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById('txt').innerHTML =
    "Time Remaining: " + minutes + ":" + seconds;
    console.log(endTime);
    document.getElementById("start-button").innerHTML = "Press to Pause";
    document.getElementById("start-button").style.backgroundColor = "#FFA500";
  }
}
else { 
  switch(localStorage.getItem("currentPart")) {
    case "0":
      if (localStorage.getItem("completedAny") == "false") {
        break;    
      }
      else {
        document.getElementById("txt").innerHTML = "Continue Focusing";  
        document.getElementById("start-button").innerHTML = "Press to start focusing";
      }
      break;
    case "1":
      document.getElementById("txt").innerHTML = "Begin Short Break";
      document.getElementById("start-button").innerHTML = "Press to start your short break";
      break;
    case "2":
      document.getElementById("txt").innerHTML = "Begin Long Break";
      document.getElementById("start-button").innerHTML = "Press to start your long break";
      break;
  }
  changeBackgroundColor("start-button","#4CAF50");
}

  

updateId.addEventListener('click', function () {
    localStorage.setItem("focusTime", focusTime.value);
    localStorage.setItem("shortBreak", shortBreak.value);
    localStorage.setItem("longBreak", longBreak.value);
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
function fourthPomodoro()
{
  // if(currentCyclePomodoros[i] == false)
  // {
    //document.getElementById("fourthPomodoro").className = "fad fa-meh-blank smiley";
    document.getElementById('fourthPomodoro').classList.toggle('fa-grin-hearts');
    document.getElementById('fourthPomodoro').classList.toggle('fa-grin-beam');
    console.log("hi");
  // }
  
}

// all the listeners
document.getElementById("start-button").addEventListener("click", function() {pausePlayTimer()});

var FOCUS = "0";
var SHORT = "1";
var LONG = "2";

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

// keep track of current info
var currentPart = FOCUS;  // start with the assumption that the user will want to start with the focus
var sectionsOfCycleCompleted = 0; // start at 0 sections completed
var cyclesCompleted = 0;  // start with 0 cycles completed. In the future, this can pull from the chrome plugin


function startTimer()
{
    startTime();
}

// decide whether to call the pause or play functino
function pausePlayTimer()
{
  console.log("InProgress : " + localStorage.getItem("inProgress"));
  console.log("timerPaused : " + localStorage.getItem("timerPaused"));

  if(localStorage.getItem("inProgress") == "false") // if the timer has never been started
  {
    startTimer();
    // change the button to say "pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    // it's been started and is now in progress
    inProgress = true;
    localStorage.setItem("inProgress", true);
    console.log("!inProgress");
    document.getElementById("start-button").style.backgroundColor = "#FFA500";
  }
  else if(localStorage.getItem("inProgress") == "true" && localStorage.getItem("timerPaused") == "true") // if the timer is paused
  {
    playTimer();
    // change the button to say "Pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    console.log("inProgress && timerPaused");
    changeBackgroundColor("start-button","#FFA500");
  }
  else if(localStorage.getItem("inProgress") == "true" && localStorage.getItem("timerPaused") == "false")  // if the timer is playing
  {
    pauseTimer();
    // change the button to say "Play"
    document.getElementById("start-button").innerHTML = "Press to Play";
    console.log("inProgress && !timerPaused");
    changeBackgroundColor("start-button","#4CAF50");
  }
  else{
    console.log("something happened");
  }
}



//pause the timer
function pauseTimer()
{
  timerPaused = true;
  localStorage.setItem("timerPaused", true);
  timePaused = new Date();
  localStorage.setItem("timePaused", timePaused);
  console.log("timer endTime paused at " + localStorage.getItem("endTime"));
  // rename the button to be called play now that you have paused it
}

// unpause the timer
function playTimer()
{
  timerPaused = false;
  localStorage.setItem("timerPaused", false);
  durationPaused = new Date() - Date.parse(localStorage.getItem("timePaused"));
  console.log(getMinutes(durationPaused));
  console.log(getSeconds(durationPaused));

  console.log("minutes: " + minutes + ", seconds: "+ seconds);
  var end = new Date(localStorage.getItem("endTime"));
  end.setTime(end.getTime() + durationPaused);
  localStorage.setItem("endTime", end);

}

function getMinutes(d)
{
  return Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
}

function getSeconds(d)
{
  return Math.floor((d % (1000 * 60)) / 1000);
}


function updateTimer()
{
    // clearInterval(x);
    document.getElementById("txt").innerHTML = "Time's up!";
    // increase the current part, as long as
    updateCycleCounts();
    updateButton();
    inProgress = false;
    localStorage.setItem("timerPaused", false);
}

function updateButton()
{
    if(localStorage.getItem("currentPart") == FOCUS)
    {
      console.log("here1");
      document.getElementById("start-button").innerHTML = "Press to start focusing";
      localStorage.setItem("proceed", "false");
    }
    else if(localStorage.getItem("currentPart") == SHORT)
    {
      console.log("here2");
      document.getElementById("start-button").innerHTML = "Press to start your short break";
      localStorage.setItem("proceed", "false");
    }
    else if(localStorage.getItem("currentPart") == LONG)
    {
      console.log("here3");
      document.getElementById("start-button").innerHTML = "Press to start your long break";
      localStorage.setItem("proceed", "false");
    }
    changeBackgroundColor("start-button","#4CAF50");

}

// update the cycle counts so that we know where we're headed next
function updateCycleCounts()
{
      console.log("got out");
      document.getElementById("totalCycles").innerHTML = localStorage.getItem("totalCycles");
      document.getElementById("todaysCycles").innerHTML = localStorage.getItem("todaysCycles");

}

// var add_minutes =  function (dt, minutes) {
//   return new Date(dt.getTime() + minutes*60000);
// }

function startTime() {
  endTime = new Date();
  //console.log("time: "+ endTime);
  
  
  // longTime = document.getElementById("longBreak").value;
  // console.log("starting focus time" + focusTime);
  
  //console.log("after clicking: "+ endTime);
  currentPart = localStorage.getItem("currentPart");
  console.log("in function");
  if(currentPart == FOCUS)
  {
    focusTime = document.getElementById("focusTime").value;
    endTime.setTime(endTime.getTime() + focusTime*60000);
    localStorage.setItem("endTime", endTime);
    console.log("in function1");

  }
  else if(currentPart == SHORT)
  {
    shortTime = document.getElementById("shortBreak").value;
    endTime.setTime(endTime.getTime() + shortTime*60000);
    localStorage.setItem("endTime", endTime);
    console.log("in function2");

  }
  else
  {
    longTime = document.getElementById("longBreak").value;
    endTime.setTime(endTime.getTime() + longTime*60000);
    localStorage.setItem("endTime", endTime);
    console.log("in function3");

  }

  // un-pause the timer
  timerPaused = false;
  localStorage.setItem("timerPaused", false);

}

function checkTime(i) {
  if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
  return i;
}

// Update the countdown every 1 second
var x = setInterval(function() {
  var tPaused = localStorage.getItem("timerPaused");
  var iProgress = localStorage.getItem("inProgress");
  var distance = localStorage.getItem("distance");
  document.getElementById("todaysCycles").innerHTML = localStorage.getItem("todaysCycles");
  document.getElementById("totalCycles").innerHTML = localStorage.getItem("totalCycles");
  if(tPaused=="false" && iProgress=="true")
  {
    if (distance < 0) {
      localStorage.setItem("inProgress", "false");
      localStorage.setItem("proceed", "true");
      updateTimer();
      localStorage.setItem("distance", 0);
    }
    else if (distance > 0) {
        // Time calculations for minutes and seconds
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        document.getElementById('txt').innerHTML =
        "Time Remaining: " + minutes + ":" + seconds;
        console.log(endTime);
        document.getElementById("start-button").innerHTML = "Press to Pause";
        document.getElementById("start-button").style.backgroundColor = "#FFA500";

    }
  }
 
}, 1000);

function changeBackgroundColor(name, color)
{
  document.getElementById(name).style.backgroundColor = color;
}
