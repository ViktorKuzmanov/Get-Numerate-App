// put cursor on result input
var num1;
var num2;

generateRandomNumbersBasedOnDigits();
updateUIwithQuestion();

function generateRandomNumbersBasedOnDigits() {
	function checkIfOperationMakesSense(number1, number2) {
		// Check if operation is possible . You cannot devide by zero or "1 - 20"
		if (number1 < number2) {
			var temporaryNum1 = number1;
			num1 = number2;
			num2 = temporaryNum1;
		}
		const currentOperation = localStorage.getItem("currentOperation");
		if (currentOperation == "Division") {
			while (num1 % num2 != 0) {
				// there is remainder between num1 / num2 like 31/7=4.4
				generateRandomNumbersBasedOnDigits();
			}
		}
	}
	// ! 1. get digits of num1 and num2 from localStorage
	const currentOperation = localStorage.getItem("currentOperation");
	const getChosenDigitsString = localStorage.getItem(currentOperation + "Digits");
	const getChoseDigitsJsObject = JSON.parse(getChosenDigitsString);
	const num1Digits = getChoseDigitsJsObject["firstNumDigit"];
	const num2Digits = getChoseDigitsJsObject["secondNumDigit"];
	// ! 2. generate 2 random numbers and chekc if operation makes sense
	num1 = generateOneNumWithDigits(parseInt(num1Digits));
	num2 = generateOneNumWithDigits(parseInt(num2Digits));
	checkIfOperationMakesSense(num1, num2);
	function generateOneNumWithDigits(digits) {
		var randomNum;
		switch (digits) {
			case 1:
				var max = 10;
				var min = 2;
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

function updateUIwithPercentageQuestion() {
	// zemi gi izvranite prashanja od local storage
	const chosenPercentageQuestions = localStorage.getItem("percentagesQuestions");
	const percentagesQuestionsJsObject = JSON.parse(chosenPercentageQuestions);
	const odbraniPrasanja = [];
	for (const key in percentagesQuestionsJsObject) {
		// ako e odbrano nekoe prashaje t.e. e true staj go u array
		if (percentagesQuestionsJsObject[key]) {
			odbraniPrasanja.push(key);
		}
	}
	// odberi random prasanje koe kje go postavime od odbranite
	const randomNum = Math.floor(Math.random() * odbraniPrasanja.length);
	const randomOdbranoPrashanje = odbraniPrasanja[randomNum];
	const textBefore = document.getElementById("textBefore");
	const textInMiddle = document.getElementById("textInMiddle");
	const textAfter = document.getElementById("textAfter");
	// update ui with izbranoto prashanje
	switch (randomOdbranoPrashanje) {
		case "firstQuestion":
			textBefore.innerText = "What is ";
			textInMiddle.innerText = "% of";
			textAfter.innerText = " ?";
			break;
		case "secondQuestion":
			textBefore.innerText = "";
			textInMiddle.innerText = " is what percent % of ";
			textAfter.innerText = " ?";
			break;
		case "thrirdQuestion":
			textBefore.innerText = "";
			textInMiddle.innerText = " is ";
			textAfter.innerText = "% of what ?";
			break;
		default:
			break;
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
			updateUINumbersAndOperation("Percentages");
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
			case "Percentages":
				updateUIwithPercentageQuestion();
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
	const resultFromUser = Number(document.getElementById("result").value);
	const currentOperation = localStorage.getItem("currentOperation");
	if (currentOperation == "Percentages") {
		let correctResult = Number(getCorrectResultFromPercentage());
		if (correctResult == resultFromUser) {
			showModal("Correct", correctResult, resultFromUser);
		} else {
			showModal("Wrong", correctResult, resultFromUser);
		}
	} else {
		// proveri za + - * / dali se tocni
		const correctResult = getCorrectResultFromOperation();
		if (resultFromUser === correctResult) {
			showModal("Correct", correctResult, resultFromUser);
		} else {
			showModal("Wrong", correctResult, resultFromUser);
		}
	}
	// generate another question and update ui
	generateRandomNumbersBasedOnDigits();
	updateUIwithQuestion();

	function getCorrectResultFromOperation() {
		const num1 = document.getElementById("num1").innerHTML;
		const num2 = document.getElementById("num2").innerHTML;
		const operation = document.getElementById("textInMiddle").innerText;
		return eval(num1 + operation + num2);
	}

	function getCorrectResultFromPercentage() {
		const num1 = Number(document.getElementById("num1").innerHTML);
		const num2 = Number(document.getElementById("num2").innerHTML);
		const textInMiddle = document.getElementById("textInMiddle").innerText;
		var result = "";
		switch (textInMiddle) {
			case "% of":
				result = (num2 * num1) / 100;
				break;
			case "is what percent % of ":
				result = (100 * num1) / num2;
				break;
			case "is ":
				result = (num1 * 100) / num2;
				break;
			default:
				break;
		}
		return result;
	}
	function showModal(correctOrWrong, correctResult, resultFromUser) {
		const successAlert = document.getElementById("successAlert");
		const dangerAlert = document.getElementById("dangerAlert");
		const modalTitle = document.getElementsByClassName("modal-title")[0];
		const modalDescription = document.getElementsByClassName("modalDescription")[0];
		const textBefore = document.getElementById("textBefore").innerText;
		const textInMiddle = document.getElementById("textInMiddle").innerText;
		const textAfter = document.getElementById("textAfter").innerText;
		const num1 = document.getElementById("num1").innerText;
		const num2 = document.getElementById("num2").innerText;
		if (correctOrWrong === "Correct") {
			modalTitle.textContent = "Correct";
			dangerAlert.style.display = "none";
			successAlert.style.display = "block";
			successAlert.innerText = textBefore + num1 + textInMiddle + num2 + textAfter + " = " + correctResult;
			modalDescription.textContent = "Good Job!";
		} else {
			modalTitle.textContent = "Wrong";
			dangerAlert.style.display = "block";
			successAlert.style.display = "none";
			dangerAlert.innerText = textBefore + num1 + textInMiddle + num2 + textAfter + " = " + resultFromUser;
			modalDescription.textContent = "Correct answer is " + correctResult;
		}
		$("#myModal").modal("toggle");
	}
}
