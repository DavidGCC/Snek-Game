let context, c = "", squareWidth = 15, gameSpeed = 15, gameInterval; //Variables for canvas, context and square size
document.getElementById("gameStarter").onclick = () => {
    for (let i = 0; i < 3; i++) {
        if (document.getElementsByTagName("input")[i].checked == true) {
            gameSpeed = document.getElementsByTagName("input")[i].value;
        }
    }
    c = document.getElementById("cnvs");
    context = c.getContext("2d");
    document.addEventListener("keydown", handleKeyPress);
    clearInterval(gameInterval);
    gameInterval = setInterval(mainGame, 1000 / gameSpeed);

}


// FUNCTION DECLARATIONS START HERE
const getRandom = mx => {
    let temp = Math.floor(Math.random() * mx);
    return temp - temp % squareWidth; // Position should always be divided evenly by squareWidth
}
// paints snake blocks
const fillSnake = (x, y) => {
    context.fillStyle = "green";
    context.fillRect(x, y, squareWidth, squareWidth);
}
// paints apple block
const fillApple = (x, y) => {
    context.fillStyle = "red";
    context.fillRect(x, y, squareWidth, squareWidth);
}
// function to detect apple and snake collision
const detectAppleCollision = (pX, pY, aX, aY) => {
    if (pX == aX && pY == aY) {
        return true;
    }
    return false;
}

// FUNCTION DECLARATIONS END HERE

// VARIABLE DECLARATIONS START HERE
let playerX = playerY = 300; // starting positions
let moveX = moveY = 0; // player direction
let appleX = getRandom(600);
let appleY = getRandom(600);
let tail = [];
let tailLength = 1; // starting length
let lastKey;
let score = 0;
let highScore = 0;
// VRIABLE DECLARATIONS END HERE


const mainGame = () => {
    context.fillStyle = "black";
    context.fillRect(0, 0, c.width, c.height);
    // at start in every iteration new canvas is drawn deleting previously filled objects and drawing them in different or same position
    // which makes them look like animation
    playerX += moveX * squareWidth; // move
    playerY += moveY * squareWidth; // move depending on moveY and moveX value
    if (playerX >= c.width) {
        playerX = 0;
    }
    if (playerX < 0) {
        playerX = c.width;
    }
    if (playerY >= c.height) {
        playerY = 0;
    }
    if (playerY < 0) {
        playerY = c.height;
    }
    // code above checks if player moves out of screen
    // and moves it back from the opposite side

    if (detectAppleCollision(playerX, playerY, appleX, appleY)) {
        tailLength++;
        score += 1 * gameSpeed / 15; // increase score with multiplier
        document.getElementById("score").textContent = score;
        appleX = getRandom(600);
        appleY = getRandom(600);
        // create new apples
    }

    for (let i = 0; i < tail.length; i++) {
        fillSnake(tail[i].pX, tail[i].pY); // fill every block in snake's length
        // below is self collision detection code
        if (tail[i].pX == playerX && tail[i].pY == playerY) {
            tailLength = 1;
            tail = [];
            playerX = 300;
            playerY = 300;
            moveX = moveY = 0;
            if (score > highScore) {
                highScore = score;
                document.getElementById("highScore").textContent = highScore;
            }
            score = 0;
            document.getElementById("score").textContent = score;
        }
    }
    // pushes block in every iteration
    tail.push({ pX: playerX, pY: playerY });
    // removes extra blocks from snake
    if (tailLength < tail.length) {
        tail.shift();
    }
    fillApple(appleX, appleY);
}
// LEFT 37 
// UP 38
// RIGHT 39
// DOWN 40
const handleKeyPress = event => {
    switch (event.keyCode) {
        case 37:
            if (!(lastKey == 39)) {
                lastKey = 37;
                moveX = -1;
                moveY = 0;
            }
            break;
        case 38:
            if (!(lastKey == 40)) {
                lastKey = 38;
                moveX = 0;
                moveY = -1;
            }
            break;
        case 39:
            if (!(lastKey == 37)) {
                lastKey = 39;
                moveX = 1;
                moveY = 0;
            }
            break;
        case 40:
            if (!(lastKey == 38)) {
                lastKey = 40;
                moveX = 0;
                moveY = 1;
            }
            break;
    }
}