const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    width: 50,
    height: 50,
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    speed: 7,
    dx: 0
};

const objects = [];
const objectWidth = 30;
const objectHeight = 30;
const objectSpeed = 3;

let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObject(object) {
    ctx.fillStyle = 'red';
    ctx.fillRect(object.x, object.y, objectWidth, objectHeight);
}

function createObject() {
    const x = Math.random() * (canvas.width - objectWidth);
    objects.push({ x, y: 0 });
}

function moveObjects() {
    objects.forEach((object, index) => {
        object.y += objectSpeed;

        // Check for collision
        if (
            object.x < player.x + player.width &&
            object.x + objectWidth > player.x &&
            object.y < player.y + player.height &&
            object.y + objectHeight > player.y
        ) {
            objects.splice(index, 1);
            score++;
        }

        // Remove objects that fall off the screen
        if (object.y > canvas.height) {
            objects.splice(index, 1);
            gameOver = true;
        }
    });
}

function drawObjects() {
    objects.forEach(drawObject);
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function movePlayer() {
    player.x += player.dx;

    // Wall detection
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function update() {
    clear();

    drawPlayer();
    drawObjects();
    drawScore();

    movePlayer();
    moveObjects();

    if (!gameOver) {
        requestAnimationFrame(update);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
    }
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'ArrowRight' ||
        e.key === 'Right' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Left'
    ) {
        player.dx = 0;
    }
}

// Event listeners
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start the game
setInterval(createObject, 1000);
update();
