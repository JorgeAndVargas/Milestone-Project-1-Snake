//Creating the table for the snake game
var table;
var tableSize = 25;
var columns = 30;
var rows = 30;
var ctx;

//Creating the snake
var snakeX = tableSize * 5;
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

//When the window loads, the board is created
window.onload = function() {
    table = document.getElementById("table");
    table.width = rows * tableSize;
    table.height = columns * tableSize;
    ctx = table.getContext("2d");
    setInterval(game, 1000/10);
    }

//placing the apple
function placeApple() {
    appleX = Math.floor(Math.random() * rows) * tableSize;
    appleY = Math.floor(Math.random() * columns) * tableSize;
    }

//Creating the game
function game() {
    drawTable();
    drawSnake();
    }

//Drawing the table
function drawTable() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, table.width, table.height);
}

//Drawing the snake
function drawSnake() {
    ctx.fillStyle="orange";
    snakeX += velocityX * tableSize;
    snakeY += velocityY * tableSize;
    ctx.fillRect(snakeX, snakeY, tableSize, tableSize);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tableSize, tableSize);
    }
}

//Drawing the apples
function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX, appleY, tableSize, tableSize);
    }

if (snakeX == appleX && snakeY == appleY) {
    snakeBody.push([appleX, appleY]);
    placeApple();
}

for (let i = snakeBody.length-1; i >= 0; i--) {
    snakeBody[i] = snakeBody[i-1];
}
if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
}

