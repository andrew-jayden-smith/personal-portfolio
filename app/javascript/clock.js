import p5 from 'p5';

const squareClock = (p) => {
  let secondsRadius;
  let minutesRadius;
  let hoursRadius;
  let clockSize;

  p.setup = () => {
    // Fit canvas to container (adjust size as needed)
    const container = document.getElementById('clock-container');
    const size = Math.min(container.offsetWidth, container.offsetHeight);
    p.createCanvas(size, size).parent('clock-container');

    p.angleMode(p.DEGREES);

    let baseSize = size / 2; // base for radii
    secondsRadius = baseSize * 0.7;
    minutesRadius = baseSize * 0.6;
    hoursRadius = baseSize * 0.3;
    clockSize = baseSize * 1.7;
  };

  p.draw = () => {
    p.clear();
    p.translate(p.width / 2, p.height / 2);

    // Clock background
    p.noStroke();
    p.fill(240);
    p.rectMode(p.CENTER);
    p.rect(0, 0, clockSize + 25, clockSize + 25);
    p.fill(255);
    p.rect(0, 0, clockSize, clockSize);

    // Angles
    const secondAngle = p.map(p.second(), 0, 60, 0, 360);
    const minuteAngle = p.map(p.minute(), 0, 60, 0, 360);
    const hourAngle = p.map(p.hour() % 12, 0, 12, 0, 360);

    // Second hand
    p.push();
    p.rotate(secondAngle);
    p.stroke(0);
    p.strokeWeight(1);
    p.line(0, 0, 0, -secondsRadius);
    p.pop();

    // Minute hand
    p.push();
    p.rotate(minuteAngle);
    p.stroke(0, 0, 255);
    p.strokeWeight(2);
    p.line(0, 0, 0, -minutesRadius);
    p.pop();

    // Hour hand
    p.push();
    p.rotate(hourAngle);
    p.stroke(255, 0, 0);
    p.strokeWeight(4);
    p.line(0, 0, 0, -hoursRadius);
    p.pop();

    // Tick marks
    p.push();
    p.stroke(0);
    p.strokeWeight(2);
    for (let ticks = 0; ticks < 12; ticks++) {
      if (ticks === 0 || ticks === 3 || ticks === 6 || ticks === 9) continue;
      const angle = ticks * 30;
      const x = p.cos(angle) * secondsRadius;
      const y = p.sin(angle) * secondsRadius;
      p.rect(x, y, 2, 2);
    }
    p.pop();

    // Numbers 12,3,6,9
    p.fill(100);
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(clockSize / 6);
    p.text('12', 0, -clockSize / 2.8);
    p.text('3', clockSize / 2.8, 0);
    p.text('6', 0, clockSize / 2.8);
    p.text('9', -clockSize / 2.8, 0);
  };
};

new p5(squareClock);
