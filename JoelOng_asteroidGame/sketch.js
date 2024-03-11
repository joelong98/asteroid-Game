var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score = 0;  // scoreboard //

//////////////////////////////////////////////////
function setup() {
    createCanvas(1200, 800);
    resetGame();
    var button = createButton("Reset", 20, 20);
    button.mousePressed(resetGame);
 
}

// Self-addition of a button "Reset" to restart the game by clicking the button during game or after "Game Over" //
function resetGame() {

    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();
    loop();

    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width / 2, height * 2.9);
    atmosphereSize = new createVector(width * 3, width * 3);
    earthLoc = new createVector(width / 2, height * 3.1);
    earthSize = new createVector(width * 3, width * 3);
    score = 0;

}

//////////////////////////////////////////////////
function draw() {

    background(0);
    sky();

    spaceship.run();
    asteroids.run();

    drawEarth();

    checkCollisions(spaceship, asteroids); // function that checks collision between various elements

    // scoreboard //
    scoreboard();
    
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
    noStroke();
    //draw atmosphere
    fill(0, 0, 255, 50);
    ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
    //draw earth
    fill(100, 255);
    ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {

    //console.log(asteroids.locations.length)//

    //spaceship-2-asteroid collisions
    for (let i = 0; i < asteroids.locations.length; i++) {
        if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) return gameOver();
    }

    //asteroid-2-earth collisions
    for (let i = 0; i < asteroids.locations.length; i++) {
        if (isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])) return gameOver();
    }

    //spaceship-2-earth
    if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)) return gameOver();

    //spaceship-2-atmosphere
    if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)) spaceship.setNearEarth();

    //bullet collisions
    for (let i = 0; i < spaceship.bulletSys.bullets.length; i++) {
        for (let j = 0; j < asteroids.locations.length; j++) {
            if (isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam, asteroids.locations[j], asteroids.diams[j])) return asteroids.destroy(j);
        }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
    let dx = locA.x - locB.x;
    let dy = locA.y - locB.y;
    let distance = sqrt((dx * dx) + (dy * dy));

    if (distance <= (sizeA + sizeB) / 2) return true;
    return false;
}

//////////////////////////////////////////////////
function keyPressed() {
    if (keyIsPressed && keyCode === 32) { // if spacebar is pressed, fire!
        spaceship.fire();
    }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
    fill(255,215,0);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width / 2, height / 2);
    noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
    push();
    while (starLocs.length < 300) {
        starLocs.push(new createVector(random(width), random(height)));
    }
    fill(255);
    for (var i = 0; i < starLocs.length; i++) {
        rect(starLocs[i].x, starLocs[i].y, 2, 2);
    }

    if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
    pop();
}

// scoreboard //
function scoreboard(){
    fill(255,0,0);
    textSize(20);
    textAlign(LEFT);
    text('Score: ' + score, 50, 20);
}

// Joel Ong // 
