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


var endTime = new Date();
var timerPaused = true;  // the timer starts out as non-paused
var minutes;
var seconds;
var timePaused;
var durationPaused;
var focusTime;
var inProgress = false;

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

// var add_minutes =  function (dt, minutes) {
//   return new Date(dt.getTime() + minutes*60000);
// }

function startTime() {
  endTime = new Date();
  //console.log("time: "+ endTime);
  focusTime = document.getElementById("focusTime").value;
  console.log("starting focus time" + focusTime);
  endTime.setTime(endTime.getTime() + focusTime*60000);
  //console.log("after clicking: "+ endTime);

  // un-pause the timer
  timerPaused = false;
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

// Update the countdown every 1 second
var x = setInterval(function() {
  if(!timerPaused)
  {
    updateTimer();
  }
 
}, 1000);

function changeBackgroundColor(name, color)
{
  document.getElementById(name).style.backgroundColor = color;
}