
let snakeSpeed = 4;
const expansionRate = 2;
let lastRenderTime = 0;
let gameOver = false;
let inputDirection = { x: 0, y: 0 };
let lastInputDirection = { x: 0, y: 0 };
const snakeBody = [{ x: 10, y: 11 }];
let newSegments = 0;
let food = getRandomFoodPosition();

const themeSelect = document.getElementById('themeSelect');
const modeSelect = document.getElementById('modeSelect');
const gameBoard = document.querySelector('.gameBoard');
const gameHeader = document.querySelector('.gameheader');
const headings = document.querySelectorAll('.heading');
const fullScreen = document.getElementById('fullScreen');
const snake = document.querySelector('.snake');


fullScreen.addEventListener('click', () => document.documentElement.requestFullscreen());

function updateGameBoardColor() {
    const selectedTheme = themeSelect.value;
    switch (selectedTheme) {
        case 'greenYellow':
            gameBoard.style.backgroundColor = 'yellow';
            gameHeader.style.backgroundColor = 'green';
            headings.forEach(heading => heading.style.color = 'black');
            break;
        case 'blackWhite':
            gameBoard.style.backgroundColor = '#FFFFFF';
            gameBoard.style.border = '2px solid #000';
            gameHeader.style.backgroundColor = 'black';
            headings.forEach(heading => heading.style.color = 'white');
            break;
        case 'redBlue':
            gameBoard.style.backgroundColor = 'blue';
            gameHeader.style.backgroundColor = 'red';
            headings.forEach(heading => heading.style.color = 'black');
            break;
        default:
            gameBoard.style.backgroundColor = '#0000FF';
            headings.forEach(heading => heading.style.color = 'white');
    }
}
themeSelect.addEventListener('change', updateGameBoardColor);
updateGameBoardColor();

function updateGameMode() {
    const selectedMode = modeSelect.value;
    switch (selectedMode) {
        case '1': // Easy
            snakeSpeed = 4;
            break;
        case '2': // Medium
            snakeSpeed = 20;
            break;
        case '3': // Hard
            snakeSpeed = 100;
            break;
    }
}
modeSelect.addEventListener('change', updateGameMode);
updateGameMode(); 

function main(currentTime) {
    if (gameOver) {
        if (confirm('Game Over! Press OK to restart.')) window.location.reload();
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    lastRenderTime = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function updateSnake() {
    addSegments();
    const direction = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] };
    }
    snakeBody[0].x += direction.x;
    snakeBody[0].y += direction.y;
}

function drawSnake(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    });
}

function expandSnake(amount) {
    newSegments += amount;
}

function onSnake(position) {
    return snakeBody.some(segment => equalPositions(segment, position));
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
    }
    newSegments = 0;
}

function updateFood() {
    if (onSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomFoodPosition();
    }
}

function drawFood(gameBoard) {
    const foodElement = document.createElement('div');
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * 42) + 1,
        y: Math.floor(Math.random() * 21) + 1,
    };
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;
    }
});

function getInputDirection() {
    lastInputDirection = { ...inputDirection };
    return inputDirection;
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function getSnakeHead() {
    return snakeBody[0];
}

function outsideGrid(position) {
    return position.x < 1 || position.x > 41 || position.y < 1 || position.y > 20;
}

function snakeIntersection() {
    return snakeBody.some((segment, index) => {
        return index !== 0 && equalPositions(segment, getSnakeHead());
    });
}
