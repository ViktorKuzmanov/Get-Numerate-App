// put cursor on result input
var num1;
var num2;

generateRandomNumbersBasedOnDigits();
updateUIwithQuestion();

function generateRandomNumbersBasedOnDigits() {
	function checkIfOperationMakesSense(num1, num2) {
		// Check if operation is possible . You cannot devide by zero or "1 - 20"
		if (num1 < num2) {
			var temporaryNum1 = num1;
			this.num1 = num2;
			this.num2 = temporaryNum1;
		}
	}
	// get digits of num1 and num2 from localStorage
	const currentOperation = localStorage.getItem("currentOperation");
	const getChosenDigitsString = localStorage.getItem(currentOperation + "Digits");
	const getChoseDigitsJsObject = JSON.parse(getChosenDigitsString);
	const num1Digits = getChoseDigitsJsObject["firstNumDigit"];
	const num2Digits = getChoseDigitsJsObject["secondNumDigit"];
	num1 = generateOneNumWithDigits(parseInt(num1Digits));
	num2 = generateOneNumWithDigits(parseInt(num2Digits));
	checkIfOperationMakesSense(num1, num2);
	function generateOneNumWithDigits(digits) {
		var randomNum;
		switch (digits) {
			case 1:
				var max = 10;
				var min = 1;
				randomNum = Math.random() * (max - min) + min;
				break;
			case 2:
				var max = 100;
				var min = 10;
				randomNum = Math.random() * (max - min) + min;
				break;
			case 3:
				var max = 1000;
				var min = 100;
				randomNum = Math.random() * (max - min) + min;
				break;
			default:
				break;
		}
		return parseInt(randomNum);
	}
}

function updateUIwithQuestion() {
	const currentOperation = localStorage.getItem("currentOperation");
	switch (currentOperation) {
		case "All operations":
			const allOperationArray = ["Addition", "Subtraction", "Multiplication", "Division"];
			const randomNum = Math.floor(Math.random() * 4);
			updateUINumbersAndOperation(allOperationArray[randomNum]);
			break;
		case "Percentages":
			break;
		default:
			// + - * /
			updateUINumbersAndOperation(currentOperation);
			break;
	}
	function updateUINumbersAndOperation(currentOperation) {
		const spanTextBefore = document.getElementById("textInMiddle");
		const num1Span = document.getElementById("num1");
		const num2Span = document.getElementById("num2");
		num1Span.innerText = this.num1;
		num2Span.innerText = this.num2;
		switch (currentOperation) {
			case "Addition":
				spanTextBefore.innerText = "+";
				break;
			case "Subtraction":
				spanTextBefore.innerText = "-";
				break;
			case "Multiplication":
				spanTextBefore.innerText = "*";
				break;
			case "Division":
				spanTextBefore.innerText = "/";
				break;
			default:
				// + - * /
				break;
		}
	}
}

document.getElementById("result").focus();
document.getElementById("result").select();
function goBack() {
	window.history.back();
}
function addNumber(element) {
	document.getElementById("result").value = document.getElementById("result").value + element.value;
}
function checkIfResultIsCorrect() {
	// check if the result of operations or percentage is correct
	generateRandomNumbersBasedOnDigits();
	updateUIwithQuestion();
}
