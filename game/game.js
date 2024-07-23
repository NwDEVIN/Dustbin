  var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var grid = 16;
var count = 0;
var snake = {
    x: 112,
    y: 112,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
var apple = {
    x: 192,
    y: 192
};
var score = 0;
var gameRunning = true;
var gamePaused = false;
var requestId;

// Function to start the game
function startGame() {
    document.getElementById('startButton').style.display = 'none';
    
document.getElementById('me').style.display = 'none';
   document.getElementById('mobileMessage').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('arrowKeys').style.display = 'block';
    document.getElementById('score').style.display = 'block';
    document.getElementById('pb').style.display = 'block';
    document.getElementById('sb').style.display = 'block';
   document.getElementById('ts').style.display = 'block'; 
    
    loop();
}

document.getElementById('startButton').addEventListener('click', startGame);

function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
}

function restartGame() {
    gameRunning = true;
    score = 0;
    updateScore();
    snake = {
        x: 80,
        y: 80,
        dx: grid,
        dy: 0,
        cells: [],
        maxCells: 4
    };
    apple = {
        x: 176,
        y: 176
    };
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('restartButton').style.display = 'none';
    loop(); // Restart the game loop
}

document.getElementById('restartButton').addEventListener('click', function() {
    restartGame();
});

document.getElementById('pauseButton').addEventListener('click', function() {
    gamePaused = !gamePaused;
    if (gamePaused) {
        cancelAnimationFrame(requestId); // Pause the game loop
        document.getElementById('pauseButton').textContent = '▶️';
    } else {
        loop(); // Resume the game loop
        document.getElementById('pauseButton').textContent = '⏸️';
    }
});

function loop() {
    if (!gameRunning || gamePaused) return;

    requestId = requestAnimationFrame(loop);

    if (++count < 15) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    snake.cells.unshift({ x: snake.x, y: snake.y });

    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            score += 5; // Increment score by 5 instead of 1
            eatSound.play();
                        
            updateScore();

            apple.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
            apple.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
        }

        for (var i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                gameRunning = false;
                gameOverSound.play();
                navigator.vibrate([300,30,300,30]);
                document.getElementById('gameOver').style.display = 'block';
                document.getElementById('restartButton').style.display = 'block';
                break;
            }
        }
    });
}


// Get the audio elements
const eatSound = document.getElementById('eatSound');
const gameOverSound = document.getElementById('gameOverSound');

// Function to toggle sound for both elements
function toggleSound() {
    const isMuted = eatSound.muted;
    
    // Toggle mute for both audio elements
    eatSound.muted = !isMuted;
    gameOverSound.muted = !isMuted;
    
    // Update button text based on the mute state
    const buttonText = eatSound.muted ? '🔇' : '🔊';
    document.getElementById('toggleSound').textContent = buttonText;
}

document.getElementById('toggleSound').addEventListener('click', toggleSound);

document.addEventListener('keydown', function(e) {
    if (!gameRunning || gamePaused) return;

    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    } else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

document.getElementById('leftArrow').addEventListener('click', function() {
    if (!gameRunning || gamePaused) return;

    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
});

document.getElementById('upArrow').addEventListener('click', function() {
    if (!gameRunning || gamePaused) return;

    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
});

document.getElementById('rightArrow').addEventListener('click', function() {
    if (!gameRunning || gamePaused) return;

    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
});

document.getElementById('downArrow').addEventListener('click', function() {
    if (!gameRunning || gamePaused) return;

    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
}); 
