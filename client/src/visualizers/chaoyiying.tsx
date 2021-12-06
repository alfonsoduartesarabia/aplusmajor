import P5 from 'p5';
import * as Tone from 'tone';
import {Visualizer} from '../Visualizers';

const particles: Particles[] = [];

export const MultiShapeVisualizer = new Visualizer(
    'MultiShape',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        //const dim = Math.min(width, height);
        //p5.loadImage('client/src/img/homepage_bg.jpg');
        p5.angleMode(p5.DEGREES);
        p5.background(0, 0, 0, 255);
        p5.stroke(255);
        p5.strokeWeight(3);
        p5.noFill();
        p5.translate(width / 2, height / 2);

        const values = analyzer.getValue();

        //draw circle wave
        for (let j = -1; j <= 1; j += 2) {
            p5.beginShape();
            for (let i = 0; i <= 180; i += 0.5) {
                const index = Math.floor(p5.map(i, 0, 180, 0, values.length - 1));
                const amplitude = values[index] as number;
                const r = p5.map(amplitude, -1, 1, 150, 350);
                const x = r * p5.sin(i) * j;
                const y = r * p5.cos(i);
                // Place vertex
                p5.vertex(x, y);
            }
            p5.endShape();
        }


        //draw dynamic shape
        p5.beginShape();
        for (let i = 0; i <= 360; i++) {
            const index = Math.floor(p5.map(i,0,360,0,values.length-1));
            const amplitude = values[index] as number;

            const r1Min = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 100);
            const r1Max = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 0);
            const r2Min = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 50);
            const r2Max = p5.map(p5.sin(p5.frameCount), -1, 1, 0, 100);

            const r1 = p5.map(amplitude , -1, 1, r1Min, r1Max);
            const r2 = p5.map(amplitude , -1, 1, r2Min, r2Max);
            const r = r1 + r2;
            const x = r * p5.sin(i);
            const y = r * p5.cos(i);
            // Place vertex
            p5.vertex(x, y);
        }
        p5.endShape();

        p5.beginShape();
        for (let i = 0; i <= 359; i++) {
            const r1Min = p5.map(p5.sin(p5.frameCount), -1, 1, 50, 100);
            const r1Max = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 0);
            const r2Min = p5.map(p5.sin(p5.frameCount / 2), -1, 1, 100, 50);
            const r2Max = p5.map(p5.sin(p5.frameCount), -1, 1, 0, 100);

            const r1 = p5.map(p5.sin(i*3) , -1, 1, r1Min, r1Max);
            const r2 = p5.map(p5.sin(i*6) , -1, 1, r2Min, r2Max);
            const r = r1 + r2;
            const x = r * p5.sin(i);
            const y = r * p5.cos(i);
            // Place vertex
            p5.vertex(x, y);
        }
        p5.endShape();

        //push particles
        //let p =new Particle(p5);
        //particles.push(p);
        /*
        particles.push(new Particle(p5));

        //get particles
        for(let i = particles.length - 1; i>=0; i--){
            if(!particles[i].edges()) {
                particles[i].update();
                particles[i].show();
            }
            else {
                particles.splice(i,1)
            }
        }
        */
        let p =new Particles(p5);
        particles.push(p);
        for(let i = particles.length - 1; i>=0; i--){
            particles[i].update();
            particles[i].show();
            //delete unseen particles
            if(particles[i].toDeleted()){
                particles.splice(i,1);
            }
        }
    },
);

export class Particle {
    pos: P5.Vector;
    p5: P5;
    vel;
    acc;
    w;
    width: number;
    height: number;

    constructor(p5: P5) {
        this.p5 = p5;
        this.pos = P5.Vector.random2D().mult(250);
        this.vel = this.p5.createVector(0, 0);
        this.acc = this.pos.copy().mult(this.p5.random(0.0001, 0.00001));
        this.w = this.p5.random(3, 5);
        this.width = window.innerHeight;
        this.height = window.innerHeight / 2;
        this.pos.x = 2 * Math.floor(this.p5.random() * this.width);
        this.pos.y = Math.floor(this.p5.random() * this.height)/2;
    }

    //update particle
    update = () => {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
    };

    //remove particle no longer exist
    edges = () => {
        if (this.pos.x < -this.width / 2 || this.pos.x > this.width / 2 ||
            this.pos.y < -this.height / 2 || this.pos.y > this.height / 2) {
            return true;
        } else {
            return false;
        }
    }

    //show particle
    show = () => {
        this.p5.noStroke();
        this.p5.fill(255);
        this.p5.ellipse(this.pos.x, this.pos.y, this.w);
    };

}

class Particles{
    p5: P5;
    x: number;
    y: number;
    width: number;
    height: number;
    vx;
    vy;
    alpha;

    constructor(p5: P5) {
        this.p5 = p5;
        //this.x = 300;
        //this.y = 380;
        this.width = window.innerHeight;
        this.height = window.innerHeight/2;
        this.x = Math.floor(this.p5.random() * this.width);
        this.y = Math.floor(this.p5.random() * this.height);
        this.vx = this.p5.random(-1,1);
        this.vy = this.p5.random(-5,-1);
        this.alpha = 255;
    }

    show(){
        this.p5.noStroke();
        //this.p5.stroke(255);
        this.p5.fill(255,this.alpha);
        this.p5.ellipse(this.x,this.y,16);
        this.p5.ellipse(-this.x, this.y, 16);
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 5;
    }

    toDeleted(){
        return this.alpha < 0;
    }
}
