let firework1;
let rectWidth, rectHeight;
// A4 Size
let rectRatio = 210 / 297;
// Control the number of frames in the bloom cycle
let noiseOffset = 0.0;
let noiseIncrement = 0.01;
// Initial number of ellipses
let ellipseCount = 36;

const stars = []

function preload() {
  font1 = loadFont('assets/Balgin Black.ttf');
  font2 = loadFont('assets/Gliker Black.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  angleMode(DEGREES);

  calculateRectSize();

  // Create 1 firework
  firework1 = new Firework(0.5 * width, 0.5 * height, 0.5, 1);

  noStroke()
  const starCount = parseInt(width * height / (width + height)) / 2;
  for (let i = 0; i < starCount; i++) {
    const startPos = createVector(random(width), random(height))
    stars.push(new Star(startPos))
  }
}


function draw() {
  if (frameCount % 1000 === 0) { // The interval for refreshing the background
    background(0);
  }
  stars.forEach(star => {
    star.update()
    star.display()
  })

  let bgcol = color("#02496C");
  bgcol.setAlpha(10);
  fill(bgcol);
  noStroke();
  let x = width / 2 - rectWidth / 2;
  let y = height / 2 - rectHeight / 2;
  rect(x, y, rectWidth, rectHeight);

  // Use perlin noise to control bloom speed
  let noiseFactor = noise(noiseOffset);
  // Adjust bloom period based on noise value
  cycleDuration = map(noiseFactor, 0, 1, 200, 800);

  firework1.show();
  firework1.update();

  // Use perlin noise to control the size of fireworks
  let sizeFactor = map(noise(noiseOffset + 1000), 0, 1, 0.5, 2.0);
  // Adjust the maximum size of fireworks based on noise value
  firework1.maxSize = min(width, height) * 0.1 * sizeFactor;

  noiseOffset += noiseIncrement;

  let textSizeMultiplier1 = 0.1;
  textFont(font2);
  textSize(textSizeMultiplier1 * windowHeight);
  fill('white');
  textLeading(rectHeight * 0.1);
  // Adjust this value to offset horizontally and vertically
  let textXOffset1 = (rectWidth * 0.05);
  let textX1 = x + textXOffset1;
  // Adjust this value to control vertical offset
  let textYOffset1 = (rectHeight * 0.1);
  let textY1 = y + textYOffset1;
  text('Wheels of Fortune', textX1, textY1, rectWidth - 30, rectHeight - 30);

  // Adjust this value to offset horizontally and vertically
  let textXOffset2 = (rectWidth * 0.05);
  let textX2 = x + textXOffset2;

  // Adjust this value to control vertical offset
  let textYOffset2 = (rectHeight * 0.95);
  let textY2 = y + textYOffset2;
  text('Exhibition', textX2, textY2);

  let textSizeMultiplier2 = 0.06;
  textFont(font1);
  textSize(textSizeMultiplier2 * windowHeight);
  fill('white');
  let textXOffset3 = (rectWidth * 0.05);
  let textX3 = x + textXOffset3;
  let textYOffset3 = (rectHeight * 0.83);
  let textY3 = y + textYOffset3;
  text('Pacita Abad', textX3, textY3);

  let textSizeMultiplier3 = 0.04;
  textFont(font1);
  textSize(textSizeMultiplier3 * windowHeight);
  fill('white');
  let textXOffset4 = (rectWidth * 0.1);
  let textX4 = x + textXOffset4;
  let textYOffset4 = (rectHeight * 0.5);
  let textY4 = y + textYOffset4;
  push();
  translate(textX4, textY4);
  rotate(-90);
  textAlign(CENTER, CENTER);
  text('City of Sydney', 0, 0);
  pop();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  firework1.updatePosition(0.5 * width, 0.5 * height);
  calculateRectSize();
  background(0);
}

function calculateRectSize() {
  if (windowWidth / windowHeight < rectRatio) {
    // If the window's aspect ratio is less than the rectangle's ratio, use the window's width as the base
    rectWidth = windowWidth;
    rectHeight = windowWidth / rectRatio;
  } else {
    // If the window's aspect ratio is greater than or equal to the rectangle's ratio, use the window's height as the base
    rectHeight = windowHeight;
    rectWidth = windowHeight * rectRatio;
  }
}

class Firework {
  constructor(x, y) {
    // firework position
    this.x = x;
    this.y = y;
    this.maxSize = min(width, height) * 0.1;
    this.size = 0;
    this.cycleStartTime = millis();

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

    let size = map(t, 0, 1, 0, this.maxSize);

    for (let i = 0; i < 360; i += 360 / ellipseCount) {
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

class Star {
  constructor(vLocation) {
    this.position = vLocation;
    this.velocity = createVector();
    this.accelration = createVector();
    this.color = random(255);
    this.size = random(1, 3);
    this.initDirection();

  }

  initDirection() {
    const centerPos = createVector(width / 2, height / 2);
    const t = millis() * 0.001; // Using time as noise input
    const noiseValue = noise(t) * 2 - 1; // Generates noise values in the range -1 to 1
    const speed = map(noiseValue, -1, 1, 0.1, 0.2); // Adjust speed range
    const movingDirection = p5.Vector.sub(this.position, centerPos).normalize();
    this.accelration = movingDirection.mult(speed);
  }

  update() {
    this.velocity.add(this.accelration);
    this.position.add(this.velocity);
    this.checkEdge();
  }

  display() {
    fill(this.color)
    const distance = p5.Vector.sub(this.position, createVector(width / 2, height / 2)).mag()
    const size = map(distance, 0, width / 2, 0, this.size)
    circle(this.position.x, this.position.y, size)
  }

  reset() {
    this.position = createVector(
      random(width),
      random(height)
    )
    this.velocity = createVector()
    this.initDirection()
  }

  checkEdge() {
    if (this.position.x > width || this.position.x < 0
      || this.position.y > height || this.position.y < 0
    ) {
      this.reset()
    }
  }
}

function mousePressed() {
  let colors = "6d59ff-95b5f6-4bebf5-8bacfa".split("-").map(a => "#" + a);
  firework1.FireworkColor = color(random(colors));

  let possibleEllipseCounts = [5, 10, 12, 15, 18, 20, 24, 36];
  ellipseCount = random(possibleEllipseCounts);
}