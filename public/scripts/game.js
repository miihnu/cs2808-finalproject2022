var canvas = document.createElement("canvas");
canvas.width = 900;
canvas.height = 600;
canvas.style = "position: absolute; top: 80px; left: 0px; right: 0px; bottom: 0px; margin: auto; border:5px solid black";
document.body.insertBefore(canvas, document.body.firstChild);

ctx = canvas.getContext("2d");

var kanye = new Image();
kanye.src = "img/ye.PNG";

var coincount = 0;

var bossActive = false;
var bossEaten = 0;

var coinTemp = new Image();
coinTemp.src = "img/tempCoin.PNG";

var randomx = Math.floor(Math.random() * (canvas.width - 30));
var randomy = Math.floor(Math.random() * (canvas.height - 30));

var enemyx = canvas.width / 2;
var enemyy = canvas.height / 2;

//tx and ty are the enemy coordinates 
var tx = canvas.width / 2;
var ty = canvas.height / 2;

var x = 150,  //initial x
    y = 150,  // initial y
    velY = 0,
    velX = 0,
    speed = 2.5, // max speed
    friction = 0.98, // friction
    keys = [];

function reset() {
    coincount = 0;
}

function draw_scene() {
    requestAnimationFrame(draw_scene);

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

    // i added 30 to the bounds checking offset because I know my kanye avatar is 30X30 pixels
    if (x >= canvas.width - kanye.width) {
        x = canvas.width - kanye.width;
    } else if (x <= 0) {
        x = 0;
    }

    if (y > canvas.height - kanye.height) {
        y = canvas.height - kanye.height;
    } else if (y <= 0) {
        y = 0;
    }

    upgrade();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.drawImage(kanye, x, y);

    if (coincount == 0 || coincount % 5 != 0) {
        spawnAlbum();
    } else {
        spawnEnemy();
        spawnHim();
    }

}

draw_scene();

document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

//spawns in an album in a random area on the canvas
function spawnAlbum() {
    requestAnimationFrame(spawnAlbum);
    if (((x < randomx && randomx < x + 30) || (randomx < x && x < randomx + 30) ) && ( (y < randomy && randomy < y + 33) || (randomy < y && y < randomy + 30))) {
        randomx = Math.floor(Math.random() * (canvas.width - 5));
        randomy = Math.floor(Math.random() * (canvas.height - 5));
        coincount++;
    }

    //determines if it is drawn
    if (coincount == 0 || coincount % 5 != 0) {
        ctx.drawImage(coinTemp, randomx, randomy);
    }
}

//determines if kanye grows bigger or not 
function upgrade() {
    if (coincount <= 5) {
        kanye.src = "img/ye.PNG";
    } else if (coincount > 5 && coincount <= 10 && bossEaten == 1) {
        kanye.src = "img/kanye60.PNG";
    } else if (coincount > 10 && coincount <= 15 && bossEaten == 2) {
        // kanye.src = 
    }
}

//enemy spawning
function spawnEnemy() {

    var rival = new Image();

    if (enemyx < x) {
        if (enemyy < y) {
            enemyx++;
            enemyy++;
        } else if (enemyy > y) {
            enemyx++;
            enemyy--;
        } else {
            enemyx++;
        }
    } else if (enemyx > x) {
        if (enemyy > y) {
            enemyx--;
            enemyy--;
        } else if (enemyy < y) {
            enemyx--;
            enemyy++;
        } else {
            enemyx--;
        }
    } else {
        if (enemyy > y) {
            enemyy--;
        } else if (enemyy < y) {
            enemyy++;
        }
    }

    if (enemyx >= canvas.width - rival.width) {
        enemyx = canvas.width - rival.width;
    } else if (enemyx <= 0) {
        enemyx = 0;
    }

    if (enemyy >= canvas.height - rival.height) {
        enemyy = canvas.height - rival.height;
    } else if (enemyy <= 0) {
        enemyy = 0;
    }

    if (((x < enemyx && enemyx < x + rival.width) || (enemyx < x && x < enemyx + rival.width)) && ( (y < enemyy && enemyy < y + rival.height) || (enemyy < y && y < enemyy + rival.height))) {
        console.log("game over!!");
    }

    if (coincount <= 5 && bossEaten == 0) {
        rival.src = "img/drake.PNG"
        ctx.drawImage(rival, enemyx, enemyy);
        
    } else if (coincount > 5 && coincount <= 10) {
        rival.src = "img/taylor.PNG"
        ctx.drawImage(rival, enemyx, enemyy);
    }
}

function spawnHim() {

    if (tx < x) {
        if (tx < y) {
            tx--;
            ty--;
        } else if (ty > y) {
            tx--;
            ty++;
        } else {
            tx--;
        }
    } else if (tx > x) {
        if (ty > y) {
            tx++;
            ty++;
        } else if (ty < y) {
            tx++;
            ty--;
        } else {
            tx++;
        }
    } else {
        if (ty > y) {
            ty++;
        } else if (enemyy < y) {
            ty--;
        }
    }

    if (tx >= canvas.width - kanye.width) {
        tx = canvas.width - kanye.width;
    } else if (tx <= 0) {
        tx = 0;
    }

    if (ty >= canvas.height - kanye.height) {
        ty = canvas.height - kanye.height;
    } else if (ty <= 0) {
        ty = 0;
    }

    if (bossEaten == 0) {
        var ill = new Image();
        ill.src = "img/triangle.PNG";
        ctx.drawImage(ill, tx, ty);
    }

    if (((x < tx && tx < x + kanye.width) || (tx < x && x < tx + kanye.width) ) && ( (y < ty && ty < y + kanye.height) || (ty < y && y < ty + kanye.height))) {
        bossEaten++;
        coincount++;
        console.log(coincount);
    }

}
