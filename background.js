
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
