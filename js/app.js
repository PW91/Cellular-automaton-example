function createElementsForFirstRow() {

	var firstRow = document.querySelectorAll(".row")[0],
		element,
		random,
		i;

	for (i = 0; i <= 500; i++) {

		element = document.createElement("div"),
		random = Math.round(Math.random());

		if (random) {
			element.classList.add("active");
		} else {
			element.classList.add("inactive");
		}

		element.classList.add("element");

		firstRow.appendChild(element);
	}
}

function lastRowElementsStructure() {

	var allRows = document.querySelectorAll(".row"),
		lastRowElements = allRows[allRows.length-1].children,
		lastRowElementsStructureArray = [],
		i;

	for (i = 0; i < lastRowElements.length; i++) {

		if(lastRowElements[i].classList.contains("active")) {
			lastRowElementsStructureArray.push(1);
		} else {
			lastRowElementsStructureArray.push(0);
		}
	}
	return lastRowElementsStructureArray;
}

function neighboursStructure(lastRowElementsStructureArray, i) {
	var leftNeighbour,
		middleNeighbour,
		rightNeighbour;

	if (lastRowElementsStructureArray[i-1] === undefined) {
		leftNeighbour = lastRowElementsStructureArray[lastRowElementsStructureArray.length-1];
	} else {
		leftNeighbour = lastRowElementsStructureArray[i-1];
	}

	middleNeighbour = lastRowElementsStructureArray[i];

	if ((lastRowElementsStructureArray[i+1]) === undefined) {
		rightNeighbour = lastRowElementsStructureArray[0];
	} else {
		rightNeighbour = lastRowElementsStructureArray[i+1];
	}

	return ([leftNeighbour,middleNeighbour,rightNeighbour]).join();
}

function createNextRow() {

	var wrapper = document.querySelector("#wrapper"),
		nextRow = document.createElement("div");
	
	nextRow.classList.add("row");
	return wrapper.appendChild(nextRow);
}

function createElementsForNextRow() {

	var lastRowElementsStructureArray = lastRowElementsStructure(),
		nextRow = createNextRow(),
		element,
		rule,
		i;

	for (i = 0; i <= 500; i++) {

		rule = neighboursStructure(lastRowElementsStructureArray, i);

		element = document.createElement("div");

		switch (rule) {
			case "1,1,1":
				element.classList.add("inactive");
				break;
			case "1,1,0":
				element.classList.add("active");
				break;
			case "1,0,1":
				element.classList.add("active");
				break;
			case "1,0,0":
				element.classList.add("active");
				break;
			case "0,1,1":
				element.classList.add("active");
				break;
			case "0,1,0":
				element.classList.add("inactive");
				break;
			case "0,0,1":
				element.classList.add("inactive");
				break;
			case "0,0,0":
				element.classList.add("active");
				break;
		}

		element.classList.add("element");
		nextRow.appendChild(element);
	}
}

document.addEventListener("DOMContentLoaded", function(){
	createElementsForFirstRow();
	setInterval(createElementsForNextRow, 10);
})