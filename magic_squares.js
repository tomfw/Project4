var previousValue = 0;
var relaxed = false;
var magic = false;

$(document).ready(function() {
	initializeBoard();
	calculateTotals();
});

function userBeganEditing(row, column) {
	previousValue = valueOfCell(row,column);
}

function userFinishedEditing(row, column) {
	var newValue = valueOfCell(row,column);
	if(newValue > 9 || newValue < 1) {
		setValueOfCell(row,column, previousValue);
	} else {
		
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
			
				if(! (i == row && j == column)) {
				
					if(valueOfCell(i,j) == newValue) {
						setValueOfCell(i,j,previousValue);
					}
					
				}
				
			}
		}
		calculateTotals();
	}
}

function calculateTotals() {
	var lastTotal = 0;
	relaxed = true;
	magic = true;
	
	for(var i = 0; i < 3; i++) {
		var rowTotal = totalForRow(i);
		var colTotal = totalForColumn(i);
		
		if(rowTotal != colTotal) {
			relaxed = false;
		} else if (i != 0) {
			if(rowTotal != lastTotal) {
				relaxed = false;
			}
		}
		lastTotal = rowTotal;
		
		$fieldNamed("ROW" + i).val(rowTotal);
		$fieldNamed("COL" + i).val(colTotal);
	}
	var diagTotal = valueOfCell(0,0) + valueOfCell(1,1) + valueOfCell(2,2);
	if(diagTotal != lastTotal || relaxed != true) {
		magic = false;
	}
	$fieldNamed("DIAG").val(diagTotal);
	win();
}

function win() {
	$('img').hide();
	
	if(relaxed == true) {
		$('img:first').show();
	}
	if(magic == true) {
		$('img:last').show();
	}
}

function totalForRow(row) {
	var total=0;
	for(var i = 0; i < 3; i++) {
		total += valueOfCell(i, row);
	}
	return total;
}

function totalForColumn(col) {
	var total=0;
	for(var i = 0; i < 3; i++) {
		total += valueOfCell(col, i);
	}
	return total;
}

function initializeBoard() {
	list = listOfNumbers(1, 9);
	for(var i = 0; i < 3; i++) {
		for(var j = 0; j < 3; j++) {
			var index = randomInt(0, list.length - 1);
			setValueOfCell(i,j,list[index]);
			list.splice(index, 1);
		}
	}
}
function print(string) {
	$('body').append(string);
}

function listOfNumbers(start, end) {
	var list = [];
	for(var i = start; i <= end; i++) {
		list.push(i);
	}
	return list;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function $fieldNamed(name) {
	return $("input[name="+name+"]");
}

function setValueOfCell(row,column,value) {
	$(getInputString(row,column)).val(value);
}

function valueOfCell(row, column) {
	return parseInt($(getInputString(row,column)).val());
}

function getInputString(row, column) {
	var cellId= row + (column * 3);
	return 'input[name='+cellId+']';
}