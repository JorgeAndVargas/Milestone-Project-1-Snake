//Creating the table for the snake game
var table;
var tableSize = 25;
var columns = 30;
var rows = 30;
var ctx;

//Creating the snake
var snakeX = tabkeSize * 5;
var snakeY = tableSize * 5;

//Creating the velocity of the snake
var velocityX = 0;
var velocityY = 0;

//Creating the body of the snake
var snakeBody = [];

//Creating the apples
var appleX;
var appleY;

//Game is over
var gameOver = false;

//Drawing the table
function drawTable() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, table.width, table.height);
}

//Drawing the snake
function drawSnake() {
    ctx.fillStyle = "green";
    ctx.fillRect(snakeX, snakeY, tableSize, tableSize);
    }
    