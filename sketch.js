let firework1;
let firework2;
let firework3;
let firework4;
let firework5;
let firework6;
let firework7;
let firework8;
let firework9;
let firework10;
let firework11;
let firework12;
let firework13;
let firework14;
let firework15;
let firework16;
let firework17;
// Control the number of frames in the bloom cycle
let cycleDuration = 2000;
let whiteDots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(18, 88, 116);
  angleMode(DEGREES);

  // Create 17 fireworks
  firework1 = new Firework(0.14 * width, 0.13 * height, 0.5, 1);
  firework2 = new Firework(0.43 * width, 0.06 * height, 0.5, 1);
  firework3 = new Firework(0.73 * width, -0.01 * height, 0.5, 1);
  firework4 = new Firework(0.04 * width, 0.4 * height, 0.5, 1);
  firework5 = new Firework(0.33 * width, 0.36 * height, 0.5, 0);
  firework6 = new Firework(0.63 * width, 0.27 * height, 0.5, 0);
  firework7 = new Firework(0.95 * width, 0.21 * height, 0.5, 1);
  firework8 = new Firework(-0.02 * width, 0.7 * height, 0.5, 1);
  firework9 = new Firework(0.24 * width, 0.63 * height, 0.5, 0);
  firework10 = new Firework(0.56 * width, 0.56 * height, 0.5, 0);
  firework11 = new Firework(0.86 * width, 0.49 * height, 0.5, 1);
  firework12 = new Firework(0.16 * width, 0.91 * height, 0.5, 1);
  firework13 = new Firework(0.47 * width, 0.85 * height, 0.5, 1);
  firework14 = new Firework(0.76 * width, 0.77 * height, 0.5, 1);
  firework15 = new Firework(width, 0.74 * height, 0.5, 1);
  firework16 = new Firework(0.67 * width, 1.05 * height, 0.5, 1);
  firework17 = new Firework(0.95 * width, height, 0.5, 1);

  // Create randomly distributed white dots
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(5, 15);
    whiteDots.push(new WhiteDot(x, y, size));
  }
}

function draw() {
  let bgcol = color("#02496C");
  bgcol.setAlpha(5);
  background(bgcol);

  // Draw white dots
  for (let dot of whiteDots) {
    dot.show();
  }

  firework1.show();
  firework1.update();
  firework2.show();
  firework2.update();
  firework3.show();
  firework3.update();
  firework4.show();
  firework4.update();
  firework5.show();
  firework5.update();
  firework6.show();
  firework6.update();
  firework7.show();
  firework7.update();
  firework8.show();
  firework8.update();
  firework9.show();
  firework9.update();
  firework10.show();
  firework10.update();
  firework11.show();
  firework11.update();
  firework12.show();
  firework12.update();
  firework13.show();
  firework13.update();
  firework14.show();
  firework14.update();
  firework15.show();
  firework15.update();
  firework16.show();
  firework16.update();
  firework17.show();
  firework17.update();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  firework1.updatePosition(0.14 * width, 0.13 * height);
  firework2.updatePosition(0.43 * width, 0.06 * height);
  firework3.updatePosition(0.73 * width, -0.01 * height);
  firework4.updatePosition(0.04 * width, 0.4 * height);
  firework5.updatePosition(0.33 * width, 0.36 * height);
  firework6.updatePosition(0.63 * width, 0.27 * height);
  firework7.updatePosition(0.95 * width, 0.21 * height);
  firework8.updatePosition(-0.02 * width, 0.7 * height);
  firework9.updatePosition(0.24 * width, 0.63 * height);
  firework10.updatePosition(0.56 * width, 0.56 * height);
  firework11.updatePosition(0.86 * width, 0.49 * height);
  firework12.updatePosition(0.16 * width, 0.91 * height);
  firework13.updatePosition(0.47 * width, 0.85 * height);
  firework14.updatePosition(0.76 * width, 0.77 * height);
  firework15.updatePosition(width, 0.74 * height);
  firework16.updatePosition(0.67 * width, 1.05 * height);
  firework17.updatePosition(0.95 * width, height);

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
