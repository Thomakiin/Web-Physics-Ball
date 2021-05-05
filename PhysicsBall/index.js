console.log("hello from index.js !"); // you can see this message in your browser by pressing ctrl shift i or going to ... -> more tools -> developer tools -> and then open the console 

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let radius = 30;

let x = 100; let y = 100; // Position
let vx = 1; let vy = 1; // Velocity
let ax = 0; let ay = 0; // Acceleration
let moveSpeed = 0.5;
let friction = 0.95;

let upInput = false; let downInput = false;
let leftInput = false; let rightInput = false;


function clearCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawCircle() {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}


function keyDown(event) {
    // this function is called when any key is PRESSED

    if (event.keyCode == 38) {
        // up arrow
        upInput = true;
    }
    if (event.keyCode == 40) {
        // down arrow
        downInput = true;
    }

    if (event.keyCode == 37) {
        // left arrow
        leftInput = true;
    }
    if (event.keyCode == 39) {
        // right arrow
        rightInput = true;
    }
}

function keyUp(event) {
    // this function is called when any key is RELEASED
    if (event.keyCode == 38) {
        // up arrow
        upInput = false;
    }
    if (event.keyCode == 40) {
        // down arrow
        downInput = false;
    }

    if (event.keyCode == 37) {
        // left arrow
        leftInput = false;
    }
    if (event.keyCode == 39) {
        // right arrow
        rightInput = false;
    }
}

function handleInput() {
    // add acceleration based on directional input

    if (downInput) {
        ay = moveSpeed;
    }
    else if (upInput) {
        ay = -moveSpeed;
    }
    else {
        // Neither vertical direction
        ay = 0;
    }

    if (rightInput) {
        ax = moveSpeed;
    }
    else if (leftInput) {
        ax = -moveSpeed;
    }
    else {
        // Neither vertical direction
        ax = 0;
    }
}
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function loop() {
    clearCanvas();
    handleInput();

    // update physics: (acceleration, velocity, position)
    vx += ax;
    vy += ay;
    x += vx;
    y += vy;
    
    drawCircle();

    // bounce in the opposite direction if we go out of bounds. Include our radius in the check so it's not just our coordinate being checked
    if (x + radius >= canvas.width || x - radius  <= 0 ) {
        vx *= -1.5;
        ax = 0;
    }
    if (y + radius >= canvas.height || y - radius <= 0) {
        vy *= -1.5;
        ay = 0;
    }

    // add friction to slow down movement
    vx *= friction;
    vy *= friction;
}

setInterval(loop, 1000 / 60);