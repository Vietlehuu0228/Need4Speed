
// Add game components
var myGamePiece;
var mObstacle;
const mSpeed = 2;

function startGame() {
	mGamePiece = new component(30, 30, "red", 10, 120);
	mObstacle = new component(10, 200, "green", 300, 120);
	mGameArea.start();
}

var mGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[1]);
		this.interval = setInterval(updateGameArea, 20);
	},
	stop: function() {
		clearInterval(this.interval);
	},
	clear: function() {
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function() {
		ctx = mGameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);		
	}	
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	this.crashWith = function(obs) {
		//Game piece position
		var _left = this.x;
		var _right = this.x + this.width;
		var _top = this.y;
		var _bottom = this.y + this.height;
		//Obstacle position
		var obsLeft = obs.x;
		var obsRight = obs.x + obs.width;
		var obsTop = obs.y;
		var obsBottom = obs.y + obs.height;
		var crash = true;
		if ((_bottom < obsTop) || (_top > obsBottom) || (_right < obsLeft) || (_left > obsRight)) {
			crash = false;
		}
		return crash;
	}
}

function updateGameArea() {
	if (mGamePiece.crashWith(mObstacle)) {
		mGameArea.stop();
	} else {
		mGameArea.clear();
		mObstacle.x += -1;
		mObstacle.update();
		mGamePiece.newPos();
		mGamePiece.update();
	}
	
}

function moveUp() {
	mGamePiece.speedY -= mSpeed;
}

function moveDown() {
	mGamePiece.speedY += mSpeed;
}

function moveLeft() {
	mGamePiece.speedX -= mSpeed;
}

function moveRight() {
	mGamePiece.speedX += mSpeed;
}

function moveStop() {
	mGamePiece.speedX = 0;
	mGamePiece.speedY = 0;
}