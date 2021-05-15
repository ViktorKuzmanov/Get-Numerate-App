if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker.register("/sw.js/").then(() => console.log("service worker registered"));
	});
}
