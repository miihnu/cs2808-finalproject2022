//canvas setup 
var canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 700;
canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:5px solid black";
document.body.insertBefore(canvas, document.body.firstChild);

ctx = canvas.getContext("2d");

var x = 150,  
    y = 150,  
    velY = 0,
    velX = 0,
    speed = 2, 
    friction = 0.98, // friction
    keys = [];

function draw() {
    requestAnimationFrame(draw);

    if (keys[38]) {
        if (velY > -speed) {
            velY--;
        }
    }

    if (keys[40]) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys[39]) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys[37]) {
        if (velX > -speed) {
            velX--;
        }
    }

       // apply some friction to y velocity.
       velY *= friction;
       y += velY;
   
       // apply some friction to x velocity.
       velX *= friction;
       x += velX;
   
       // bounds checking
       if (x >= canvas.width) {
           x = canvas.width;
       } else if (x <= 5) {
           x = 5;
       }
   
       if (y > canvas.height) {
           y = canvas.height;
       } else if (y <= 5) {
           y = 5;
       }
   
       // do the drawing
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.beginPath();
       ctx.arc(x, y, 10, 0, Math.PI * 2);
       ctx.fill();
}

draw();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

const gameStatus = {
	CONTINUE: 1,
	WIN: 2,
	LOSE: 3,
};


function gameStart() {

}

function makePlayer() {

    this.x = 0;
    this.y = 0;
    this.albums = 0;
    this.status = 0;

}

