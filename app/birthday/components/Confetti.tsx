'use client';

import { useEffect, useRef } from 'react';

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const retina = window.devicePixelRatio || 1;
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    
    canvas.width = canvasWidth * retina;
    canvas.height = canvasHeight * retina;

    const colors = [
      ['#df0049', '#660671'],
      ['#00e857', '#005291'],
      ['#2bebbc', '#05798a'],
      ['#ffd200', '#b06c00']
    ];

    const DEG_TO_RAD = Math.PI / 180;
    const duration = 1.0 / 60.0;

    // Vector2 class
    class Vector2 {
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }

      Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }

      Add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
      }

      Sub(v: Vector2) {
        this.x -= v.x;
        this.y -= v.y;
      }

      Mul(s: number) {
        this.x *= s;
        this.y *= s;
      }

      Normalize() {
        const len = this.Length();
        if (len > 0) {
          this.x /= len;
          this.y /= len;
        }
      }

      static Sub(v1: Vector2, v2: Vector2) {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
      }
    }

    // EulerMass class for physics
    class EulerMass {
      position: Vector2;
      mass: number;
      drag: number;
      force: Vector2;
      velocity: Vector2;

      constructor(x: number, y: number, mass: number, drag: number) {
        this.position = new Vector2(x, y);
        this.mass = mass;
        this.drag = drag;
        this.force = new Vector2(0, 0);
        this.velocity = new Vector2(0, 0);
      }

      AddForce(f: Vector2) {
        this.force.Add(f);
      }

      Integrate(dt: number) {
        const acc = new Vector2(this.force.x / this.mass, this.force.y / this.mass);
        acc.Mul(dt);
        this.velocity.Add(acc);
        this.velocity.Mul(this.drag);
        const vel = new Vector2(this.velocity.x, this.velocity.y);
        vel.Mul(dt);
        this.position.Add(vel);
        this.force = new Vector2(0, 0);
      }
    }

    // ConfettiPaper class
    class ConfettiPaper {
      static bounds = new Vector2(0, 0);
      pos: Vector2;
      rotationSpeed: number;
      angle: number;
      rotation: number;
      cosA: number;
      size: number;
      oscillationSpeed: number;
      xSpeed: number;
      ySpeed: number;
      corners: Vector2[];
      time: number;
      frontColor: string;
      backColor: string;

      constructor(x: number, y: number) {
        this.pos = new Vector2(x, y);
        this.rotationSpeed = Math.random() * 600 + 800;
        this.angle = DEG_TO_RAD * Math.random() * 360;
        this.rotation = DEG_TO_RAD * Math.random() * 360;
        this.cosA = 1.0;
        this.size = 5.0;
        this.oscillationSpeed = Math.random() * 1.5 + 0.5;
        this.xSpeed = 40.0;
        this.ySpeed = Math.random() * 60 + 50.0;
        this.corners = [];
        this.time = Math.random();
        
        const ci = Math.round(Math.random() * (colors.length - 1));
        this.frontColor = colors[ci][0];
        this.backColor = colors[ci][1];

        for (let i = 0; i < 4; i++) {
          const dx = Math.cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
          const dy = Math.sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
          this.corners[i] = new Vector2(dx, dy);
        }
      }

      Update(dt: number) {
        this.time += dt;
        this.rotation += this.rotationSpeed * dt;
        this.cosA = Math.cos(DEG_TO_RAD * this.rotation);
        this.pos.x += Math.cos(this.time * this.oscillationSpeed) * this.xSpeed * dt;
        this.pos.y += this.ySpeed * dt;
        
        if (this.pos.y > ConfettiPaper.bounds.y) {
          this.pos.x = Math.random() * ConfettiPaper.bounds.x;
          this.pos.y = 0;
        }
      }

      Draw(g: CanvasRenderingContext2D) {
        g.fillStyle = this.cosA > 0 ? this.frontColor : this.backColor;
        g.beginPath();
        g.moveTo(
          (this.pos.x + this.corners[0].x * this.size) * retina,
          (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina
        );
        
        for (let i = 1; i < 4; i++) {
          g.lineTo(
            (this.pos.x + this.corners[i].x * this.size) * retina,
            (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina
          );
        }
        
        g.closePath();
        g.fill();
      }
    }

    // ConfettiRibbon class
    class ConfettiRibbon {
      static bounds = new Vector2(0, 0);
      particleDist: number;
      particleCount: number;
      particleMass: number;
      particleDrag: number;
      particles: EulerMass[];
      frontColor: string;
      backColor: string;
      xOff: number;
      yOff: number;
      position: Vector2;
      prevPosition: Vector2;
      velocityInherit: number;
      time: number;
      oscillationSpeed: number;
      oscillationDistance: number;
      ySpeed: number;

      constructor(x: number, y: number, count: number, dist: number, thickness: number, angle: number, mass: number, drag: number) {
        this.particleDist = dist;
        this.particleCount = count;
        this.particleMass = mass;
        this.particleDrag = drag;
        this.particles = [];
        
        const ci = Math.round(Math.random() * (colors.length - 1));
        this.frontColor = colors[ci][0];
        this.backColor = colors[ci][1];
        
        this.xOff = Math.cos(DEG_TO_RAD * angle) * thickness;
        this.yOff = Math.sin(DEG_TO_RAD * angle) * thickness;
        this.position = new Vector2(x, y);
        this.prevPosition = new Vector2(x, y);
        this.velocityInherit = Math.random() * 2 + 4;
        this.time = Math.random() * 100;
        this.oscillationSpeed = Math.random() * 2 + 2;
        this.oscillationDistance = Math.random() * 40 + 40;
        this.ySpeed = Math.random() * 40 + 80;

        for (let i = 0; i < this.particleCount; i++) {
          this.particles[i] = new EulerMass(x, y - i * this.particleDist, this.particleMass, this.particleDrag);
        }
      }

      Update(dt: number) {
        this.time += dt * this.oscillationSpeed;
        this.position.y += this.ySpeed * dt;
        this.position.x += Math.cos(this.time) * this.oscillationDistance * dt;
        this.particles[0].position = this.position;

        const dX = this.prevPosition.x - this.position.x;
        const dY = this.prevPosition.y - this.position.y;
        const delta = Math.sqrt(dX * dX + dY * dY);
        this.prevPosition = new Vector2(this.position.x, this.position.y);

        for (let i = 1; i < this.particleCount; i++) {
          const dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
          dirP.Normalize();
          dirP.Mul((delta / dt) * this.velocityInherit);
          this.particles[i].AddForce(dirP);
        }

        for (let i = 1; i < this.particleCount; i++) {
          this.particles[i].Integrate(dt);
        }

        for (let i = 1; i < this.particleCount; i++) {
          const rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
          rp2.Sub(this.particles[i - 1].position);
          rp2.Normalize();
          rp2.Mul(this.particleDist);
          rp2.Add(this.particles[i - 1].position);
          this.particles[i].position = rp2;
        }

        if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
          this.Reset();
        }
      }

      Reset() {
        this.position.y = -Math.random() * ConfettiRibbon.bounds.y;
        this.position.x = Math.random() * ConfettiRibbon.bounds.x;
        this.prevPosition = new Vector2(this.position.x, this.position.y);
        this.velocityInherit = Math.random() * 2 + 4;
        this.time = Math.random() * 100;
        this.oscillationSpeed = Math.random() * 2.0 + 1.5;
        this.oscillationDistance = Math.random() * 40 + 40;
        this.ySpeed = Math.random() * 40 + 80;

        const ci = Math.round(Math.random() * (colors.length - 1));
        this.frontColor = colors[ci][0];
        this.backColor = colors[ci][1];
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
          this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
        }
      }

      Draw(g: CanvasRenderingContext2D) {
        for (let i = 0; i < this.particleCount - 1; i++) {
          const p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
          const p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);

          if (this.Side(this.particles[i].position.x, this.particles[i].position.y, 
                       this.particles[i + 1].position.x, this.particles[i + 1].position.y, 
                       p1.x, p1.y) < 0) {
            g.fillStyle = this.frontColor;
            g.strokeStyle = this.frontColor;
          } else {
            g.fillStyle = this.backColor;
            g.strokeStyle = this.backColor;
          }

          if (i === 0) {
            g.beginPath();
            g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
            g.closePath();
            g.stroke();
            g.fill();
            g.beginPath();
            g.moveTo(p1.x * retina, p1.y * retina);
            g.lineTo(p0.x * retina, p0.y * retina);
            g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
            g.closePath();
            g.stroke();
            g.fill();
          } else if (i === this.particleCount - 2) {
            g.beginPath();
            g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
            g.closePath();
            g.stroke();
            g.fill();
            g.beginPath();
            g.moveTo(p1.x * retina, p1.y * retina);
            g.lineTo(p0.x * retina, p0.y * retina);
            g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
            g.closePath();
            g.stroke();
            g.fill();
          } else {
            g.beginPath();
            g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
            g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
            g.lineTo(p1.x * retina, p1.y * retina);
            g.lineTo(p0.x * retina, p0.y * retina);
            g.closePath();
            g.stroke();
            g.fill();
          }
        }
      }

      Side(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
        return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
      }
    }

    // Initialize bounds
    ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
    ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);

    // Create confetti ribbons
    const confettiRibbons: ConfettiRibbon[] = [];
    const confettiRibbonCount = 10;
    const ribbonPaperCount = 30;
    const ribbonPaperDist = 8.0;
    const ribbonPaperThick = 8.0;

    for (let i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons[i] = new ConfettiRibbon(
        Math.random() * canvasWidth,
        -Math.random() * canvasHeight * 2,
        ribbonPaperCount,
        ribbonPaperDist,
        ribbonPaperThick,
        45,
        1,
        0.05
      );
    }

    // Create confetti papers
    const confettiPapers: ConfettiPaper[] = [];
    const confettiPaperCount = 10;

    for (let i = 0; i < confettiPaperCount; i++) {
      confettiPapers[i] = new ConfettiPaper(
        Math.random() * canvasWidth,
        Math.random() * canvasHeight
      );
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < confettiPaperCount; i++) {
        confettiPapers[i].Update(duration);
        confettiPapers[i].Draw(ctx);
      }

      for (let i = 0; i < confettiRibbonCount; i++) {
        confettiRibbons[i].Update(duration);
        confettiRibbons[i].Draw(ctx);
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      canvas.width = newWidth * retina;
      canvas.height = newHeight * retina;
      ConfettiPaper.bounds = new Vector2(newWidth, newHeight);
      ConfettiRibbon.bounds = new Vector2(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
}
