
// Add game components
var myGamePiece;
var mObstacle = [];
var mSpeed = 2;
var mObsSpd  = 1;
var mScore = 0;
var addSpd = true;
var mInterval = 150;

function startGame() {
	mGamePiece = new component(30, 30, "car.png", 10, 120, "image");
	//mObstacle = new component(10, 200, "green", 300, 120);
	mScore = new component("30px", "Consolas", "black", 280, 40, "text");
	mGameArea.start();
}

var mGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
		this.frameNo = 0;
		/*
		window.addEventListener('mousemove', function (e) {
		  mGameArea.x = e.pageX;
		  mGameArea.y = e.pageY;
		})
		*/
	},
	stop: function() {
		clearInterval(this.interval);
		document.getElementById("reset").style.display = "block";
		
	},
	clear: function() {
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.width = width;
	this.height = height;
	this.type = type;
	if (type == "image") {
		this.image = new Image();
		this.image.src = color;
	}
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.update = function() {
		ctx = mGameArea.context;
		ctx.fillStyle = color;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;			
			ctx.fillText(this.text, this.x, this.y);			
		} else if (this.type == "image") {
			ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width,
				this.height);
		}else {
			ctx.fillRect(this.x, this.y, this.width, this.height);		
		}
		
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
	var x, y;
	for (i = 0; i < mObstacle.length; i++) {
		if (mGamePiece.crashWith(mObstacle[i])) {
			mGameArea.stop();
			return;
		}
	}
	
	mGameArea.clear();
	mGameArea.frameNo +=1;
	//console.log(mGameArea.frameNo.toString());
	if (mGameArea.frameNo == 1 || everyInterval(mInterval)) {
		x = mGameArea.canvas.width;
		minHeight = 20;
		maxHeight = 200;
		height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
		
		minGap = 60; 
		maxGap = 200;
		gap = Math.floor(Math.random()*(maxGap - minGap+1)+minGap); 
		mObstacle.push(new component(10, height, "green", x, 0));
		mObstacle.push(new component(10, x-height-gap, "green", x, height+gap));
	}
	for (i = 0; i < mObstacle.length; i++) {
		mObstacle[i].x += -mObsSpd;
		mObstacle[i].update();
	}
	
	mScore.text = "SCORE: " + mGameArea.frameNo;
	mScore.update();
	//mObsSpd = Math.random()*10;
	if (mObstacle.length %16 == 0 & everyInterval(mInterval) & (mInterval>10)) {
		if (addSpd) {
			mObsSpd +=1;
			//mInterval = Math.floor(Math.random()*(150-100))+100;
			mInterval = Math.floor(150/mObsSpd);
			addSpd = false;
			console.log("obs number: " + mObstacle.length.toString());
			console.log("interval: " + mInterval.toString());
		}
	} else {
		addSpd = true;
	}
	/*
	if (mGameArea.x && mGameArea.y) {
		mGamePiece.x = mGameArea.x;
		mGamePiece.y = mGameArea.y; 
	  }
	  */
	mGamePiece.newPos();
	mGamePiece.update();
	
	
}

function everyInterval(n) {
	return ((mGameArea.frameNo / n) % 1 == 0);
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

function reset() {
	mGameArea.clear();
	mGameArea.stop();
	mGameArea.frameNo = 1;
	mObstacle=[];
	mObsSpd = 1;
	addSpd = true;
	mInterval=150;
	startGame();
	document.getElementById('reset').style.display='none';
}