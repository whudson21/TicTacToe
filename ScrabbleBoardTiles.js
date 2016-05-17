"use strict";

/**
 * scrabbleTiles - This function will load up a tile with its given letter and value
 * @constructor
*/
function ScrabbleTile(){
	//Instance Variables
	//Store the letter and value
	this.tileObj = {letter: "", val: -1};
}

/**
 * setValue - This method will store the information of a tile (Its letter and point value)
 * @param {char} - The letter value of the tile
*/
ScrabbleTile.prototype.setValue = function(letter){
	//Set the appropriate letter
	this.tileObj.letter = letter;
	this.tileObj.val = (function(letter){
		//Determine the appropriate value for the letter
		if(letter == " ")
			return 0;
		else if(["A", "E", "I", "L", "N", "O", "R", "S", "T", "U"].indexOf(letter) != -1)
			return 1;
		else if(["D", "G"].indexOf(letter) != -1)
			return 2;
		else if(["B", "C", "M", "P"].indexOf(letter) != -1)
			return 3;
		else if(["F", "H", "V", "Y"].indexOf(letter) != -1)
			return 4;
		else if(letter == "K")
			return 5;
		else if(["J", "X"].indexOf(letter) != -1)
			return 8;
		else if(["Q", "Z"].indexOf(letter) != -1)
			return 10;
	}(letter));
};

/**
 * getChar - This method will return the letter of a tile
 * @param {object} - A tile object to extract the letter
 * @return {char} - The letter that corresponds to the tile
*/
ScrabbleTile.prototype.getLetter = function(tile){
	return tile.letter;
};

/**
 * getPointVal - This method will return the value of a tile
 * @param {object} - A tile object to extract the value
 * @return {number} - The value that corresponds to the tile
*/
ScrabbleTile.prototype.getPointVal = function(tile){
	return tile.val;
};