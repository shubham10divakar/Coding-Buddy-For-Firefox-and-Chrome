const KEY_DATA = "data";
var cakeNotification = "cake-notification";
function getObject(key) {
  return JSON.parse(localStorage.getItem(key));
}

document.getElementById("submit_btn").addEventListener("click", function(){
	var x=document.getElementById("myDIV");
	if(localStorage.getItem("e1")!= null && localStorage.getItem("l1")!= null && localStorage.getItem("t1")!= null){
		var event_name=document.getElementById("ename").value.toString();
		var event_link=document.getElementById("link").value.toString();
		var notification_frequency=document.getElementById("notification_frequency").value.toString();
		if (x.style.display === "none") {
			x.style.display = "block";
		} 
		else {
			x.style.display = "none";
		}
	}
	else{
		
		/*var event_name=document.getElementById("ename").value.toString();
		var event_link=document.getElementById("link").value.toString();
		var notification_frequency=document.getElementById("notification_frequency").value.toString();

		if(event_name!="" && event_link!="" && notification_frequency!=""){
			setObject("e1",event_name);
			setObject("l1",event_link);
			setObject("t1",notification_frequency);
		}
		else{
			
		}
  
  
		browser.notifications.create(cakeNotification, {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icon.jpeg"),
			"title": "Time for cake!",
		"message": localStorage.getItem("ln")+"Something something cake"+localStorage.getItem("ln")
		});
		*/
	}
}); 

function setObject(key, value) {
  localStorage.setItem(key, value);
}