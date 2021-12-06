// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Smiley = new Visualizer(
  'Smiley',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    const values = analyzer.getValue();

    var maxAmp = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] as number > maxAmp) {
            maxAmp = values[i] as number;
        }
    }

    p5.beginShape();
    if (maxAmp > 0)
        p5.arc(width/2,height/2,width/(maxAmp*20),height/2,0,3.14);
    else {
        p5.arc(width/2,height/2,width*100,height/2,0,3.14);
    }
    p5.endShape();

    p5.beginShape();
    p5.ellipse(width/2+70,height/2.5,width/5 *maxAmp);
    p5.ellipse(width/2-70,height/2.5,width/5 *maxAmp);
    p5.endShape();


    //p5.beginShape();
    var ampMod:number = 0;
    for (let i = 0; i < values.length; i++) {
        const center:number = width/2 - 300;

        var amplitude:number = (values[i] as number);
        var x:number = p5.map(i, 0, values.length - 1, 0, width);
        var arcSeg:number = p5.map(i, 0, values.length - 1, 0, 3.14);

        //var arcSegNext:number = p5.map(i + 1, 0, values.length - 1, 0, 3.14);
        p5.beginShape();
        p5.strokeWeight(dim * 0.01 * amplitude*50);
        p5.arc(width/2,height/2,width/(maxAmp*20),height/2,arcSeg,arcSeg+0.001);
        p5.endShape();
        

        
        if (ampMod < center) {
            ampMod += 1;
            
        }
        else {
            ampMod -= 1;
        }
        amplitude *= (ampMod/center)*20;

        const y = height / 2 + amplitude * height;
        // Place vertex
        //p5.vertex(x, y);
    }
    //p5.endShape();
  },
);
