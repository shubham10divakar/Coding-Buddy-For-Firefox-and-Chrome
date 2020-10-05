var urlList = [];

mineHistory();

function mineHistory() {

  var searching = browser.history.search({
    text: "https://www.youtube.com/watch?v=",
    startTime: 0
  });
  searching.then(onGot);
}

function onGot(historyItems) {
  for (item of historyItems) {



    var videoId = getParameterByName('v', item.url);


    var containsVal = urlList.includes(videoId)
    if (!containsVal) {
        urlList.push(videoId);
        var urlToDisp = document.createElement('div');
        urlToDisp.textContent = item.title;
        urlToDisp.id = item.url;
        urlToDisp.className = "videolink";
	urlToDisp.setAttribute("style"," border: none;color: black;padding: 10px 20px;  text-decoration: none; display: inline-block; font-size: 14px; margin: 4px ; cursor: pointer;  max-width: inhert");
        //document.getElementById('showurl').appendChild(urlToDisp);
    }

  }


}

// Get the  video id
function getParameterByName(name, url) {

  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener("click", function(e) {
	
console.log('inside click');   


if (!e.target.classList.contains("beast")  && !e.target.classList.contains("videolink")) {
     return;
   }


var action = '';
	if (e.target.classList.contains("beast")){
		action = 'controls';
	}else if (e.target.classList.contains("videolink")){
                action = 'changevid';
        }


         browser.runtime.sendMessage({"actionid": e.target.id, "actiondefined":action});
});
