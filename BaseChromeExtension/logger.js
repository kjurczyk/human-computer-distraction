function createTimeLog(nudgeType, timestamp, focusTime, shortBreak, longBreak, typeOfBreak, elapsedTime, misc) {
    //to log components that have time element, like heatmaps and progress bar
    var logObject = {};
      logObject.nudge = nudgeType;
      logObject.time = timestamp;
      logObject.fTime = focusTime;
      logObject.shBrT = shortBreak;
      logObject.lngBrT = longBreak;
      logObject.brkType = typeOfBreak;
      logObject.elpsT = elapsedTime;
      logObject.misc = misc;
    return logObject;
}

function appendLog(logObject, item) {
    var allTheLogs = JSON.parse(localStorage.getItem(item));
    if (allTheLogs == undefined) {
      allTheLogs = [];
    }
    allTheLogs.push(logObject);
    localStorage.setItem(item, JSON.stringify(allTheLogs));
  }
  