
var actionID = '';
    var actiondefined = '';


    browser.runtime.onMessage.addListener(doyoutubeaction);

    function doyoutubeaction(message) {

	console.log(message);
      actionID = message.actionid;
	actiondefined = message.actiondefined; 


      var querying = browser.tabs.query({
        url: "*://*.youtube.com/*"
      });
      querying.then(logTabs, onError);

    }


    // get all the tab url
    function logTabs(tabs) {

	console.log('action is:::::'+actiondefined);

      for (let tab of tabs) {
        // tab.url requires the `tabs` permission
	if(actiondefined == 'controls'){
       		 changeSong(tab.id); 
	}else if(actiondefined == 'changevid'){
        	browser.tabs.update(tab.id, {"url" :actionID});
	}
     }

	if(tabs.length ==0 && actiondefined == 'changevid'){
		browser.tabs.create( {"url" :actionID});
	}

    }

    function onError(error) {
      console.log(`Error: ${error}`);
    }

    function onExecuted(result) {
      console.log(`We executed in tab 2`);
    }


    // do the operation
    function changeSong(tabid) {

      var codeToExecute = '';
      codeToExecute = findCode(tabid);


      var executing = browser.tabs.executeScript(
        tabid, {
          code: codeToExecute
        }
      );
      executing.then(onExecuted, onError);

    }


    // Find the code executiong
    function findCode(tabid) {

      if (actionID == 'nextsong') {
        return 'document.querySelector(".ytp-next-button.ytp-button").click()'
      } else if (actionID == 'switchplay') {
        return 'document.querySelector(".ytp-play-button.ytp-button").click()'
      } else if (actionID == 'replay') {
        return 'document.querySelector(".ytp-prev-button.ytp-button").click()'
      } else if (actionID == 'lastsong') {
        browser.tabs.executeScript(
          tabid, {
            code: 'document.querySelector(".ytp-prev-button.ytp-button").click()'
          }
        );
        return 'document.querySelector(".ytp-prev-button.ytp-button").click()'
      }

    }


/*if(localStorage.getItem("default_periodInMinutes")== null){
	browser.notifications.create(cakeNotification, {
    "type": "basic",
    "iconUrl": browser.extension.getURL("icon.jpeg"),
    "title": "Time for cake!",
    "message": "Something something cake not found item"
  });
}*/

	
var default_periodInMinutes = 2; // for every x minute alarm should come
var periodInMinutes = 2;
var cakeNotification = "cake-notification";



// Add a method what to happen when Addon is installed
browser.runtime.onInstalled.addListener(handleInstalled);

// Add a method what to happen when browser starts
browser.runtime.onStartup.addListener(handleStartup);

// Add a method when a alarm is triggerd
browser.alarms.onAlarm.addListener(handleAlarm);


// Create the basic notification
function createNoti(){

browser.notifications.create(cakeNotification, {
    "type": "basic",
    "iconUrl": browser.extension.getURL("icon.jpeg"),
    "title": "Time for cake!",
    "message": "Something something cake"
  });

}

// when the alarm is triggerd print the alarm name and create the notification call
function handleAlarm(alarmInfo) {
  console.log("on alarm: " + alarmInfo.name);
	createNoti();
}



// Method handling when the browser starts
function handleStartup() {

console.log('inside the handleStartup');

const when = nearestMin30();

browser.alarms.create("my-periodic-alarm-startup", {
  periodInMinutes
});

console.log('next alarm at ::::'+when);

}

// Method to handle when the addon is installed
function handleInstalled(details) {

console.log('inside the handleInstalled');
const when = nearestMin30();

/*browser.alarms.create("my-periodic-alarm-install", {
  //when,
  //Date.now(),
  periodInMinutes
});*/


console.log('next alarm at ::::'+when+" and the current is::::"+new Date().getTime());

}


// Finding the nearest 30 Mins 
function nearestMin30(){

	console.log("inside neastestMin3o");

    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();

    var timeToSend = 0;

	if(minutes>=0 && minutes<=29){
		now.setMinutes(30);
		timeToSend = now.getTime();
	}
	else if(minutes>=30 && minutes<=59){
		//now.setHours(now.getHours()+1);
		now.setMinutes(35);
		timeToSend = now.getTime();
	}
console.log("we are going to send:::::::"+timeToSend); 
	return timeToSend;
}

//console.log(document.getElementById("INPUT").value);
