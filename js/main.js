const COLUMNS = 8;
const ROWS = 3;
const DEFAULT_SESSION = 25; /* Minutes */
const DEFAULT_BREAK = 5; /* Minutes */

function createGrid(){
	let divGrid = getGridContainer();
	divGrid.setAttribute("style", "grid-template-columns: repeat(" + COLUMNS + ", 1fr); \
									grid-template-rows: repeat(" + ROWS + ", 1fr);");
}

function getGridContainer(){ return document.getElementById("grid"); }

function populateGrid(sessionMinutes, breakMinutes){}

createGrid();
