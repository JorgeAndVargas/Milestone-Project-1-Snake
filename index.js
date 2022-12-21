//Creating the table for the snake game
let table;
let tableSize = 25;
let columns = 30;
let rows = 30;
let ctx;

//Creating the snake
let snakeX = tableSize * 5;
let snakeY = tableSize * 5;

//Creating the velocity of the snake
let velocityX = 0;
let velocityY = 0;

//Creating the body of the snake
let snakeBody = [];

//Creating the apples
let appleX;
let appleY;

//create the score
let scoreNumber = 0;

//Game is over
let gameOver = false;

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
    
    //game is over
    if (snakeX < 0 || snakeX > columns*tableSize || snakeY < 0 || snakeY > rows*tableSize) {
        gameOver = true;
    }
    
    //Drawing the table
    function drawTable() {
        ctx.fillStyle = "#c6f6ff";
        ctx.fillRect(0, 0, table.width, table.height);
        for (let i = 0; i < rows; i++) {
            ctx.moveTo(i * tableSize, 0);
            ctx.lineTo(i * tableSize, table.height);
        }
        for (let i = 0; i < columns; i++) {
            ctx.moveTo(0, i * tableSize);
            ctx.lineTo(table.width, i * tableSize);
        }
        ctx.strokeStyle = "#a9d8fc";
        ctx.stroke();

    }

    //Drawing the score
    function drawScore() {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Score: " + scoreNumber, 10, 20);
        }

    //Drawing the apples
    function drawApple() {
        ctx.fillStyle = "#93b9fd";
        ctx.fillRect(appleX, appleY, tableSize, tableSize);

        //if the snake eats the apple, the snake grows
        if (snakeX == appleX && snakeY == appleY) {
            snakeBody.push([appleX, appleY]);
            placeApple();
            scoreNumber++;
            scoreNumber.textContent = scoreNumber;
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
        ctx.fillStyle = "#99c4f7 ";
        ctx.shadowColor = '#92bdff';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
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
            }
        }

        //if the game is over, an image is displayed and the score disappears
        if (gameOver) {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText("Game Over", 10, 20);
            ctx.drawImage(document.getElementById("gameOver"), 0, 0, 750, 750);
        }


        //if the game ends, the snake is reset
        if (gameOver) {
            snakeX = tableSize * 5;
            snakeY = tableSize * 5;
            velocityX = 0;
            velocityY = 0;
            snakeBody = [];
            gameOver = false;
            scoreNumber = 0;
            placeApple();
        }

    }

    drawTable();
    drawSnake();
    drawApple();
    drawScore();

    
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

