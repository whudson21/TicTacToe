"use strict";

/**
 * TTTModel - This function will load up a grid-like board game given its dimensions
 * @constructor
 * @param {number} numRows - The number of rows to add to the grid
 * @param {number} numCols - The number of columns to add to the grid
 * @param {array} boardArray - The array to save the memory of the grid to
*/

function TTTModel(numRows, numCols, boardArray){
    
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
 * @param {number} row - The location of the row to test
 * @param {number} col - The location of the column to test
 * @return {boolean} - Whether the move is possible or impossible
*/
TTTModel.prototype.isValidMove = function(row, col){
    return this.boardArray[row][col] == "";
};

/**
 * isDraw - This function will determine if the game results in a draw
 * @return {boolean} - Whether the game is a draw or not
*/
TTTModel.prototype.isDraw = function(){
    return this.numOfFreeCells == 0;
};

/**
 * addPlayer - This function will add a player to the game
 * @param {string} playerString - String of the player
*/
TTTModel.prototype.addPlayer = function(playerString){
    this.players[this.numOfPlayers] = playerString;
    this.numOfPlayers++;
    console.log("Player " + playerString + " have been added!");
};

/**
 * makeMove - This function will make a desired move IF the move is possible
 * @param {number} row - The location of the row to place move
 * @param {number} col - The location of the column to place move
 * @return {boolean} - Whether the move was accomplished or not
*/
TTTModel.prototype.makeMove = function(row, col){
    //If move is valid, make the move
    if(this.isValidMove(row, col)){
        //Place symbol at position
        this.boardArray[row][col] = this.players[this.currentPlayer];
        
        //Decrease the number of free cells
        this.numOfFreeCells--;
        
        //Next player turn
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        
        //Return true for completed
        return true;
    }
    
    else{
        //Return false for incomplete
        return false;
    }
};

/**
 * newGame - This function will start a new game
*/
TTTModel.prototype.newGame = function(){
    //Reset instance variables
    
    this.numOfFreeCells = this.numRows * this.numCols;
    this.currentPlayer = 0;
    
    for(var i = 0; i < this.numRows; i++){
        this.boardArray[i] = [];
        for(var j = 0; j < this.numCols; j++){
            //Reset the view
            document.getElementById("tableStart").getElementsByTagName("tr")[i].getElementsByTagName("td")[j].textContent = "";
            this.boardArray[i][j] = "";
        }
    }
};

/**
 * getPlayer - This function will return the string of a player at a location on the grid
 * @param {number} row - The location of the row to check
 * @param {number} col - The location of the column to check
 * @return {string} - The player string if there exists a player, otherwise return ""
*/
TTTModel.prototype.getPlayer = function(row, col){
    return this.boardArray[row][col];
};

/**
 * isGameOver - This function will return if the game has ended
 * @return {boolean} - If the game is over (true) or not (false)
*/
TTTModel.prototype.isGameOver = function(){
    return (this.numOfFreeCells == 0 || this.playerWin() != "");
};

/**
 * playerWin - This function will determine if there exists a winner (Note most of this code is hardcoded for Tic-Tac-Toe)
 * @return {string} - The string of the winner ("" if no winner exists)
*/
TTTModel.prototype.playerWin = function(){
    //Counting the number of x's and o's in the fashion name[row, col, diag, antiDiag]
    var numX = [0,0,0,0];
    var numO = [0,0,0,0];
    
    /**
     * tallyCheckEachCell - This function will check a given position for an "X" or an "O"
     * @param {string} val - The string value of the cell
     * @param {number} column - The location of  the row to check
     * @param {number} pos - The position in the tally to add where 0 row, 1 column, 2 diagonal, 3 anti-diagonal
    */
    function tallyCheckEachCell(val, pos){
        switch(val){
            case "X":
                numX[pos] += 1;
                break;

            case "O":
                numO[pos] += 1;
                break;
        }
    }

    //Stores the number of X's and O's needed to win
    //Based on the dimensions of the board
    var numForWin = this.numRows;
    
    //Checking all cases
    for(var i = 0; i < this.numRows; i++){
        for(var j = 0; j < this.numCols; j++){
            
            //Checking rows
            tallyCheckEachCell(this.boardArray[i][j], 0);

            //Checking columns
            tallyCheckEachCell(this.boardArray[j][i], 1);

            //Checking diagonal
            tallyCheckEachCell(this.boardArray[j][j], 2);

            //Checking anti-diagonal
            tallyCheckEachCell(this.boardArray[j][this.numCols - (j+1)], 3);
        }
        
        //Check for a winner where you only check the row and col indices
        //If no winner is found, reset variables for new row and col
        if(numX.indexOf(3) != -1)
            return "X";
        else if(numO.indexOf(3) != -1)
            return "O";
        else{
            numX = [0, 0, 0, 0];
            numO = [0, 0, 0, 0];
        }
    }

    //Failure to find a winner
    return "";
};

/**
 * copy - This function will return the current copy of the game (Making sure not to overwrite the current game)
 * @return {object} newModel - The current status of the game
*/
TTTModel.prototype.copy = function(){
    //Get a copy and save it to another address
    var newModel = new TTTModel(this.numRows, this.numCols, []);

    //Copy data from boardArray
    for(var i = 0; i < this.numRows; i++){
        for(var j = 0; j < this.numCols; j++)
            newModel.boardArray[i][j] = this.boardArray[i][j];
    }
    
    //Copy currentPlayer, numOfFreeCells, numOfPlayers
    newModel.currentPlayer = this.currentPlayer;
    newModel.numOfFreeCells = this.numOfFreeCells;
    newModel.numOfPlayers = this.numOfPlayers;
    
    //Get the number of players
    //Copy data from player array
    for(i = 0; i < this.players.length; i++)
        newModel.players[i] = this.players[i];
    
    //Return the copied model
    return newModel;
};

/**
 * getBestOutcome - This function will return the value 1 represents a win, 0 represents a draw,
 * and -1 for a loss for the maximizing player if maximizing player is true; vice-versa if maximizing
 * player is false
 * @param {object} boardPosition - The location of the row to check
 * @param {boolean} isMaximizingPlayer - The location of the column to check
 * @return {object} - An object that holds the row and column and the value of the optimized move 
*/
TTTModel.prototype.getBestOutcome = function(boardPosition, isMaximizingPlayer){
    
    //The next move that can be made
    var rowMove = -1;
    var colMove = -1;
    
    //Assuming the possible score
    var maxScore = -2;
    var minScore = 2;
    
    //If game is over
    if(boardPosition.isGameOver()){
        //Check who the winner is
        switch(boardPosition.playerWin()){
            case "X":
                return {row: rowMove, col: colMove, val: 1};

            case "O":
                return {row: rowMove, col: colMove, val: -1};

            case "":
                return {row: rowMove, col: colMove, val: 0};
        }
    }
    
    //Loop
    for(var i = 0; i < boardPosition.numRows; i ++){
        for(var j = 0; j < boardPosition.numCols; j++){
            //Make separate copy of the board
            var copyBoardPosition = boardPosition.copy();

            //Make a designated move
            if(copyBoardPosition.makeMove(i, j)){
                //Get the next value in the branch
                var nextMoveVal = this.getBestOutcome(copyBoardPosition, !isMaximizingPlayer);
                
                //If the value beats the maxScore or minScore, replace its value
                //Replaces the respective value (Respective to isMaximizingPlayer)
                if(isMaximizingPlayer){
                    if(maxScore < nextMoveVal.val){
                        //Update the maximum score
                        maxScore = nextMoveVal.val;
                        
                        //Save the value of the row and column
                        rowMove = i;
                        colMove = j;
                    }
                }
    
                else{
                    if(minScore > nextMoveVal.val){
                        //Update the minimum score
                        minScore = nextMoveVal.val;
                        
                        //Save the value of the row and column
                        rowMove = i;
                        colMove = j;
                    }
                }
            }
        }
    }

    //Return appropriate value
    if(isMaximizingPlayer)
        return {row: rowMove, col: colMove, val: maxScore};
    else
        return {row: rowMove, col: colMove, val: minScore};
};

/**
 * TTTView - This function will load a view of the current game
 * @param {object} model - The actual board object of the game
 * @param {function} callback - A function that will be used to add event listeners
*/
function TTTView(model, callback){
    
    //Create a table
    var table = document.createElement("table");

        //Loop the rows as well as the table data
    for(var i = 0; i < model.numRows; i ++){

        //Create the row element
        var rowTr = document.createElement("tr");

        //Loop the columns
        for(var j = 0; j < model.numCols; j ++){

            //Create the column element
            var columnTd = document.createElement("td");

            //Create the text node using the specified value in the boardArray
            var textNode = document.createTextNode(model.boardArray[i][j]);

            //Use the callback function to input an addEventListener to the cell
            callback(columnTd, i, j);

            //Add each cell to the game-grid-cell class
            columnTd.className = "game-grid-cell";

            //Append the text node to the column
            columnTd.appendChild(textNode);

            //Append the column to the row
            rowTr.appendChild(columnTd);
        }

        //Append the row to the table
        table.appendChild(rowTr);
    }

    //Append the table into the body
    document.body.appendChild(table);
    
    //Add table to the game-grid-view class
    table.className = "game-grid-view";

    //Assign a table identifier name
    table.id = "tableStart";
}

/**
 * TTTController - This function be the main control of the game and allocating events
*/

function TTTController(){
    
    //Create a model
    var gameModel = new TTTModel(3, 3, []);

    //Add players
    gameModel.addPlayer("X");
    gameModel.addPlayer("O");

    //Create a view
    var gameView = new TTTView(gameModel, function(tdElement, row, column){

        //Add an event listener to the element
        tdElement.addEventListener("click", function(){

            //Make the move for the player by updating the model
            //Update the view

            if(gameModel.isValidMove(row, column)){
                document.getElementById("tableStart").getElementsByTagName("tr")[row].getElementsByTagName("td")[column].textContent = "X";
                gameModel.makeMove(row, column);

                //Make the move for the computer player
                //Update the view
                //Check if the game is over already
                if(!gameModel.isGameOver()){
                    var getBestMove = gameModel.getBestOutcome(gameModel, false);
                    if(gameModel.isValidMove(getBestMove.row, getBestMove.col)){
                        document.getElementById("tableStart").getElementsByTagName("tr")[getBestMove.row].getElementsByTagName("td")[getBestMove.col].textContent = "O";
                        gameModel.makeMove(getBestMove.row, getBestMove.col);
                    }
                }
            }

            //Determine if the game is over
            if(gameModel.isGameOver()){

                //Determine if there's a winner
                if(gameModel.isDraw())
                    alert("Tie!");

                else
                    alert("Player " + gameModel.playerWin() + " won!");

                //Reset the game
                gameModel.newGame();
            }
        });
    });
}

var newGame = new TTTController();