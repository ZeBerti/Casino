var credit = getCredit();
var GREEN = 0;
var RED = 1;
var BLACK = 2;
var betOnColor = -1
var lastColor = -1;
var lastNumber = -1;
var placedBet = 0;

// auto
var enterCode = "&#13;&#10";
var countLoops = 0;
var maxCredit = credit;
var maxBet = placedBet;
var credits = [];
var bets = [];
var numbers = [];

var log = document.getElementById("log");
log.addEventListener("keypress", logKeypressEvent);
log.addEventListener("keyup", logKeyupEvent);
log.addEventListener("focus", onfocus);


function onfocus(){
	log.selectionStart = log.value.length;
	log.selectionStart = log.value.length;	
}

function logKeypressEvent(event){
	var log = document.getElementById("log");
	var lines = log.value.split();
		
	if(event.keyCode === 13){
		doCommand(log.value);
	}

}

function doCommand(command) {
	console.log("command is " + command);
	var cmd = command.toLowerCase();
	
	if (cmd.indexOf("clear")){
		//log.value = "test";
		log.innerHTML = "test--";
		doLog("test2");
	}else if(command.toLowerCase().indexOf("felix") != -1){
		console.log("what retarded name");
		doLog("what retarded name");
	} else {
		console.log("what?");
		doLog("what?");
	}
}

function logKeyupEvent(event){
	var log = document.getElementById("log");
	if(event.keyCode === 13){
		log.value += " > ";
	}	
}

function loginputEvent(){
	var logcontent = document.getElementById("log").value;
	var lastSymbol = logcontent.substr(logcontent.length - 1);
	console.log(lastSymbol);

}

function turnBlack(){
	placedBet = document.getElementById("placedBet").value
	if(checkEnougMoney()){
		betOnColor = BLACK;
		doLog("You bet " + placedBet + " on black");
		turn();
	}	
}

function turnRed(){
	placedBet = document.getElementById("placedBet").value
	if(checkEnougMoney()){
		betOnColor = RED;
		doLog("You bet " + placedBet + " on red");
		turn();
	}
}

function checkEnougMoney(){
	placedBet = parseInt(document.getElementById("placedBet").value);
	if(getCredit() >= placedBet) {
		return true;
	}
	doLog("You do not have enough credit");
	doLog(getCredit());
	doLog(placedBet);
	displayStats();
	return false;
}

function disableButtons(){
	var buttons = document.getElementsByClassName("turnButton");
	for (i = 0; i < buttons.length; i++) {
		buttons[i].disabled=true;
	}
}

function doLog(text) {
	var logTextarea = document.getElementById("log")
	logTextarea.innerHTML += text + "&#13;&#10 > ";
	//logTextarea.value += text + "\n > ";
	logTextarea.scrollTop = logTextarea.scrollHeight;	
	
}

function enableButtons(){
	var buttons = document.getElementsByClassName("turnButton");
	for (i = 0; i < buttons.length; i++) {
		buttons[i].disabled=false;
	}
}

function doubleBet(){
	var factorElem = document.getElementById("factor");
	var factor=2;
	if(factorElem!=null)
		factor = document.getElementById("factor").value;
	
	placedBet = document.getElementById("placedBet").value *= factor;
	
	if(credit <= 0) {
		doLog("You are broke"); 
		let domCollection = document.getElementsByClassName("money");
		for (var i=0; i < domCollection.length; i++) {
			domCollection[i].classList.remove("rich");
			domCollection[i].classList.add("broke");
		}
	}
	else if(credit >= placedBet)
		document.getElementById("placedBet").value = placedBet;
	else {
		doLog("Bet can't be doubled");
		document.getElementById("placedBet").value = credit;
	}

	
	if(placedBet > maxBet)
		maxBet = placedBet;
}

function setBetToOne(){
	placedBet = 1;
	document.getElementById("placedBet").value = placedBet;
	
}

function resetStats(){
	credit = 50;
	maxCredit = credit;
	numbers = [];
	credits = [];
	bets = [];
}

function getCredit(){
	return document.getElementById("credit").value;
}

function turnAutomated(){
	credit = getCredit();
	countLoops = 0;
	turnRed();
}

function increaseTurnCounter() {
    // ToDo turn-counter seems to be a non existing element
	let turnCounter = -1; //parseInt(document.getElementById("turn-counter").innerHTML) + 1;
	//document.getElementById("turn-counter").innerHTML = turnCounter;
}

function turn(){
	
	placedBet = document.getElementById("placedBet").value;
	
	increaseTurnCounter();
	startAnimation();
					
	makeBet(placedBet);
	bets.push(placedBet);
	displayCredit();
	disableButtons();
	setTimeout(function(){ 
		document.getElementById("lastnumberdiv").className="unbleached";
		stopAnimation();
		lastNumber = Math.floor(Math.random() * 37);
		numbers.push(lastNumber);
		lastColor = getColorEnum(lastNumber);
		doLog("Ball stops on " + lastNumber + " " + getColor(lastNumber));
		displayNumber(lastNumber);
	
		enableButtons();
		calcNewCredit();
		
		var restLoops = document.getElementById("maxLoopsInput").value;
		document.getElementById("maxLoopsInput").value = restLoops-1;
		if(restLoops > 1){
			turnRed();
			countLoops++;
		} else {
			doLog("End after " + countLoops + " bets");
			displayStats();
		}
	}, document.getElementById("timeBetweenBets").value);
}

function displayStats(){
	doLog("Numbers History: " + numbers);
	doLog("Credit History: " + credits);
	doLog("Bet History: " + bets);
	doLog("max Credit: " + maxCredit);
	doLog("max Bet: " + maxBet);

}

function getColorEnum(number){
	var className;
	if(number==0){
		className=GREEN
	} else if(number%2==0){
		className=RED;
	} else {
		className=BLACK;
	}
	return className;
}


function makeBet(betAmount){
	credit-=betAmount;
}

function displayNumber(num){
	var elem=document.getElementById("lastnumber").innerHTML=num;
	displayColor(num);
}

function calcNewCredit(){
	placedBet = document.getElementById("placedBet").value
	credits.push(credit);
	if(lastColor==betOnColor){
		credit += placedBet * 2;
		if(credit > maxCredit)
			maxCredit = credit;
		doLog("You won " + placedBet);
		setBetToOne();
	} else {
		doLog("You lost " + placedBet);
		doubleBet();
	}
	displayCredit();
}


function  getColor(number){
	var className;
	if(number==0){
		className="green";
	} else if(number%2==0){
		className="red";
	} else {
		className="black";
	}
	return className;
}

function displayCredit(){
	document.getElementById("credit").value = credit;
	document.getElementById("credit").innerHTML = credit;
}

function displayColor(number){
	var className = getColor(number);
	var elem=document.getElementById("lastnumber").className=className;
}

function startAnimation(){
	document.getElementById("rouletteImg").className="invisible"
	document.getElementById("turngif").className="visible"
}

function stopAnimation(){
	document.getElementById("turngif").className="invisible"
	document.getElementById("rouletteImg").className="visible"
}