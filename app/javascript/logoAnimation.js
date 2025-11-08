// animationCanvas.js
window.addEventListener('load', () => {
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d');

  let topRectY, bottomRectY;
  let collide = false;
  let fadeControl = 255;
  let rectStrokeWeight = 7;
  let rectWidth = 0;
  let rectHeight = 0;
  const maxW = 120;
  const maxH = 100;
  const growSpeed = 30;

  const topRectEndY = 348;
  const bottomRectEndY = 410;

  const smallRects = [
    {x: 0.5, y: -0.5, delay: 30},
    {x: 0, y: -1, delay: 60},
    {x: -1, y: 0.6, delay: 90},
    {x: 0, y: 1, delay: 120},
    {x: -1, y: -1, delay: 150} 
  ];

  const maxSlide = 500;
  const slideSpeed = 0.5;
  const smallRectW = 50;
  const smallRectH = 80;
  const baseOffset = 200;

  let slideAmounts = smallRects.map(() => 0);
  let frameCountSinceCollision = 0;
  let slideAmount = 0;

  // Rounded rectangle helper
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function setup() {
    topRectY = topRectEndY - 150;
    bottomRectY = bottomRectEndY + 150;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.font = '75px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('DREW SMITH', 300, 400);
    ctx.font = '160px Arial';
    ctx.fillText('DS', 880, 460);

    // Move rectangles
    if (topRectY < topRectEndY) topRectY += 7;
    if (bottomRectY > bottomRectEndY) bottomRectY -= 7;

    collide = (topRectY === topRectEndY && bottomRectY === bottomRectEndY);
    frameCountSinceCollision = collide ? frameCountSinceCollision + 1 : 0;

    // Draw rectangles
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'black';
    roundRect(ctx, 800, topRectY, 60, 50, 9);
    ctx.stroke();
    roundRect(ctx, 800, bottomRectY, 60, 50, 9);
    ctx.stroke();

    // Collision effect
    if (collide) {
      if (rectWidth < maxW) rectWidth += growSpeed;
      if (rectHeight < maxH) rectHeight += growSpeed;
      fadeControl -= fadeSpeed;
      if (fadeControl < 0) fadeControl = 0;

      ctx.lineWidth = rectStrokeWeight;
      ctx.strokeStyle = `rgba(150,150,150,${fadeControl/255})`;
      ctx.fillStyle = 'transparent';
      roundRect(ctx, 830 - rectWidth / 2, 340 - rectHeight / 2, rectWidth, rectHeight, 9);
      ctx.stroke();

      // Small rectangles
      smallRects.forEach(({x, y, delay}, i) => {
        if (frameCountSinceCollision > delay && slideAmounts[i] < maxSlide) slideAmounts[i] += slideSpeed;
        const centerX = 830;
        const centerY = 380;
        const posX = centerX + (baseOffset + slideAmounts[i]) * x;
        const posY = centerY + (baseOffset + slideAmounts[i]) * y;
        roundRect(ctx, posX, posY, smallRectW, smallRectH, 5);
        ctx.stroke();
      });
    }

    requestAnimationFrame(draw);
  }

  // Play intro sound
  const introSound = document.getElementById('intro-sound');
  if (introSound) introSound.play().catch(() => {});

  setup();
  draw();

  // Fade out canvas & show main content
// home page JS (or keep in logoAnimation.js)
    setTimeout(() => {
    const canvasEl = document.getElementById('animation-canvas');
    canvasEl.classList.add('fade-out');

    setTimeout(() => {
        canvasEl.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 1000); // matches CSS fade duration
    }, 3000); // matches animation duration

});
