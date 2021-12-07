// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useState} from 'react';


// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { Console } from 'console';
import { Notebook16 } from '@carbon/icons-react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface PianoKeyProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
  chord: (string | number[])[];
}

const notes = ['C2','Db2','D2','Eb2','E2','F2','Gb2','G2','Ab2','A2','Bb2','B2',
'C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3',
'C4','Db4','D4','Eb4','E4','F4','Gb4','G4','Ab4','A4','Bb4','B4',
'C5','Db5','D5','Eb5','E5','F5','Gb5','G5','Ab5','A5','Bb5','B5',
'C6','Db6','D6','Eb6','E6','F6','Gb6','G6','Ab6','A6','Bb6','B6'];

export function PianoKey({
  note,
  synth,
  minor,
  index,
  chord,
}: PianoKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */

  /**
   * 
   * @param initialNote string note pressed, such as C2, Gb6 etc.
   * @param chordTones array of numbers cooresponding to interval between initalNote and chord tone
   * @param synth Tone.synth
   * @param timeInterval how far apart each note is
   */
  const playChord = (initialNote: string, chordTones: number[], synth: Tone.Synth<Tone.SynthOptions> | undefined, timeInterval: number) => {
    var chord:string[] = [notes[notes.indexOf(initialNote)]];
    chordTones.forEach(function (chordTone) {
      if (chordTone + notes.indexOf(initialNote) >= notes.length) {
        chord.push(notes[notes.indexOf(initialNote)+(chordTone - notes.length + 36)]);
      }
      else {
        chord.push(notes[notes.indexOf(initialNote)+chordTone]);
      }
    });
    var time:number = 0;
    chord.forEach(function (chordTone) {
      synth?.triggerAttack(chordTone,"+"+time.toString());
      time += timeInterval;
      synth?.triggerRelease("+"+time.toString());
      time += timeInterval;
    });
  };

  const testSong1 =[
    {
      "duration": 0.17361119791666668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 0,
      "time": 0,
      "velocity": 0.968503937007874
    },
  ]

  const testSong = [
    {
      "duration": 0.17361119791666668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 0,
      "time": 0,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666665,
      "durationTicks": 25,
      "midi": 62,
      "name": "D4",
      "ticks": 24,
      "time": 0.16666675,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666663,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 48,
      "time": 0.3333335,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 72,
      "time": 0.50000025,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 96,
      "time": 0.666667,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 62,
      "name": "D4",
      "ticks": 120,
      "time": 0.83333375,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666657,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 144,
      "time": 1.0000005,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666657,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 168,
      "time": 1.16666725,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666657,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 192,
      "time": 1.333334,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666657,
      "durationTicks": 25,
      "midi": 65,
      "name": "F4",
      "ticks": 216,
      "time": 1.50000075,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666657,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 240,
      "time": 1.6666675,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 288,
      "time": 2.000001,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 65,
      "name": "F4",
      "ticks": 312,
      "time": 2.1666677500000002,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 336,
      "time": 2.3333345,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 384,
      "time": 2.666668,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 69,
      "name": "A4",
      "ticks": 408,
      "time": 2.83333475,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 432,
      "time": 3.0000015,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666724,
      "durationTicks": 25,
      "midi": 65,
      "name": "F4",
      "ticks": 456,
      "time": 3.16666825,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 480,
      "time": 3.333335,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 504,
      "time": 3.50000175,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.1736111979166668,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 528,
      "time": 3.6666685,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 576,
      "time": 4.000002,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 69,
      "name": "A4",
      "ticks": 600,
      "time": 4.16666875,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 67,
      "name": "G4",
      "ticks": 624,
      "time": 4.3333355000000005,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666724,
      "durationTicks": 25,
      "midi": 65,
      "name": "F4",
      "ticks": 648,
      "time": 4.50000225,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666724,
      "durationTicks": 25,
      "midi": 64,
      "name": "E4",
      "ticks": 672,
      "time": 4.666669,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666724,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 696,
      "time": 4.83333575,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666724,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 720,
      "time": 5.0000025,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 768,
      "time": 5.333336,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 55,
      "name": "G3",
      "ticks": 816,
      "time": 5.6666695,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 864,
      "time": 6.000003,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 960,
      "time": 6.66667,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 55,
      "name": "G3",
      "ticks": 1008,
      "time": 7.0000035,
      "velocity": 0.968503937007874
    },
    {
      "duration": 0.17361119791666635,
      "durationTicks": 25,
      "midi": 60,
      "name": "C4",
      "ticks": 1056,
      "time": 7.333337,
      "velocity": 0.968503937007874
    }
  ]

  const playSong = (synth: Tone.Synth<Tone.SynthOptions> | undefined, song: { duration: number; durationTicks: number; midi: number; name: string; ticks: number; time: number; velocity: number; }[]) => {
    const timeFactor = 1
    song.forEach(function (note) {
      synth?.triggerAttackRelease(note['name'],'+'+note['duration']*timeFactor+note['time']*timeFactor,"+"+note['time']*timeFactor)
      console.log("played song ");
      //synth?.triggerAttackRelease(note['name'], note['duration'], note['time'],note['velocity']);
    });
  }


  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div
      onMouseDown={() => {
        if (chord[0] == 'None') {
          synth?.triggerAttack(`${note}`);
        }
        else if (chord[0] == 'song') {
          console.log("at the else ");
          playSong(synth,testSong);
        }
        else {
          playChord(`${note}`,chord[1] as number[],synth,0.2);
        }
      }
      } // Question: what is `onMouseDown`?
      onMouseUp={() => {
        if (chord[0] == 'None') {
          synth?.triggerRelease('+0.25');
        }
      } 
        //synth?.triggerRelease('+0.25')
    } // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor, // minor keys are black
        'black bg-white h4': !minor, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: minor ? '1.5rem' : '2rem',
        marginLeft: minor ? '0.25rem' : 0,
      }}
    ></div>
  );
}


function PianoType({ title, onClick, active }: any): JSX.Element {

  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function ChordType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [chord,setChord] = useState(['Major',[4,7]]);
  const [flute,setFlute] = useState('off');

  const basicChords: List<(string | number[])[]> = List([
    ['None',[]],
    ['Major',[4,7]],
    ['Minor',[3,7]],
    ['Power',[7]],
    ['Suspended',[5,7]],
    ['song',[]],
  ]);

  const seventhChords: List<(string | number[])[]> = List([
    ['major 7',[4,7,11]],
    ['dominant 7',[4,7,10]],
    ['minor 7',[3,7,10]],
    ['Diminished 7',[3,6,9]],
  ]);

  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'Db', idx: 0.5 },
    { note: 'D', idx: 1 },
    { note: 'Eb', idx: 1.5 },
    { note: 'E', idx: 2 },
    { note: 'F', idx: 3 },
    { note: 'Gb', idx: 3.5 },
    { note: 'G', idx: 4 },
    { note: 'Ab', idx: 4.5 },
    { note: 'A', idx: 5 },
    { note: 'Bb', idx: 5.5 },
    { note: 'B', idx: 6 },
  ]);

  const setOscillator = () => {
    if (flute == 'off') {

      setSynth(oldSynth => {
        oldSynth.disconnect();
        var newSynth = new Tone.Synth({oscillator:{type:"sine"}}).toDestination();
        newSynth.set(
          {
            oscillator: { 
              type: 'sine'
          },
            envelope: {
              attack: .2,
              attackCurve: "linear",
              decay: 0.1,
              release: 2,
              releaseCurve: "linear",
              sustain: 0.8
            }
          }
        )

        const tremolo = new Tone.Tremolo(5, 0.4).toDestination().start();
        const freeverb = new Tone.Freeverb().toDestination();
        freeverb.dampening = 1000;
        newSynth.connect(tremolo);
        newSynth.connect(freeverb);
        newSynth.volume.value = -20;
        setFlute("on");
        return newSynth;
      });  
    }
    else {
      setFlute('off');
      synth.disconnect();
    }
  }
  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <PianoKey
                key={note} //react key
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
                chord={chord}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
          <PianoType
          title={'flute'}
          onClick={() => setOscillator()}
          active={flute == 'on'}
          />
      </div>
      <div className={'flex flex-direction:column'}>
        <div className={'pl4 pt4 flex '}>
            Basic Chords
        </div>
        <div className={'pl4 pt4 flex'}>
          {basicChords.map(c => (
            <ChordType
              title={c[0]}
              onClick={() => setChord(c)}
              active={chord[0] == c[0]}
            />
          ))}
        </div>
        <div className={'pl4 pt4 flex'}>
            Seventh Chords
        </div>
        <div className={'pl4 pt4 flex'}>
          {seventhChords.map(c => (
            <ChordType
              title={c[0]}
              onClick={() => setChord(c)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const FluteInstrument = new Instrument('Flute', Flute);
