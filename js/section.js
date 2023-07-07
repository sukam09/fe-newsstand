var rolling = document.querySelector(".rolling > ul");

window.setInterval( function () {
	rolling.style.transitionDuration = "400ms";
	rolling.style.marginTop = "-16px";

	window.setTimeout( function () {
		rolling.removeAttribute("style");         
		rolling.appendChild(rolling.firstElementChild);
	}, 400);
}, 2000);