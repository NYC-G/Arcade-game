// Enemies bugs our avatar must avoid
var Enemy = function(y) {
    this.x = Math.floor(Math.random() * 150) - 250;
    this.y = y;
    this.move = Math.floor(Math.random() * 250) + 200;
    this.sprite = 'images/enemy-bug.png';
};

// Update for the enemies bugs position and speed
Enemy.prototype.update = function(dt) {
    // The game runs at the same speed for all devices
    this.x += this.move * dt;
    // Reset for the enemies bugs to a random position off the canvas and change the speed
    if (this.x > 500) {
        this.x = Math.floor(Math.random() * 150) - 250;
        this.move = Math.floor(Math.random() * 300) + 200;
    }
};

// Draw the enemy bug on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Avatar
var Player = function() {
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 410;
    this.score = 0;
};

// Update the avatar to the default position after touch the water or touch an enemy bug
Player.prototype.update = function() {
    if (this.y < 0) {
        this.score++;
        document.getElementById("score").innerHTML = this.score;
        this.x = 200;
        this.y = 410;
    } else {
        this.checkCollision()
    }
};

// Draw the avatar on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the avatar with the user input
Player.prototype.handleInput = function(input) {
    if (input === 'left' && this.x > 0) {
        this.x -= 100;
    } else if (input === 'right' && this.x < 400) {
        this.x += 100;
    } else if (input === 'up' && this.y > -10) {
        this.y -= 84;
    } else if (input === 'down' && this.y < 410) {
        this.y += 84;
    }
};

// Check the avatar collision with enemies bugs
Player.prototype.checkCollision = function(){
    if (this.y === 242) {
        if (this.x < allEnemies[2].x + 76 && this.x + 76 > allEnemies[2].x) {
            this.x = 200;
            this.y = 410;
            this.score = 0;
            document.getElementById("score").innerHTML = this.score;
        }
    } else if (this.y === 158) {
        if (this.x < allEnemies[1].x + 76 && this.x + 76 > allEnemies[1].x) {
            this.x = 200;
            this.y = 410;
            this.score = 0;
            document.getElementById("score").innerHTML = this.score;
        }
    } else if (this.y === 74) {
        if (this.x < allEnemies[0].x + 76 && this.x + 76 > allEnemies[0].x) {
            this.x = 200;
            this.y = 410;
            this.score = 0;
            document.getElementById("score").innerHTML = this.score;
        }
    }
};

// Call avatar object
var player = new Player();

// Call enemy bug objects
var allEnemies = [
    new Enemy(60),
    new Enemy(145),
    new Enemy(225)
];

// Listens key inputs and sends the keys inputs to Player.handleInput()
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
