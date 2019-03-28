/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board; // array of rows, each row is array of cells  (board[y][x])
var entireBoard=0;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let filler = null
  board = [...Array(WIDTH)].map(e => Array(HEIGHT).fill(filler));
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "board" variable from the item in HTML w/ID of "board"
  var board = document.getElementById("board");
  // TODO: add comment for this code
  var top = document.createElement("tr"); //this creates an HTML clickable top-row of the board
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) { //creates an HTML clickable cell for the top row
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {//creates table for game pieces
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`); //gives each table cell a unique identifier.
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i=board[x].length-1; i>=0; i--) {//goes through each piece in a column until the first blank row
    if (board[x][i] === null) {
      return i
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  board[x][y] = currPlayer;
  var newPiece = document.createElement("div");
  newPiece.setAttribute("class","piece");
  newPiece.classList.add(`p${currPlayer}`);
  document.getElementById(`${y}-${x}`).appendChild(newPiece);
  entireBoard++;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (entireBoardFilled() && !checkForWin()) {
    return endGame('Tie Game!')
  }

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // switch players
  currPlayer = 3-currPlayer;//toggles players
  // TODO: switch currPlayer 1 <-> 2
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
        ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function entireBoardFilled() {//function to check if board is filled
  return entireBoard === WIDTH*HEIGHT;
}

makeBoard();
makeHtmlBoard();
