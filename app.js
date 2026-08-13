// board
const tileSize = 32;
let board;
let rows;
let cols;
let boardWidth;
let boardHeight;
let ctx;

// images
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;
let pacmanUpImage;
let pacmanDownImage;
let pacmanLeftImage;
let pacmanRightImage;
let wallImage;

// game elements
const walls = new Set(); 
const ghosts = new Set();
const foods = new Set();
let pacman;

// game state variales
const directions = ['U', 'D', 'L', 'R'];
let score = 0;
let lives = 3;
let bestScore;
let gameOver = false;
let queuedDirection = null;

// to update score & lives display
let livesElement;
let scoreElement;
let bestScoreElement;

function updateStats() {
    if (gameOver) {
        livesElement.textContent = "Game Over!";
        scoreElement.textContent = "Final Score: " + String(score);
        bestScoreElement.textContent = "Best: " + String(bestScore);
    }
    else {
        livesElement.textContent = "Lives: " + String(lives);
        scoreElement.textContent = "Score: " + String(score);
        bestScoreElement.textContent = "Best: " + String(bestScore);
    }
}

function loadImages() {
    wallImage = new Image();
    wallImage.src = "images/wall.png";

    blueGhostImage = new Image();
    blueGhostImage.src = "images/blueGhost.png";
    orangeGhostImage = new Image();
    orangeGhostImage.src = "images/orangeGhost.png"
    pinkGhostImage = new Image()
    pinkGhostImage.src = "images/pinkGhost.png";
    redGhostImage = new Image()
    redGhostImage.src = "images/redGhost.png";

    pacmanUpImage = new Image();
    pacmanUpImage.src = "images/pacmanUp.png";
    pacmanDownImage = new Image();
    pacmanDownImage.src = "images/pacmanDown.png";
    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "images/pacmanLeft.png";
    pacmanRightImage = new Image();
    pacmanRightImage.src = "images/pacmanRight.png";
}

// common class for all game elements
class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.startX = x; 
        this.startY = y;

        this.direction = 'R';
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        let isWall = false;
        this.direction = direction;
        this.updateVelocity();
        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls) {
            if (collision(this, wall)) {
                isWall = true;
                this.x -= this.velocityX;
                this.y -= this.velocityY;
                this.direction = prevDirection;
                this.updateVelocity();
                return;
            }
        }

        if(!isWall) {
            this.x -= this.velocityX;
            this.y -= this.velocityY;
        }
    }

    updateVelocity() {
        if (this.direction === 'U') {
            this.velocityX = 0;
            this.velocityY = -tileSize / 4;
        }
        else if (this.direction === 'D') {
            this.velocityX = 0;
            this.velocityY = tileSize / 4;
        }
        else if (this.direction === 'L') {
            this.velocityX = -tileSize / 4;
            this.velocityY = 0;
        }
        else if (this.direction === 'R') {
            this.velocityX = tileSize / 4;
            this.velocityY = 0;
        }
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }
}

// create game elements with initial x & y positions
function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

     for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const row = tileMap[r];
            const tileMapChar = row[c];

            const x = c * tileSize;
            const y = r  * tileSize;

            if (tileMapChar == 'X') { //block wall
                const wall = new Block(wallImage, x, y, tileSize, tileSize);
                walls.add(wall);  
            }
            else if (tileMapChar == 'b') { //blue ghost
                const ghost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'o') { //orange ghost
                const ghost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'p') { //pink ghost
                const ghost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'r') { //red ghost
                const ghost = new Block(redGhostImage, x, y, tileSize, tileSize);
                ghosts.add(ghost);
            }
            else if (tileMapChar == 'P') { //pacman
                pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
            }
            else if (tileMapChar == ' ') { //white space is food
                const food = new Block(null, x + 14, y + 14, 4, 4);
                foods.add(food);
            }
        }
    }
} 

function draw() {
    ctx.clearRect(0, 0, boardWidth, boardHeight);

    // draw pacman
    ctx.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);

    // draw ghosts
    for (let ghost of ghosts) {
        ctx.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    // draw walls
    for (let wall of walls) {
        ctx.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    // draw food
    ctx.fillStyle = "white";
    for (let food of foods) {
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.width / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    updateStats();
}

function move() {
    if (queuedDirection) {
        pacman.updateDirection(queuedDirection); // queue the next direction for pacman
    }

    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    // check wall collisions
    for (let wall of walls) {
        if (collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }
    
    if (pacman.direction === queuedDirection) { // successfull movement/turn
        queuedDirection = null;
        updatePacmanImage();
    }

    // boundary check
    detectBoundary(pacman);

    // ghost movement and wall collision checks
    for (let ghost of ghosts) {
        if (collision(ghost, pacman)) {
            lives--;
            if (lives === 0) {
                gameOver = true;
                if (score > bestScore) { // update best score
                    bestScore = score;
                    localStorage.setItem("pacmanBestScore", bestScore);
                }
                return;
            }
            resetPositions();
        }
        
        ghost.x += ghost.velocityX;
        ghost.y += ghost.velocityY;

        if (ghost.y === 9 * tileSize) {
            const choice = Math.floor(Math.random() * 2);
            if (choice === 0)
                ghost.updateDirection('U');
            else
                ghost.updateDirection('D');
        }

        for (let wall of walls) {
            if (collision(ghost, wall)) 
            {
                ghost.x -= ghost.velocityX;
                ghost.y -= ghost.velocityY;
                const newDirection = directions[Math.floor(Math.random() * 4)];
                ghost.updateDirection(newDirection);
            }
        }
        detectBoundary(ghost);
    }
    
    // check food collision
    let foodEaten = null; 
    for (let food of foods) {
        if (collision(pacman, food)) {
            foodEaten = food;
            score += 10;
            break;
        }
    }
    foods.delete(foodEaten);

     // next level
    if (foods.size === 0) {
        loadMap();
        resetPositions(); 
    }
}

function movePacman(evt) {
    if (gameOver) { // reset game after game over
        loadMap();
        resetPositions();
        lives = 3;
        score = 0;
        gameOver = false;
        return;
    }

    if (evt.code === "ArrowUp" || evt.code === "KeyW") {
        evt.preventDefault();
        queuedDirection = 'U';
    }
    else if (evt.code === "ArrowDown" || evt.code === "KeyS") {
        evt.preventDefault();
        queuedDirection = 'D';
    }
    else if (evt.code === "ArrowLeft" || evt.code === "KeyA") {
        evt.preventDefault();
        queuedDirection = 'L';
    }
    else if (evt.code === "ArrowRight" || evt.code === "KeyD") {
        evt.preventDefault();
        queuedDirection = 'R';
    }
}

function updatePacmanImage() {
    if (pacman.direction === 'U') {
        pacman.image = pacmanUpImage;
    }
    else if (pacman.direction === 'D') {
        pacman.image = pacmanDownImage;
    }
    else if (pacman.direction === 'L') {
        pacman.image = pacmanLeftImage;
    }
    else if (pacman.direction === 'R') {
        pacman.image = pacmanRightImage;
    }
}

function resetPositions() {
    pacman.reset();
    pacman.velocityX = 0;
    pacman.velocityY = 0;
    pacman.direction = 'R';
    updatePacmanImage();

    for (let ghost of ghosts) {
        ghost.reset();
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
}

// collision detection function
function collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function detectBoundary(object) {
    // left boundary
    if (object.x < 0) {
        object.x = boardWidth - object.width;;
    } 

    // right boundary
    else if (object.x + object.width > boardWidth) {
        object.x = 0;
    }

    // top boundary
    else if (object.y < 0) {
        object.y = boardHeight - object.height;
    }

    // bottom boundary
    else if (object.y + object.height > boardHeight) {
        object.y = 0;
    }
}

function update() { // game loop
    if (!gameOver) {
        move();
    }
    draw();
    setTimeout(update, 50); // 20 FPS -> 1000ms/20 = 50ms
}

window.onload = () => {
    board = document.querySelector("#board");
    livesElement = document.querySelector("#lives");
    scoreElement = document.querySelector("#score");
    bestScoreElement = document.querySelector("#best");
    bestScore = parseInt(localStorage.getItem("pacmanBestScore")) || 0;  // retrieve current best score
    
    // board size derived from the tile map to match the canvas size exactly
    rows = tileMap.length;
    cols = tileMap[0].length;
    boardWidth = cols * tileSize;
    boardHeight = rows * tileSize;

    board.height = boardHeight;
    board.width = boardWidth;

    ctx = board.getContext("2d");

    loadImages();
    loadMap();

    for (let ghost of ghosts) {
        const newDirection = directions[Math.floor(Math.random() * 4)];
        ghost.updateDirection(newDirection);
    }
    update();

    document.addEventListener("keydown", movePacman);
    bestScoreElement.addEventListener("dblclick", () => {
        if (confirm("Are you sure you want to reset the best score?")) {
            bestScore = 0;
            localStorage.setItem("pacmanBestScore", bestScore);
        }
    });
}