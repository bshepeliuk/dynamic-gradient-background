const COLORS = [{ r: 19, g: 23, b: 47 }];

class GradientBackground {
  constructor(containerSelector) {
    this.$canvas = document.createElement("canvas");

    document.querySelector(containerSelector).appendChild(this.$canvas);

    this.ctx = this.$canvas.getContext("2d");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.totalParticles = 15;
    this.particles = [];
    this.maxRadius = 500;
    this.minRadius = 240;

    window.addEventListener("resize", this.resize, false);

    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight + 10;

    this.$canvas.width = this.stageWidth * this.pixelRatio;
    this.$canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  };

  createParticles = () => {
    let currentColor = 0;

    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        { r: 19, g: 23, b: 47 }
      );

      if (++currentColor >= COLORS.length) {
        currentColor = 0;
      }

      this.particles[i] = item;
    }
  };

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];

      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}

class GlowParticle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.vx = Math.random() * 4;
    this.vy = Math.random() * 4;

    this.sinValue = Math.random();
  }

  animate = (ctx, stageWidth, stageHeight) => {
    this.sinValue += 0.01;
    this.radius += Math.sin(this.sinValue);
    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.2;
    this.vy *= 0.2;

    if (this.x < 0) {
      this.vx *= -1;
      this.x += 10;
    } else if (this.x > stageWidth) {
      this.vx *= -1;
      this.x -= 10;
    }

    if (this.y < 0) {
      this.vy *= -1;
      this.y += 10;
    } else if (this.y > stageHeight) {
      this.vy *= -1;
      this.y -= 10;
    }

    ctx.beginPath();
    const g = ctx.createRadialGradient(
      this.x,
      this.y,
      this.radius * 0.01,
      this.x,
      this.y,
      this.radius
    );

    g.addColorStop(
      0,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`
    );
    g.addColorStop(
      1,
      `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`
    );

    ctx.fillStyle = g;
    // ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  };
}

window.addEventListener("DOMContentLoaded", () => {
  new GradientBackground("body");
});
