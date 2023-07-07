const setRollingEvent = function(rollingElement){
	window.setInterval( function () {
		rollingElement.style.transitionDuration = "400ms";
		rollingElement.style.marginTop = "-16px";
	
		window.setTimeout( function () {
			rollingElement.removeAttribute("style");         
			rollingElement.appendChild(rollingElement.firstElementChild);
		}, 400);
	}, 2000);
}

let rolling = document.querySelectorAll(".rolling > ul");
rolling.forEach(elem => setRollingEvent(elem));