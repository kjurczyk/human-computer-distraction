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
var shortBreak = document.getElementById("shBrk");
var longBreak = document.getElementById("lngBrk");
var updateId = document.getElementById("update-settings");
if (localStorage.getItem("focusTime") == null)
    localStorage.setItem("focusTime", focusTime.value);
if (localStorage.getItem("shBrk") == null)
    localStorage.setItem("shBrk", shortBreak.value);
if (localStorage.getItem("lngBrk") == null)
    localStorage.setItem("lngBrk", longBreak.value);
document.getElementById("focusTime").value = localStorage.getItem("focusTime");
document.getElementById("shBrk").value = localStorage.getItem("shBrk");
document.getElementById("lngBrk").value = localStorage.getItem("lngBrk");

updateId.addEventListener('click', function () {
    localStorage.setItem("focusTime", focusTime.value);
    localStorage.setItem("shBrk", shortBreak.value);
    localStorage.setItem("lngBrk", longBreak.value);
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

var FOCUS = 0;
var SHORT = 1;
var LONG = 2;

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
  if(!inProgress) // if the timer has never been started
  {
    startTimer();
    // change the button to say "pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    // it's been started and is now in progress
    inProgress = true;
    console.log("!inProgress");
    document.getElementById("start-button").style.backgroundColor = "#FFA500";
  }
  else if(inProgress && timerPaused) // if the timer is paused
  {
    playTimer();
    // change the button to say "Pause"
    document.getElementById("start-button").innerHTML = "Press to Pause";
    console.log("inProgress && timerPaused");
    changeBackgroundColor("start-button","#FFA500");
  }
  else if(inProgress && !timerPaused)  // if the timer is playing
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
  timePaused = new Date();
  console.log("timer endTime paused at " + endTime);
  // rename the button to be called play now that you have paused it
}

// unpause the timer
function playTimer()
{
  timerPaused = false;
  durationPaused = new Date() - timePaused;
  console.log(getMinutes(durationPaused));
  console.log(getSeconds(durationPaused));

  console.log("minutes: " + minutes + ", seconds: "+ seconds);
  endTime.setTime(endTime.getTime() + durationPaused);

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
  var now = new Date();
  var distance = endTime - now;
  //console.log("distance", distance);
  // If the count down is over, write some text 
  if (distance < 0) {
    // clearInterval(x);
    document.getElementById("txt").innerHTML = "Time's up!";
    // increase the current part, as long as
    updateCycleCounts();
    updateButton();
    inProgress = false;
  }
  // if the count is not negative, show what time is left
  else{
    // Time calculations for minutes and seconds
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById('txt').innerHTML =
    "Time Remaining: " + minutes + ":" + seconds;
 }

}

function updateButton()
{
  if(currentPart == FOCUS)
  {
    document.getElementById("start-button").innerHTML = "Press to start focusing";
  }
  else if(currentPart == SHORT)
  {
    document.getElementById("start-button").innerHTML = "Press to start your short break";
  }
  else if(currentPart == LONG)
  {
    document.getElementById("start-button").innerHTML = "Press to start your long break";
  }
  changeBackgroundColor("start-button","#4CAF50");
}

// update the cycle counts so that we know where we're headed next
function updateCycleCounts()
{
  if(currentPart == FOCUS)
  {
    // check if the next part should be long or short break
    if(sectionsOfCycleCompleted >= 3) // if 3 sections have already been completed, user gets to be on long break now
    {
      currentPart = LONG;
    }
    else // we must still be due for a short break
    {
      currentPart = SHORT;
    }
  }
  else if(currentPart == SHORT)  // the next part is definitely focus
  {
    currentPart = FOCUS;
    // they have completed another section of the cycle, so increase that by 1
    sectionsOfCycleCompleted++;
  }
  else  // the only other option is to currently be in a long 
  {
    // they've completed one entire cycle
    cyclesCompleted++;
    // reset the sectionsOfCycleCompleted back to 0
    sectionsOfCycleCompleted = 0;
    // the next step will be a focus cycle
    currentPart = FOCUS;
  }
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
  if(currentPart == FOCUS)
  {
    focusTime = document.getElementById("focusTime").value;
    endTime.setTime(endTime.getTime() + focusTime*60000);
  }
  else if(currentPart == SHORT)
  {
    shortTime = document.getElementById("shortBreak").value;
    endTime.setTime(endTime.getTime() + shortTime*60000);
  }
  else
  {
    longTime = document.getElementById("longBreak").value;
    endTime.setTime(endTime.getTime() + longTime*60000);
  }

  // un-pause the timer
  timerPaused = false;
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

// Update the countdown every 1 second
var x = setInterval(function() {
  if(!timerPaused && inProgress)
  {
    updateTimer();
  }
 
}, 1000);

function changeBackgroundColor(name, color)
{
  document.getElementById(name).style.backgroundColor = color;
}
