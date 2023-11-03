let firework1;

// Control the number of frames in the bloom cycle
let cycleDuration = 2000;
let whiteDots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angleMode(DEGREES);
  rectMode(CENTER);

  // Create 1 firework
  firework1 = new Firework(0.5 * width, 0.5 * height, 0.5, 1);

  // Create randomly distributed white dots
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 15);
    whiteDots.push(new WhiteDot(x, y, size));
  }
}

function draw() {
  firework1.show();
  let bgcol = color("#02496C");
  bgcol.setAlpha(5);
  fill(bgcol);
  noStroke();
  rect(windowWidth / 2, windowHeight / 2, 420, 584)

  // Draw white dots
  // for (let dot of whiteDots) {
  //   dot.show();
  // }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  firework1.updatePosition(0.5 * width, 0.5 * height);

  // Update the position of the white dot
  for (let dot of whiteDots) {
    dot.updatePosition(random(width), random(height));
  }
}

class Firework {
  constructor(x, y, expansionSpeed, rotationSpeed) {
    // firework position
    this.x = x;
    this.y = y;

    this.cycleStartTime = millis();
    this.rotation = 0;
    // Set bloom speed
    this.expansionSpeed = expansionSpeed;
    // Set rotation speed
    this.rotationSpeed = rotationSpeed;

    let colors1 = "CFDDFB-FCA522-E1FFF6-FBD2D9".split("-").map(a => "#" + a);
    this.FireworkColor = color(random(colors1));
    let colors2 = "110671-239940-D9354B-CE57B1-E7853C-089494".split("-").map(a => "#" + a);
    this.circleColor1 = color(random(colors2));
    let colors3 = "2F3333-DF4558-58A06B-75B5E0-BA5BD8".split("-").map(a => "#" + a);
    this.circleColor2 = color(random(colors3));
    this.circleColor3 = color(random(colors3));
    this.circleColor4 = color(random(colors3));
  }

  // draw fireworks
  show() {
    push();
    translate(this.x, this.y);
    fill(this.FireworkColor);
    noStroke();

    // Set time
    let time = millis() - this.cycleStartTime;
    let t = (time % cycleDuration) / cycleDuration;

    let size = map(t, 0, 1, 0, min(windowWidth, windowHeight) / 6);

    // Update rotation speed
    this.rotation += this.rotationSpeed;
    rotate(this.rotation);

    for (let i = 0; i < 360; i += 10) {
      let ex = size * sin(i);
      let ey = size * cos(i);
      ellipse(ex, ey, 10, 10);
      circle(ex, ey, 10);

      push();
      fill(this.circleColor1);
      circle(ex, ey, 5)
      pop();
    }
    fill(this.circleColor2)
    circle(0, 0, 50)

    fill(this.circleColor3)
    circle(0, 0, 40)

    fill(this.circleColor4)
    circle(0, 0, 20)

    pop();
  }

  // Fireworks bloom repeatedly
  update() {
    if (millis() - this.cycleStartTime >= cycleDuration) {
      this.cycleStartTime = millis();
    }
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

}

class WhiteDot {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  updatePosition(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}
