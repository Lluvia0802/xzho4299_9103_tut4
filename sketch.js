let firework1;
let rectWidth, rectHeight;
// A4 Size
let rectRatio = 210 / 297;
// Control the number of frames in the bloom cycle
let cycleDuration = 2000;
// let whiteDots = [];

function preload() {
  font1 = loadFont('assets/Balgin Black.ttf');
  font2 = loadFont('assets/Gliker Black.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  angleMode(DEGREES);

  calculateRectSize();

  // Create 1 firework
  firework1 = new Firework(0.5 * width, 0.5 * height, 0.5, 1);

  // // Create randomly distributed white dots
  // for (let i = 0; i < 50; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let size = random(5, 15);
  //   whiteDots.push(new WhiteDot(x, y, size));
  // }
}

function draw() {
  firework1.show();
  let bgcol = color("#02496C");
  bgcol.setAlpha(5);
  fill(bgcol);
  noStroke();
  let x = width / 2 - rectWidth / 2;
  let y = height / 2 - rectHeight / 2;
  rect(x, y, rectWidth, rectHeight);

  // Draw white dots
  // for (let dot of whiteDots) {
  //   dot.show();
  // }

  let textSizeMultiplier1 = 0.1;
  textFont(font2);
  textSize(textSizeMultiplier1 * windowHeight);
  fill('white');
  textLeading(rectHeight * 0.1);
  let textXOffset1 = (rectWidth * 0.05); // 调整此值来水平垂直偏移
  let textX1 = x + textXOffset1;
  let textYOffset1 = (rectHeight * 0.1); // 调整此值来控制垂直偏移
  let textY1 = y + textYOffset1;
  text('Wheels of Fortune', textX1, textY1, rectWidth - 30, rectHeight - 30);

  let textXOffset2 = (rectWidth * 0.05); // 调整此值来水平垂直偏移
  let textX2 = x + textXOffset2;
  let textYOffset2 = (rectHeight * 0.95); // 调整此值来控制垂直偏移
  let textY2 = y + textYOffset2;
  text('Exhibition', textX2, textY2);

  let textSizeMultiplier2 = 0.06;
  textFont(font1);
  textSize(textSizeMultiplier2 * windowHeight);
  fill('white');
  let textXOffset3 = (rectWidth * 0.05); // 调整此值来水平垂直偏移
  let textX3 = x + textXOffset3;
  let textYOffset3 = (rectHeight * 0.83); // 调整此值来控制垂直偏移
  let textY3 = y + textYOffset3;
  text('Pacita Abad', textX3, textY3);

  let textSizeMultiplier3 = 0.04;
  textFont(font1);
  textSize(textSizeMultiplier3 * windowHeight);
  fill('white');
  let textXOffset4 = (rectWidth * 0.1); // 调整此值来水平垂直偏移
  let textX4 = x + textXOffset4;
  let textYOffset4 = (rectHeight * 0.5); // 调整此值来控制垂直偏移
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
  // Update the position of the white dot
  // for (let dot of whiteDots) {
  //   dot.updatePosition(random(width), random(height));
  // }
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

// class WhiteDot {
//   constructor(x, y, size) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//   }

//   show() {
//     fill(255);
//     noStroke();
//     ellipse(this.x, this.y, this.size, this.size);
//   }

//   updatePosition(newX, newY) {
//     this.x = newX;
//     this.y = newY;
//   }
// }
