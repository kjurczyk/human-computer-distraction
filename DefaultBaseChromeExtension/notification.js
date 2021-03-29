var DVmessages = [''];
var RoCmessages = [''];
var LPCmessages = [''];
var Rmessages = [''];

const states = {
  DV : "Deceptive Visualizations",
  RoC : "Reminder of Consequences",
  LPC : "Leveraging Public Commitment",
  R : "Reinforce"
}

class Notification {
  // string, int, string, string, string, string
  constructor(state, level, type, title, message, iconUrl) {
    this.state = state;
    this.level = level;
    this.type = type;
    this.title = title;
    this.message = message;
    this.iconUrl = iconUrl;
  }

  setState(state) {
    this.state = state;
  }

  setRandomState() {
    var randInt = Math.floor(Math.random() * Math.floor(4));
    switch (randInt) {
      case 0:
        this.state = states.DV;
        break;
      case 1:
        this.state = states.RoC;
         break;
      case 2:
        this.state = states.LPC;
        break;
      case 3:
        this.state = states.R;
        break;  
    }
  }
// Set State First
// Then set notification
  setNotification() {
    // Assume State has been set
    this.title = "Take a break!";
    switch (this.state) {
      case states.DV:
        break;
      case states.RoC:
        this.message = DVmessages[this.level];
        break;
      case states.LPC:
        break;
      case R:
        this.iconUrl = Rmessages[this.level];
        break;
    }
    this.increaseLevel();
  }

  increaseLevel() {
    this.level = this.level + 1;
  }

  createNotification(){
    var opt;
    opt = {
        type: this.type,
        title: this.title,
        message: this.message,
        iconUrl: this.iconUrl
      }
    chrome.notifications.create("BreakTimeNotification", opt, function(){});
    
    //include this line if you want to clear the notification after 5 seconds
    // setTimeout(function(){chrome.notifications.clear("BreakTimeNotification",function(){});},5000);
  }
}
export {DVmessages, RoCmessages, LPCmessages, Rmessages, states, Notification}