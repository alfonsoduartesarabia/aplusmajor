// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Circle = new Visualizer(
  'Circle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();

    const values = analyzer.getValue();
    p5.beginShape();
    // Change Colors based on amplitude
    for (let i = 0; i < values.length; i++) {
      const angle = i * 360 / values.length
      const radius = 200
      const centerY = height / 2
      const centerX = width / 2 - radius / 2
      const len = 100 * (values[i] as number)

      const x1 = Math.cos(angle) * (radius - len/2) + centerX
      const x2 = Math.cos(angle) * (radius + len/2) + centerX
      const y1 = Math.sin(angle) * (radius - len/2) + centerY
      const y2 = Math.sin(angle) * (radius + len/2) + centerY
      p5.line(x1, y1, x2, y2)
      // p5.vertex(X, Y);
    }
    p5.endShape();
  },
);
