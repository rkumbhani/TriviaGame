$(document).ready(function() {
    
// create a function for start screen
function initialScreen() {
	startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$(".mainContent").html(startScreen);
}

initialScreen();

// create a function for generateHTML() for after the start button is clicked
$("body").on("click", ".start-button", function(event){
	event.preventDefault();  // added line to test issue on GitHub Viewer
	generateHTML();
	timerWrapper();

}); // close start-button click

$("body").on("click", ".answer", function(event){
	// when answeredQuestion = true;
	selectedAnswer = $(this).text();
    
	if(selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(theTimer);
		generateWin();
	}
    
	else {
		clearInterval(theTimer);
		generateLoss();
	}
    
}); // close .answer click

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); // close reset-button click

});  //  close document ready wrapper

// functions for what happens after timeout, correct answer, and incorrect answer
function generateLossDueToTimeOut() {
	scoreUnanswered++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time's up!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
	$(".mainContent").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateWin() {
	scoreCorrect++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".mainContent").html(gameHTML);
	setTimeout(wait, 4000);  //  change to 4000 or other amount
}

function generateLoss() {
	scoreIncorrect++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
	$(".mainContent").html(gameHTML);
	setTimeout(wait, 4000); //  change to 4000 or other amount
}

// function to generate the html that shows for the questions from arrays
function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionList[questionCounter] + "</p><p class='first-answer answer'>A. " + answerList[questionCounter][0] + "</p><p class='answer'>B. "+answerList[questionCounter][1]+"</p><p class='answer'>C. "+answerList[questionCounter][2]+"</p><p class='answer'>D. "+answerList[questionCounter][3]+"</p>";
	$(".mainContent").html(gameHTML);
}

// sets the number of questions to 8 and shows the final screen after last q
function wait() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timerWrapper();
	}
	else {
		finalScreen();
	}
}

// function to create the timer
function timerWrapper() {
	theTimer = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(theTimer);
			generateLossDueToTimeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}

// function to show the scoring in the html 
function finalScreen() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + scoreCorrect + "</p>" + "<p>Wrong Answers: " + scoreIncorrect + "</p>" + "<p>Unanswered: " + scoreUnanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset Trivia!</a></p>";
	$(".mainContent").html(gameHTML);
}

// function to restart the quiz when finished
function resetGame() {
	questionCounter = 0;
	scoreCorrect = 0;
	scoreIncorrect = 0;
	scoreUnanswered = 0;
	counter = 30;
	generateHTML();
	timerWrapper();
}

// create vars for the start screen and counter
var startScreen;
var gameHTML;
var counter = 30;

// question library
var questionList = [
    "What year was the first national park established?", 
    "Which one of these parks is not located in California?", 
    "Which national park has the highest number of recreational visitors?", 
    "How many caves does Carlsbad Caverns National Park in New Mexico have?", 
    "Which Alaskan park holds the record for the largest park with approx 8 million acres?", 
    "What is the highest temperature Death Valley, the hottest place in US, has topped in farenheight?", 
    "Which park was most recently established in 2013?", 
    "Which Colorado park freatures some of the steepest cliffs and oldest rock in the US?"];

// note: A, B, C, D not shown here bc they were listed in the function generateHTML
var answerList = [
    ["1868", "1872", "1881", "1886"], 
    ["Great Sand Dunes","Channel Islands","Pinnacles","Lassen Volcanic"], 
    ["Yosemite", "Zion", "Grand Canyon", "Great Smokey Mountains"], 
    ["97","107","117","127"], 
    ["Gates of the Arctic", "Wrangell-St. Elias", "Denali", "Katmai"], 
    ["126","130","134","138"], 
    ["Pinnacles, CA", "Great Sand Dunes, CO", "Congaree, SC", "Saguaro, AZ"], 
    ["Mesa Verde","Great Sand Dunes","Rocky Mountain","Black Canyon of the Gunnison"]];

var correctAnswers = [
    "B. 1872", 
    "A. Great Sand Dunes", 
    "D. Great Smokey Mountains", 
    "C. 117", 
    "B. Wrangell-St. Elias", 
    "B. 130", 
    "A. Pinnacles, CA", 
    "D. Black Canyon of the Gunnison"];

// create vars for the scoring
var questionCounter = 0;
var selecterAnswer;
var theTimer;
var scoreCorrect = 0;
var scoreIncorrect = 0;
var scoreUnanswered = 0;