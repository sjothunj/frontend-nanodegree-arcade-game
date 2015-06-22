frontend-nanodegree-arcade-game
===============================
Open the index.html file to start the game.
Your player will initially appear at the bottom of the screen.
Enemy bugs are patrolling the pathways between the lawn and the stream.
The objective of the game is to use the arrow keys (up/down/right/left) to move from the lawn to the safety of the stream while avoiding the bugs.
Once you have reached the safety of the stream or been hit by a patrolling bug your player will be moved back to the initial position to try again.

If you would like to change the speed of the game you can do so by editing either or both of the following variables in app.js
maxEnemySpeed specifies the max speed an enemy can move. This multiplier is used when the enemy is created. The default is 5.
gameSpeed dictates the overall speed of the game and can be changed to be any positive integer value. The default is 50.