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

//When the window loads, the table is created and the apples are placed
window.onload = function() {
    table = document.getElementById("table");
    table.width = rows * tableSize;
    table.height = columns * tableSize;
    ctx = table.getContext("2d");
    setInterval(game, 1000/10);

    placeApple();
    document.addEventListener("keydown", keyPush);

    }

//Creating the game
function game() {
    if (gameOver) {
        return;
    }
    
    //if game is over

    if (snakeX < 0 || snakeX > columns*tableSize || snakeY < 0 || snakeY > rows*tableSize) {
        gameOver = true;
        alert("Game Over");
    }
    
    //Drawing the table
    function drawTable() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, table.width, table.height);
    }

    //Drawing the apples
    function drawApple() {
        ctx.fillStyle = "red";
        ctx.fillRect(appleX, appleY, tableSize, tableSize);

        //if the snake eats the apple, the snake grows
        if (snakeX == appleX && snakeY == appleY) {
            snakeBody.push([appleX, appleY]);
            placeApple();
        }
        for (let i = snakeBody.length-1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }
    }

    //Drawing the snake
    function drawSnake() {
        ctx.fillStyle = "orange";
        snakeX += velocityX * tableSize;
        snakeY += velocityY * tableSize;
        ctx.fillRect(snakeX, snakeY, tableSize, tableSize);
        for (let i = 0; i < snakeBody.length; i++) {
            ctx.fillRect(snakeBody[i][0], snakeBody[i][1], tableSize, tableSize);
        }
        
        //if the snake eats itself, the game is over
        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game Over");
            }
        }

        //if the game ends, the snake is reset
        if (gameOver) {
            snakeX = tableSize * 5;
            snakeY = tableSize * 5;
            velocityX = 0;
            velocityY = 0;
            snakeBody = [];
            gameOver = false;
        }
    }

    drawTable();
    drawSnake();
    drawApple();

    
}

//Placing the apples 
function placeApple() {
    appleX = Math.floor(Math.random() * columns) * tableSize;
    appleY = Math.floor(Math.random() * rows) * tableSize;
}


//Moving the snake
function keyPush(event) {
    switch(event.keyCode) {
        case 37: //Left
            velocityX = -1;
            velocityY = 0;
            break;
        case 38: //Up
            velocityX = 0;
            velocityY = -1;
            break;
        case 39: //Right
            velocityX = 1;
            velocityY = 0;
            break;
        case 40: //Down
            velocityX = 0;
            velocityY = 1;
            break;
    }
}



