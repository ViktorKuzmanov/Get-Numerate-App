if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker.register("/sw.js");
	});
}

// if (location.protocol !== "https:") {
// 	location.replace(`https:${location.href.substring(location.protocol.length)}`);
// }
