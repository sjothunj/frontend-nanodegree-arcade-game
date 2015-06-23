"use strict";
// Enemies our player must avoid
var Enemy = function(row) {
    // initial x coordinate. The enemy sprite is 101 pixels. This places them just off the canvas.
    this.x = -100;
    // initial y coordinate.  The offset for the first row (water) takes 63 pixels.
    // Each row after that take 83 pixels to align the enemy bug in each path correctly.
    this.y = (row * 83) + 63;
// The image/sprite for our enemies, this use a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * maxEnemySpeed) + 1; // randomly assign the speed for this instance of the enemy
};
// Update the enemy's position. The parameter dt is the time between 'ticks' of the game engine
// It is passed as a multiplier to equalize the speed across browsers
Enemy.prototype.update = function(dt) {
    if (this.x > 505) { // if the enemy has crossed the screen (x coord is the width of the canvas) then
        this.x = -100; // move that enemy back to the left side so they are just off the canvas
    } else {
        // 'move' the enemy to the right, factoring the assigned speed, the host machine speed (dt)
        // and the overall speed multiplier applied to this instance of the game. See README.md for info on gameSpeed
        this.x = this.x + (Math.abs(this.speed*dt)*gameSpeed); // move the enemy to the right
    }
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// the Player class with additional update(), render() and handleInput() methods.
var Player = function() {
// set the initial coordinates for the player to the starting position
    this.reset();
// assign the character to the player sprite
    this.sprite = 'images/char-boy.png';
};

// function checks if the player has reached the water or whether the player has 'collided' with an enemy
Player.prototype.update = function() {
    if (this.y === -20) { // the player made it across (top of canvas) so reset their position
        this.reset();
    } else {
        for (var i = 0; i < maxEnemies; i++) { // check against each Enemy in the array
            // NOTE: there is a 20 pixel offset of y coord of enemy and player relative to the "row" they occupy
            // for the purposes of collision detection.
            if (this.y == allEnemies[i].y) {
                // if the player is on the same row (same y coord.) as the Enemy instance then
                // if there is any overlap between the player and enemy (collision!)then reset the player
                // the 16 and 85 are because of 16 pixels of whitespace either side of the player image
                // and the 101 is the width of the enemy image.
                if ((allEnemies[i].x >= (this.x + 16) && allEnemies[i].x <= (this.x + 85)) 
					|| ((allEnemies[i].x + 101) >= (this.x + 16) && (allEnemies[i].x + 101) <= (this.x + 85)))
				{
                    this.reset();
                }
            }
        }
    }
};
// simple rendering function to draw the player instance
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Checks which key was pressed and checks whether the player has reached the boundary in that direction
// if not, the position of the player is updated, moving them in the direction indicated by the key pressed
Player.prototype.handleInput = function(arrowKey) {
// handle the input
    switch (arrowKey) {
        case "up":
            if (this.y > -20) {this.y = this.y - 83;}
            break;
        case "down":
            if (this.y < 395) {this.y = this.y + 83;}
            break;
        case "left":
            if (this.x > 0) {this.x = this.x - 101;}
            break;
        case "right":
            if (this.x < 404) {this.x = this.x + 101;}
            break;
    }
};
// the reset function places the instance of the player back at the starting position
Player.prototype.reset = function(){
    this.x = 202; // initial x coordinate
    this.y = 395; // initial y coordinate
};

// here is where the global variables and player and enemy instances are declared
var maxEnemies = 3; // set the maximum number of enemies. One per row for now
// these two variables can be edited to change the max speed of an enemy bugs and the overall speed of the game
var maxEnemySpeed = 5; // specify the max speed an enemy can move (1=slow, 2=normal, 3=fast)
var gameSpeed = 50; // multiplier to dictate the speed that the enemies move
// Array object for all enemy objects, called allEnemies
var allEnemies = [];
for (var i = 0; i < maxEnemies; i++) {
    allEnemies.push(new Enemy(i));
}
// Create a new instance of the player object in a variable called player
var player = new Player();
// Event listener capture the key press (release) and maps and passes the string
// indicating which directional key was pressed by the user
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});