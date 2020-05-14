const COLUMNS = 8;
const ROWS = 3;
const DEFAULT_SESSION = 25; /* Minutes */
const MAX_SESSION = 60;
const SECONDS = "00";
const DEFAULT_BREAK = 5; /* Minutes */
const MAX_BREAK = 15;
const ONE_SECOND = 1000;
var go;

function createGrid(){
	let divGrid = getGridContainer();
	divGrid.setAttribute("style", "grid-template-columns: repeat(" + COLUMNS + ", 1fr); \
									grid-template-rows: repeat(" + ROWS + ", 1fr);");
	populateGrid(DEFAULT_SESSION, DEFAULT_BREAK, divGrid);
	setOnClickEvents();
	setButtonsOnClickEvents();
}

function getGridContainer(){ return document.getElementById("grid"); }

function populateGrid(sessionMinutes, breakMinutes, whatGrid){
	buttons = createButtons();
	for(let i = 0; i < buttons.length; i++){
		whatGrid.appendChild(buttons[i]);
	}
	config = createConfiguration(sessionMinutes, breakMinutes);
	for(let i = 0; i < config.length; i++){
		whatGrid.appendChild(config[i]);
	}
	display = createDisplay();
	for(let i = 0; i < display.length; i++){
		whatGrid.appendChild(display[i]);
	}
}

function createButtons(){
	let buttons = [];
	let divRun = document.createElement("div");
	let btnRun = document.createElement("button");
	btnRun.setAttribute("id", "buttonRun");
	btnRun.innerHTML = "START";
	divRun.appendChild(btnRun);
	buttons.push(divRun);
	let divStop = document.createElement("div");
	let btnStop = document.createElement("button");
	btnStop.setAttribute("id", "buttonStop");
	btnStop.innerHTML = "STOP";
	divStop.appendChild(btnStop);
	buttons.push(divStop);

	let columnStart = 2;
	let columnEnd = columnStart + 3;
	for(let i = 0; i < buttons.length; i++){
		buttons[i].setAttribute("class", "cell");
		buttons[i].setAttribute("style", "grid-column-start:" + columnStart +" ;\
										grid-column-end:" + columnEnd + ";\
										grid-row-start: 1;\
										grid-row-end: 2;");
		columnStart += 3;
		columnEnd = columnStart + 3;
	}

	return buttons;
}

function createConfiguration(sessionMinutes, breakMinutes){
	let config = []
	let divSession = document.createElement("div");
	let h3Session = document.createElement("h3");
	h3Session.setAttribute("id", "h3Session");
	h3Session.innerHTML = "SESSION :";
	divSession.appendChild(h3Session);
	config.push(divSession);
	let divSessionMinutes = document.createElement("div");
	let divSMinutesMinus = document.createElement("div");
	let divSMinutes = document.createElement("div");
	let divSMinutesPlus = document.createElement("div")
	let h2SMinutesMinus = document.createElement("h2");
	let h3SMinutes = document.createElement("h3");
	let h2SMinutesPlus = document.createElement("h2");
	h2SMinutesMinus.setAttribute("id", "h2SMinutesMinus");
	h2SMinutesMinus.innerHTML = "-";
	h3SMinutes.setAttribute("id", "h3SMinutes");
	h3SMinutes.innerHTML = sessionMinutes;
	h2SMinutesPlus.setAttribute("id", "h2SMinutesPlus");
	h2SMinutesPlus.innerHTML = "+";
	divSMinutesMinus.appendChild(h2SMinutesMinus);
	divSMinutes.appendChild(h3SMinutes);
	divSMinutesPlus.appendChild(h2SMinutesPlus);
	divSessionMinutes.appendChild(divSMinutesMinus);
	divSessionMinutes.appendChild(divSMinutes);
	divSessionMinutes.appendChild(divSMinutesPlus);
	config.push(divSessionMinutes);

	let divBreak = document.createElement("div");
	let h3Break = document.createElement("h3");
	h3Break.setAttribute("id", "h3Break");
	h3Break.innerHTML = "BREAK : ";
	divBreak.appendChild(h3Break);
	config.push(divBreak);
	let divBreakMinutes = document.createElement("div");
	let divBMinutesMinus = document.createElement("div");
	let divBMinutes = document.createElement("div");
	let divBMinutesPlus = document.createElement("div")
	let h2BMinutesMinus = document.createElement("h2");
	let h3BMinutes = document.createElement("h3");
	let h2BMinutesPlus = document.createElement("h2");
	h2BMinutesMinus.setAttribute("id", "h2BMinutesMinus");
	h2BMinutesMinus.innerHTML = "-";
	h3BMinutes.setAttribute("id", "h3BMinutes");
	h3BMinutes.innerHTML = breakMinutes;
	h2BMinutesPlus.setAttribute("id", "h2BMinutesPlus");
	h2BMinutesPlus.innerHTML = "+";
	divBMinutesMinus.appendChild(h2BMinutesMinus);
	divBMinutes.appendChild(h3BMinutes);
	divBMinutesPlus.appendChild(h2BMinutesPlus);
	divBreakMinutes.appendChild(divBMinutesMinus);
	divBreakMinutes.appendChild(divBMinutes);
	divBreakMinutes.appendChild(divBMinutesPlus);
	config.push(divBreakMinutes);

	let columnStart = 0;
	let columnEnd = 2;
	for(let i = 0; i < config.length; i++){
		columnStart = columnEnd;
		if(i % 2 == 0){
			columnEnd += 2;
		}else{
			columnEnd += 1;
		}

		config[i].setAttribute("class", "cell");
		config[i].setAttribute("style", "grid-column-start:" + columnStart +" ;\
										grid-column-end:" + columnEnd + ";\
										grid-row-start: 2;\
										grid-row-end: 3;");
	}

	return config;
}

function createDisplay(){
	let display = [];
	let divWorkBreak = document.createElement("div");
	let h2WorkBreak = document.createElement("h2");
	h2WorkBreak.setAttribute("id", "h2WorkBreak");
	h2WorkBreak.innerHTML = "WORK";
	divWorkBreak.appendChild(h2WorkBreak);
	display.push(divWorkBreak);
	let divTime = document.createElement("div");
	let h1Time = document.createElement("h1");
	h1Time.setAttribute("id", "h1Time");
	h1Time.innerHTML = DEFAULT_SESSION + ":" + SECONDS;
	divTime.appendChild(h1Time);
	display.push(divTime);

	let columnStart = 2;
	let columnEnd = 4;
	for(let i = 0; i < display.length; i++){
		display[i].setAttribute("class", "cell");
		display[i].setAttribute("style", "grid-column-start:" + columnStart +" ;\
										grid-column-end:" + columnEnd + ";\
										grid-row-start: 3;\
										grid-row-end: 4;");
		columnStart = columnEnd;
		columnEnd *= 2;
	}

	return display;
}

function setOnClickEvents(){
	let plusSession = document.getElementById("h2SMinutesPlus");
	plusSession.setAttribute("onclick", "plusSession()");
	let minusSession = document.getElementById("h2SMinutesMinus");
	minusSession.setAttribute("onclick", "minusSession()");
	let plusBreak = document.getElementById("h2BMinutesPlus");
	plusBreak.setAttribute("onclick", "plusBreak()");
	let minusBreak = document.getElementById("h2BMinutesMinus");
	minusBreak.setAttribute("onclick", "minusBreak()");
}

function plusSession(){
	let sessionMinutesObj = getSessionMinutes();
	let number = Number(sessionMinutesObj.innerHTML);
	if(number < MAX_SESSION){
		number++;
		sessionMinutesObj.innerHTML = number;
		let h1Time = document.getElementById("h1Time");
		h1Time.innerHTML = number + ":" + SECONDS;
	}

}

function minusSession(){
	let sessionMinutesObj = getSessionMinutes();
	let number = Number(sessionMinutesObj.innerHTML);
	if(number > DEFAULT_SESSION){
		number--;
		sessionMinutesObj.innerHTML = number;
		let h1Time = document.getElementById("h1Time");
		h1Time.innerHTML = number + ":" + SECONDS
	}
}

function plusBreak(){
	let breakMinutesObj = getBreakMinutes();
	let number = Number(breakMinutesObj.innerHTML);
	if(number < MAX_BREAK){
		number++;
		breakMinutesObj.innerHTML = number;
	}

}

function minusBreak(){
	let breakMinutesObj = getBreakMinutes();
	let number = Number(breakMinutesObj.innerHTML);
	if(number > DEFAULT_BREAK){
		number--;
		breakMinutesObj.innerHTML = number;
	}
}

function getSessionMinutes(){ return document.getElementById("h3SMinutes"); }
function getBreakMinutes(){ return document.getElementById("h3BMinutes"); }

function setButtonsOnClickEvents(){
	let buttonStart = document.getElementById("buttonRun");
	let buttonStop = document.getElementById("buttonStop");
	buttonStart.setAttribute("onclick", "startSession()");
	buttonStop.setAttribute("onclick", "stopSession()");
}

function startSession(){
	let h2WorkBreak = document.getElementById("h2WorkBreak");
	h2WorkBreak.innerHTML = "WORK";
	let h1Time = document.getElementById("h1Time");
	let str = h1Time.innerHTML;
	let minutes = str[0] + str[1];
	let seconds = str[3] + str[4];
	go = true;

	window.setInterval(function(){
		if(go){
			seconds--;

			if(minutes == 0 && seconds == 0){
				startBreak();
			}

			if(seconds < 0){
				seconds = 59;
				minutes--;
			}else if (seconds < 10) {
				seconds = "0" + seconds;
			}

			h1Time.innerText = minutes + ":" + seconds;
		}
	}, ONE_SECOND);
}

function startBreak(){
	let h2WorkBreak = document.getElementById("h2WorkBreak");
	h2WorkBreak.innerHTML = "BREAK";
	let breakMinutesObj = getBreakMinutes();
	let str = breakMinutesObj.innerHTML;
	let minutes = str;
	let seconds = "00";
	go = true;

	window.setInterval(function(){
		if(go){
			seconds--;

			if(minutes == 0 && seconds == 0){
				startSession();
			}

			if(seconds < 0){
				seconds = 59;
				minutes--;
			}else if (seconds < 10) {
				seconds = "0" + seconds;
			}

			h1Time.innerText = minutes + ":" + seconds;
		}
	}, ONE_SECOND);
}

function stopSession(){
	go = false;
	let sessionMinutesObj = getSessionMinutes();
	let h2WorkBreak = document.getElementById("h2WorkBreak");
	h2WorkBreak.innerHTML = "WORK";
	let h1time = document.getElementById("h1Time");
	h1time.innerHTML = sessionMinutesObj.innerHTML + ":" + SECONDS;
}

createGrid();
