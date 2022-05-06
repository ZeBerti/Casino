	var credit = document.getElementById("credit").value;
	var GREEN = 0;
	var RED = 1;
	var BLACK = 2;
	var betOnColor = -1
	var lastColor = -1;
	var lastNumber = -1;
	var placedBet = 0;
	
	// auto
	var countLoops = 0;
	var maxCredit = credit;
	var maxBet = placedBet;
	var credits = [];
	var bets = [];
	var numbers = [];