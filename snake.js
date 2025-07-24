// Size of each block on the board
var blockSize = 25;
// Number of rows and columns on the board
var rows = 20;
var cols = 20;

var board;
var context;

// Initial position of snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// Initial velocity (direction) of snake - no movement at start
var velocityX = 0;
var velocityY = 0;

// Array to hold snake body parts positions
var snakeBody = [];

// Food position
var foodX;
var foodY;

// Game over flag
var gameOver = false;

window.onload = function() {
    // Set up the canvas board and its dimensions
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // For drawing on canvas

    placefood(); // Place food initially

    // Listen for arrow key presses to change direction
    document.addEventListener('keyup', changeDirection);

    // Call update function every 100ms (10 times per second)
    setInterval(update, 1000 / 10);

    // Set initial high score display from localStorage or 0
    document.getElementById("highScore").innerText = localStorage.getItem("highScore") || 0;
};

function update() {
    if (gameOver) {
        // If game is over, skip update
        return;
    }

    // Fill the board background light pink
context.fillStyle = "#ffe6f0"; // light pink background
context.fillRect(0, 0, board.width, board.height);

    // Draw the food square in red
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Check if snake ate the food
    if (snakeX === foodX && snakeY === foodY) {
        // Add new segment at food location
        snakeBody.push([foodX, foodY]);
        // Place new food somewhere else
        placefood();
    }

    // Move snake body segments forward (each segment takes position of previous segment)
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move snake head according to velocity
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    // Draw snake head and body in lime green
    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Game over conditions:

    // 1) Snake hits the wall (use >= to prevent going off screen)
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        if (!gameOver) {
            gameOver = true;
            alert("Game Over");
        }
    }

    // 2) Snake hits itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            if (!gameOver) {
                gameOver = true;
                alert("Game Over");
            }
        }
    }

    // Update the score display with snake length
    document.getElementById("score").innerText = snakeBody.length;

    // Update high score if current score beats it
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    if (snakeBody.length > highScore) {
        localStorage.setItem("highScore", snakeBody.length);
        document.getElementById("highScore").innerText = snakeBody.length;
    } else {
        document.getElementById("highScore").innerText = highScore;
    }
}

// Change snake direction on arrow key press
function changeDirection(e) {
    // Prevent reversing direction directly
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Randomly place food somewhere on the board grid
function placefood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Restart the game state and reset everything
function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    placefood();

    // Reset score display (score = 0)
    document.getElementById("score").innerText = 0;

    // Update high score display from storage (do not reset high score)
    let highScore = parseInt(localStorage.getItem("highScore")) || 0;
    document.getElementById("highScore").innerText = highScore;
}
