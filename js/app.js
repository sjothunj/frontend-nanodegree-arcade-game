// Enemies our player must avoid
var Enemy = function(row) {
    this.x = -100; // initial x coordinate
    this.y = (row * 83) + 63; // initial y coordinate. The water takes 63 pixels and each row after that take 83.
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * maxEnemySpeed) + 1; // randomly assign the speed for this instance of the enemy
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers
    if (this.x > 505) { // if the enemy has crossed the screen then
        this.x = -100; // move that enemy back to the left side
    } else {
        this.x = this.x + (Math.abs(this.speed*dt)*gameSpeed); // move the enemy to the right
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// the Player class with update(), render() and handleInput() methods.
var Player = function() {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
    this.x = 202; // initial x coordinate
    this.y = 415; // initial y coordinate
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
// check if the player has reached the water or whether the player has 'collided' with an enemy
    if (this.y === 0) { // the player made it across so we'll set the reset flag
        this.reset();
    } else {
        for (var i = 0; i < maxEnemies; i++) { // check each Enemy in the array
            // NOTE: there is a 20 pixel offset of y coord of enemy and player relative to the "row" they occupy
            // for the purposes of collision detection.
            if (this.y == allEnemies[i].y + 20) {
                // if the player is on the same row as the Enemy we are checking in the array then
                // the right hand side of the image collides before the y coord
                //var closeEnough = (this.x - allEnemies[i].x); // how far away is the player from the enemy
                if ((this.x - allEnemies[i].x) > 0 && (this.x - allEnemies[i].x) < 75){
                    this.reset();
                }
            }
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(arrowKey) {
// handle the input
    switch (arrowKey) {
        case "up":
            if (this.y > 0) {this.y = this.y - 83};
            break;
        case "down":
            if (this.y < 415) {this.y = this.y + 83};
            break;
        case "left":
            if (this.x > 0) {this.x = this.x - 101};
            break;
        case "right":
            if (this.x < 404) {this.x = this.x + 101};
            break;
    }
};
Player.prototype.reset = function(){
    this.x = 202; // initial x coordinate
    this.y = 415; // initial y coordinate
};
var maxEnemies = 3; // set the maximum number of enemies. One per row for now
// these two variables can be edited to change the top speed of the enemies and the overall speed of the game
var maxEnemySpeed = 5; // specify the max speed an enemy can move (1=slow, 2=normal, 3=fast)
var gameSpeed = 50; // multiplier to dictate the speed that the enemies move
// Now instantiate your objects.
// Array object for all enemy objects, called allEnemies
var allEnemies = [];
for (var i = 0; i < maxEnemies; i++) {
    allEnemies.push(new Enemy(i));
}
// Place the instance of the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});