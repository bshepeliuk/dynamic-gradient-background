class GradientAnimation {
  constructor() {
    this.cnv = document.querySelector(`canvas`);
    this.ctx = this.cnv.getContext(`2d`);

    this.circlesNum = 15;
    this.minRadius = 100;
    this.maxRadius = 600;
    this.speed = 0.005;

    (window.onresize = () => {
      this.setCanvasSize();
      this.createCircles();
    })();
    this.drawAnimation();
  }
  setCanvasSize() {
    this.w = this.cnv.width = innerWidth * devicePixelRatio;
    this.h = this.cnv.height = innerHeight * devicePixelRatio;

    this.ctx.scale(devicePixelRatio, devicePixelRatio);
  }
  createCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; ++i) {
      this.circles.push(
        new Circle(this.w, this.h, this.minRadius, this.maxRadius)
      );
    }
  }
  drawCircles() {
    this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
  }
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }
  drawAnimation() {
    this.clearCanvas();
    this.drawCircles();
    window.requestAnimationFrame(() => this.drawAnimation());
  }
}

class Circle {
  constructor(w, h, minR, maxR) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * (maxR - minR) + minR;
  }
  draw(ctx, speed) {
    this.angle += speed;

    const x = this.x + Math.cos(this.angle) * 200;
    const y = this.y + Math.sin(this.angle) * 200;

    const g = ctx.createRadialGradient(
      x,
      y,
      this.radius * 0.2,
      x,
      y,
      this.radius
    );

    g.addColorStop(0, `rgba(29,23,47, 1)`);
    g.addColorStop(1, `rgba(29,23,47, 0)`);

    ctx.fillStyle = g;

    // ctx.globalCompositeOperation = `overlay`;
    // ctx.fillStyle = gradient;
    // ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

window.onload = () => {
  new GradientAnimation();
};
