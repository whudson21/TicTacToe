"use strict";

/**
 * TTTModel - This function will load up a grid-like board game given its dimensions
 * @constructor
 * @param {number} numRows - The number of rows to add to the grid
 * @param {number} numCols - The number of columns to add to the grid
 * @param {array} boardArray - The array to save the memory of the grid to
*/

function ConnectFourModel(numRows, numCols, boardArray){
    
    //Instance variables
    this.numRows = numRows;
    this.numCols = numCols;
    this.boardArray = boardArray;
    
    //Variable to keep track of the number of empty cells
    this.numOfFreeCells = this.numRows * this.numCols;
    
    //Players and Number of players
    this.players = [];
    this.numOfPlayers = 0;
    
    //Current player turn where we consider player 1 to go first
    this.currentPlayer = 0;
    
    //Create a new game
    for(var i = 0; i < this.numRows; i++){
        this.boardArray[i] = [];
        for(var j = 0; j < this.numCols; j++){
            this.boardArray[i][j] = "";
        }
    }
}

/**
 * isValidMove - This function will determine if a given move is possible
 * @param {number} col - The location of the column to test for a free space within
 * @return {object} - Whether the move is possible or impossible with the corresponding row and column
*/
ConnectFourModel.prototype.isValidMove = function(col){
	//Check each row within the column for a free space
	//For loop will go to a return true if there is an empty space otherwise it will reach the return false case
	for(var i = this.numRows - 1; i >= 0; i--){
		if(this.boardArray[i][col] == ""){
			return {isValid: true, row: i;, column: col};
		}
	}

    return {isValid: false, row: -1;, column: -1};
};

/**
 * isGameOver - This function will return if the game has ended
 * @return {boolean} - If the game is over (true) or not (false)
*/
ConnectFourModel.prototype.isGameOver = function(){
    return (this.numOfFreeCells == 0 || this.playerWin() != "");
};

/**
 * addPlayer - This function will add a player to the game
 * @param {string} playerString - String of the player
*/
ConnectFourModel.prototype.addPlayer = function(playerString){
    this.players[this.numOfPlayers] = playerString;
    this.numOfPlayers++;
    alert("Player " + playerString + " have been added!");
};

/**
 * makeMove - This function will make a desired move IF the move is possible
 * @param {number} row - The location of the row to place move
 * @param {number} col - The location of the column to place move
 * @return {boolean} - Whether the move was accomplished or not
*/
ConnectFourModel.prototype.makeMove = function(row, col){
    //Determine if the move is valid
    //This variable will be a object referencing the isValidMove method's decision
    var isMoveValid = this.isValidMove(col);

    //If valid move, make move
    if(isMoveValid.isValid){
    	//Place symbol (Beta) at position
    	this.boardArray[isMoveValid.row][isMoveValid.column] = this.players[this.numOfPlayers];

    	//Decrement the number of free cells
    	this.numOfFreeCells--;

    	//Next player turn
    	this.currentPlayer = (this.CurrentPlayer + 1) % this.players.length;

    	//Return true for completed method
    	return true;
    }

    //Move is not valid
    return false;
};

/**
 * newGame - This function will start a new game
*/
ConnectFourModel.prototype.newGame = function(){
    //Reset model
    //Reset view
    //DO NOT RESET CONTROLLER!
};

/**
 * getPlayer - This function will return the string of a player at a location on the grid
 * @param {number} row - The location of the row to check
 * @param {number} col - The location of the column to check
 * @return {string} - The player string if there exists a player, otherwise return ""
*/
ConnectFourModel.prototype.getPlayer = function(row, col){
    return this.boardArray[row][col];
};

/**
 * playerWin - This function will determine if there exists a winner (Note most of this code is hardcoded for Connect Four)
 * @return {string} - The string of the winner ("" if no winner exists)
*/
ConnectFourModel.prototype.playerWin = function(){
    //Counting the number of x's and o's in the fashion name[row, col, diag, antiDiag]
    
}

//BOARD IS 7 BY 6