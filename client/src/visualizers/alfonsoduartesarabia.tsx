// 3rd party library imports;
import P5 from 'p5';
import * as Tone from 'tone';
// import { FFT } from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// empty particles array
const particles: Particle[] = [];
let isPressed = false;

export const StarVisualizer = new Visualizer(
  'Star',
  (p5: P5, analyzer: Tone.Analyser) => {

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 100, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.fill(255, 0, 255);
    p5.angleMode('degrees');
    // p5.noFill();

    const values = analyzer.getValue();
    p5.translate(width/2.5,height/2);
    p5.beginShape();
    for (let i = 0; i < values.length; i+=2.5){
      const index = Math.floor(p5.map(i,0,180,0,values.length-1));
      const amplitude = values[index] as number;
      const r = p5.map(amplitude,-1,1,50,250);
      const x = r * Math.sin(i);
      const y = r * Math.cos(i);  
      p5.vertex(x,y);
    }
    p5.endShape();

    // Creates the particles that are spinning around the star shape
    for(let i = 0; i < 100; i+=1){
      const index = Math.floor(p5.map(i,0,180,0,values.length-1));
      const amplitude = values[index] as number;
      const pos = P5.Vector.random2D().mult(300); 
      const x = p5.map(amplitude,-1,1,pos.x,5);
      const y = p5.map(amplitude,-1,1,pos.y,10);
      // const w = p5.random(3,15);
      p5.noStroke();
      p5.fill(255, 0, 255);
      p5.ellipse(x*2.5, y-10, x/4);
    }

    // check if user click the button to create or delete particles
    if(isPressed){
      particles.push(new Particle(p5));
      particles.forEach(p => p.move());
    }
    else
      particles.splice(0,particles.length);

    createButton(p5); 
    // particles.push(new Particle(p5));
    // particles.forEach(p => {p.move();});
    // particles.pop();
  },
);

const createButton = (p5: P5) => {
  const checkisPressed = () => {
    if(!isPressed) 
      isPressed = true;
    else
      isPressed = false;
  };
  const button = p5.createButton('Particles'); 
  button.position(285,450); 
  button.style('font-size','16px');
  button.style('background-color', p5.color(255,0,255));
  button.style('border-radius','8px');
  button.style('cursor','pointer');
  // button.style('border','2px solid #555555');
  button.style('border','none');
  button.style('display','inline-block');
  button.style('margin','4px 2px');
  button.style('color','white');
  button.style('padding','12px 28px');
  button.mousePressed(checkisPressed);
}

// Create particle object. Each particle will be shown every frame
export class Particle{
  // Vector - class to describe 2d or 3d vectors
  // random2D() - Makes a new 2D unit vector from a random angle
  // mult() - Multiplies the vector by a scalar 
  // const vector = P5.Vector.random2D().mult(250);
  pos: P5.Vector;
  p5: P5;
  vel; acc; w;
  x; y; xSpeed; ySpeed; width: number; height: number;
  alpha: number;
  //constructor
  constructor(p5: P5){
    this.p5 = p5;
    this.pos = P5.Vector.random2D().mult(170);
    this.vel = this.p5.createVector(0,0);
    this.acc = this.pos.copy().mult(this.p5.random(0.0001,0.00001));
    this.w = this.p5.random(3,8);

    this.width = window.innerHeight; this.height = window.innerHeight/2;
    this.x = 2 * Math.floor(this.p5.random() * this.width);
    this.y = Math.floor(this.p5.random() * this.height)/2;
    this.xSpeed = Math.random() * 0.9;
    this.ySpeed = Math.random() * 0.9;

    this.alpha = 255;
  }

  show = () => {
    this.p5.noStroke();
    this.p5.fill(255);
    this.p5.ellipse(this.pos.x,this.pos.y, this.w);
  };
  update = () => {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  };  
  move = () => {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x <= 0) this.xSpeed *= -1;
    if (this.x > this.width) this.xSpeed *= -1;
    if (this.y <= 0) this.ySpeed *= -1;
    if (this.y > this.height) this.ySpeed *= -1;

    this.p5.noStroke(); 
    this.p5.fill(255);
    this.p5.ellipse(this.x/2,this.y, this.w);
    this.p5.ellipse(-this.x/2,-this.y,this.w);
    this.p5.ellipse(-this.x/2,this.y,this.w); 
    this.p5.ellipse(this.x/2,-this.y,this.w);     
  }
  reset = () => {
    return this.alpha < 0;
  }
};