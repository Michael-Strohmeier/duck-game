// assets\Stall

function mousePressed() {
	// duck.hitTarget(mouseX, mouseY);
	game.shoot(mouseX, mouseY);
}

function setup() {
	createCanvas(900, 500);

	bg = new Background();
	// duck = new Duck();

	game = new Game();
}

function draw() {
	// image(bgWood, 0, 0);
	clear();

	push();
	//translate(windowWidth / 2, windowHeight / 2);
	bg.draw();
	// duck.draw();
	pop();

	game.draw();

}

class Duck {
	constructor(yOffset) {
		this.yOffset = 250;

		this.x = -100;
		this.y = 0;
		this.targetY = 0;

		this.duck = loadImage("assets/Objects/duck_outline_yellow.png");
		this.target = loadImage("assets/Objects/target_red3.png");

		this.isActive = true;
	}

	setActive() {
		this.isActive = False;
	}

	hitTarget(x, y) {
		var dist = Math.sqrt(Math.pow((x - this.x), 2) + Math.pow((y - this.targetY), 2));
		// var targetRad = Math.sqrt(60);

		if (dist < 10) {
			return 10;
		}
		else if (dist < 22) {
			return 5;
		}
		else {
			return 0;
		}
	}

	update() {
		this.y = Math.cos(this.x / 65) * 60 + this.yOffset;
		this.targetY = this.y + 20;
	}

	draw() {
		this.x += 2.5;
		this.update();

		push();
		imageMode(CENTER);
		// translate(0, 500 / 2);

		image(this.duck, this.x, this.y);
		image(this.target, this.x, this.targetY, 44, 44);
		pop();
	}
}



class Background {
	constructor() {
		this.bgWood = loadImage("assets/bg_wood_large.png");
		this.curtain = loadImage("assets/Stall/curtain_full_left.png");
	}

	draw() {
		push();
		imageMode(CENTER);
		image(this.bgWood, 900 / 2, 500 / 2);
		pop();
	}
}


class Game {
	constructor() {
		this.points = 0;
		this.ducks = [];

		this.dateObj = new Date();
  	this.lastSpawnTime = this.dateObj.getTime();

		this.addDuck();
	}

	addDuck() {
		var dateObj = new Date();
		this.lastSpawnTime = dateObj.getTime();

		this.ducks.push(new Duck());
	}

	shoot(x, y) {
		var ducksLength = this.ducks.length;
		for (var i = 0; i < ducksLength; i++) {
		    let score = this.ducks[i].hitTarget(x, y);

				if (score != 0) {
					this.points += score;
					this.ducks.splice(i, 1);
					break;
				}
		}
	}

	update() {
		var dateObj = new Date();
		if ((dateObj.getTime() - this.lastSpawnTime) / 1000 > 2) {
			this.lastSpawnTime = dateObj.getTime();
			this.addDuck();
		}
	}

	draw() {
		textSize(32);
		text(this.points, 10, 30);
		fill(255);

		this.update();

		var ducksLength = this.ducks.length;
		for (var i = 0; i < ducksLength; i++) {
		    this.ducks[i].draw();
		}
	}
}
