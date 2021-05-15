if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker.register("/Get-Numerate-App/sw.js").then(() => console.log("service worker registered"));
	});
}
