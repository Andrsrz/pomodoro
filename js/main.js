const COLUMNS = 8;
const ROWS = 3;
const DEFAULT_SESSION = 25; /* Minutes */
const DEFAULT_BREAK = 5; /* Minutes */

function createGrid(){
	let divGrid = getGridContainer();
	divGrid.setAttribute("style", "grid-template-columns: repeat(" + COLUMNS + ", 1fr); \
									grid-template-rows: repeat(" + ROWS + ", 1fr);");
	populateGrid(DEFAULT_SESSION, DEFAULT_BREAK, divGrid);
	setOnClickEvents();
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
	h1Time.innerHTML = "00:00";
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
}

function plusSession(){
	let sessionMinutesObj = getSessionMinutes();
	let number = Number(sessionMinutesObj.innerHTML);
	number++;
	sessionMinutesObj.innerHTML = number;
}

function minusSession(){
	let sessionMinutesObj = getSessionMinutes();
	let number = Number(sessionMinutesObj.innerHTML);
	if(number > DEFAULT_SESSION){
		number--;
		sessionMinutesObj.innerHTML = number;
	}
}

function getSessionMinutes(){ return document.getElementById("h3SMinutes"); }

createGrid();
