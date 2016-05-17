"use strict";
/**
 * scrabbleBoardModel - This function will load up a grid-like board game given its dimensions
 * @constructor
 * @param {number} numRows - The number of rows to add to the grid
 * @param {number} numCols - The number of columns to add to the grid
 * @param {array} boardArray - The array to save the memory of the grid to
*/
function ScrabbleBoardModel(numRows, numCols, boardArray){
	//Instance Variables
	//Dimensions of the board (Default: 10 x 10)
	this.numRows = numRows;
	this.numCols = numCols;
	this.boardArray = boardArray;

	//Keep track of empty spaces
	this.numOfFreeCells = numRows * numCols;

	//Keep track of players
	this.players = [];
	this.numOfPlayers = 0;

	//Keep track of scores
	this.playersScore = [];

	//Keep track of current tiles
	this.playersTiles = [];
	this.MAX_NUM_OF_TILES = 7;
	for(var i = 0; i < this.numOfPlayers; i++){
		this.playersTiles[i] = [];
		for(var j = 0; j < this.MAX_NUM_OF_TILES; j++){
			this.playersTiles[i][j] = new ScrabbleTileModel();
		}
	}

	//Current player turn
	this.currentPlayerTurn = 0;

	//Create the board
	for(var k = 0; k < numRows; k++){
		this.boardArray[k] = [];
		for(var l = 0; l < numCols; l++){
			this.boardArray[k][l] = "";
		}
	}
}

//Assign the methods to the prototype
/**
 * addPlayer - This function will determine if a given move is possible
 * @param {number} row - The location of the row to test
 * @param {number} col - The location of the column to test
 * @return {boolean} - Whether the move is possible or impossible
*/
ScrabbleBoardModel.prototype.addPlayer = function(playerName){
	//Add the player name
	this.players[this.numOfPlayers] = playerName;

	//Set the score default to 0
	this.playersScore[this.numOfPlayers] = 0;

	//Increment by 1
	this.numOfPlayers++;

	alert(playerName + " was added to the game!");
};

ScrabbleBoardModel.prototype.getTileAtPosition = function(row, col){
	return this.boardArray[row][col];
};