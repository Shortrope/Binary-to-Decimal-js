// Variables
var answerList=new Array(4);
var binaryString="";
var correct=0;
var decimalNumber=0;
var isBinaryTest=true;
var isKeyboardInput=false;
var masks = [128, 192, 224, 240, 248, 252, 254, 255]; //Can this be a constant?
var maxDecimalValue=15;  //Should I get rid of this? 
var min=0;
var numBinaryDigits=4;
var theAnswer=0;
var wrong=0;
//-----------------------------------------------------------
//Functions
var $ = function(id) { return document.getElementById(id); };

//Get the number of binary digits selected via radio buttons
//Set the isBinaryTest boolean 
var updateNumBinDigits = function() {
	numBinaryDigits = $("numDigits").value;
	if (!$("mask").selected) {
		isBinaryTest = true;
	} else {
		isBinaryTest = false;
	}
};


//Calculates the maximum decimal value using numBinaryDigits global variable
//Sets the maxDecimalValue global variable
//Returns the max decimal value
var updateMaxDecValue = function() { 
	maxDecimalValue = Math.pow(2, numBinaryDigits) - 1;
	//$("maxValue").innerHTML = maxDecimalValue; 
	return maxDecimalValue;
};

//returns a random number between 0 and the max decimal value
var getRandomNumber = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
	//return Math.floor(Math.random() * (max + 1));
}

//formats the decimal number into an eight digit binary string
var createBinaryString = function() {
	var bString = decimalNumber.toString(2);
	var binaryString="";
	for (i=8 - bString.length; i>0; i--) {
		binaryString += "0";
	}
	binaryString += bString;
	return binaryString;
}

//create an array which contains the three random incorrect answers
//the correct answer
//and then sort them in numerical order

var createAnswerList = function() {
	var randNum;
	var randAnswers = new Array();
	randAnswers[0] = decimalNumber;

	for (var i=1; i<=3; i++) {

		do {
			if (isBinaryTest) {
				randNum = getRandomNumber(min, maxDecimalValue);
			} else {
				var j = getRandomNumber(min, 7);
				randNum = masks[j];
			}
		}while (randNum == randAnswers[0] || 
				randNum == randAnswers[1] ||
				randNum == randAnswers[2] ||
				randNum == randAnswers[3]   );
		randAnswers[i] = randNum;
	}
	//sort answers numerically
	randAnswers.sort(function(a,b) {return a-b});
	answerList = randAnswers;
	return randAnswers;
}

//Inserts the binary string into the html
var displayBinaryString = function() {
	for(i=1; i<=8; i++) {
		$("digit"+i).innerHTML = binaryString.charAt(i-1)
	}
}

var setAnswerButtonValues = function() {
	//btnAnswer1 = answerList[0];	
	$("btnAnswer1").value = answerList[0];
	$("btnAnswer2").value = answerList[1];
	$("btnAnswer3").value = answerList[2];
	$("btnAnswer4").value = answerList[3];
};


var checkAnswer = function() {
	var isCorrect = (theAnswer == decimalNumber) ? true : false;
	return isCorrect;
}

var updateStats = function(isCorrect) {
	if (isCorrect) {
		correct++;
		$("review").style.visibility = "hidden";
		$("qna").style.background = "#e2ffe2";
		$("answer").style.borderColor = "#0f0";
		$("thCorrect").style.color = "green";
		$("correct").style.color = "green";
		$("thWrong").style.color = "black";
		$("wrong").style.color = "black";
	} else if (!isCorrect) {
		wrong++;
		$("reviewBinary").innerHTML = binaryString;
		$("reviewCorrectAnswer").innerHTML = decimalNumber;
		$("reviewYourAnswer").innerHTML = theAnswer;
		$("review").style.visibility = "visible";
		$("qna").style.background = "#ffe2e2";
		$("answer").style.borderColor = "#f00";
		$("thCorrect").style.color = "black";
		$("correct").style.color = "black";
		$("thWrong").style.color = "red";
		$("wrong").style.color = "red";
	}
	var myScore = correct / (correct + wrong) * 100;
	$("correct").innerHTML = correct;
	$("wrong").innerHTML = wrong;
	$("score").innerHTML = myScore.toFixed(2);
	$("score").innerHTML = Math.floor(myScore);
}


//
var runTest = function() {
	if (isBinaryTest) {
		decimalNumber = getRandomNumber(min, maxDecimalValue);
	}
	else {
		var i = getRandomNumber(min, 7);
		decimalNumber = masks[i];
	}
	createAnswerList();
	binaryString = createBinaryString();
	displayBinaryString();
	$("answer").focus();
	$("answer").value = "";
	setAnswerButtonValues();
	
}

var reInitGame = function() {
	updateNumBinDigits();
	updateMaxDecValue();
	runTest();
};

//-----------------------------------------------------------------
// Event Liseners

// Auto update Num Binary Digits when the option list changes
$("numDigits").onchange = function() {
	reInitGame();
};


// Switch answer input keyboard/buttons
$("inputSelect").onclick = function() {
	if ( $("answerButtons").style.display == "none") {
		$("answerButtons").style.display = "block"
		$("keyboardInput").style.display = "none";
		$("inputSelect").innerHTML = "Switch to Keyboard Input";
	} else {
		$("answerButtons").style.display = "none";
		$("keyboardInput").style.display = "block";
		$("answer").focus();
		$("inputSelect").innerHTML = "Switch to Button Input";

	}
			
}

// enterSubmit is called from the <form> element in the HTML
function enterSubmit() {
	theAnswer = $("answer").value;
	updateStats(checkAnswer(decimalNumber));
	runTest();
}

// Get answer from button choice
$("btnAnswer1").onclick = function() {
	theAnswer = answerList[0]; 
	updateStats(checkAnswer(decimalNumber));
	runTest();
}
$("btnAnswer2").onclick = function() {
	theAnswer = answerList[1]; 
	updateStats(checkAnswer(decimalNumber));
	runTest();
}
$("btnAnswer3").onclick = function() {
	theAnswer = answerList[2]; 
	updateStats(checkAnswer(decimalNumber));
	runTest();
}
$("btnAnswer4").onclick = function() {
	theAnswer = answerList[3]; 
	updateStats(checkAnswer(decimalNumber));
	runTest();
}


$("clearStats").onclick = function() {
	counter = 0;
	correct = 0;
	wrong = 0;
	$("correct").innerHTML = correct;
	$("wrong").innerHTML = wrong;
	$("score").innerHTML = 0;

	$("review").style.visibility = "hidden";
	$("qna").style.background = "#fff";
	$("answer").style.borderColor = "#eee";
	$("thCorrect").style.color = "black";
	$("correct").style.color = "black";
	$("thWrong").style.color = "black";
	$("wrong").style.color = "black";
	$("answer").focus();
}


//----------------------------------------------------------------------------

//Initialize the game options - remove initGame();
$("4digits").selected = true;
$("answer").value = "";
updateMaxDecValue();

runTest();
