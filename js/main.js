const COLUMNS = 8;
const ROWS = 3;
const DEFAULT_SESSION = 25; /* Minutes */
const DEFAULT_BREAK = 5; /* Minutes */

function createGrid(){
	let divGrid = getGridContainer();
	divGrid.setAttribute("style", "grid-template-columns: repeat(" + COLUMNS + ", 1fr); \
									grid-template-rows: repeat(" + ROWS + ", 1fr);");
	populateGrid(DEFAULT_SESSION, DEFAULT_BREAK, divGrid);
}

function getGridContainer(){ return document.getElementById("grid"); }

function populateGrid(sessionMinutes, breakMinutes, whatGrid){
	buttons = createButtons();
	for(let i = 0; i < buttons.length; i++){
		whatGrid.appendChild(buttons[i]);
	}
}

function createButtons(){
	let buttons = []
	let btnPause = document.createElement("button");
	btnPause.setAttribute("id", "buttonPause");
	btnPause.innerHTML = "PAUSE";
	buttons.push(btnPause);
	let btnRun = document.createElement("button");
	btnRun.setAttribute("id", "buttonRun");
	btnRun.innerHTML = "START";
	buttons.push(btnRun);
	let btnStop = document.createElement("button");
	btnStop.setAttribute("id", "buttonStop");
	btnStop.innerHTML = "STOP";
	buttons.push(btnStop);

	let columnStart = 2;
	let columnEnd = columnStart + 2;
	for(let i = 0; i < buttons.length; i++){
		buttons[i].setAttribute("style", "grid-column-start:" + columnStart +" ;\
										grid-column-end:" + columnEnd + ";\
										grid-row-start: 1;\
										grid-row-end: 2;");
		columnStart += 2;
		columnEnd = columnStart + 2;
	}

	return buttons;
}

createGrid();
