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
