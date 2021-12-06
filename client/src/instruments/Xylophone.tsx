import * as Tone from 'tone';
import classNames from 'classnames';
import {List} from 'immutable';
import {useState} from 'react';
import "./Xylophone.css";
import {Instrument, InstrumentProps} from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Xylophone
 ** ------------------------------------------------------------------------ */
interface Xylophone {
    id: string;
    note: string;
    synth?: Tone.Synth;
    sampler?: Tone.Sampler;
    volume: number;
}

export function DrumMachineKey({
                                   synth,
                                   sampler
                               }: Xylophone): JSX.Element {

    sampler = new Tone.Sampler({
        urls: {
            C: 'c.wav',
            D1: 'd1.wav',
            E1: 'e1.wav',
            F: 'f.wav',
            G: 'g.wav',
            A: 'a.wav',
            B: 'b.wav',
            C1: 'c2.wav',
            D: 'd1.wav',
        },
        release: 10,
        baseUrl: 'http://localhost:3000/'
    }).toDestination();

    return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
            onMouseDown={() => synth?.triggerAttack(``)} // Question: what is `onMouseDown`?
            onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
            className={classNames('ba pointer absolute dim', {})}
            style={{
                // CSS
                top: 0,
            }}
        ></div>
    );
}

/** Drum Machine - keys: id and notes
 **/
function XylophoneMachine({synth, setSynth}: InstrumentProps, {sampler}: Xylophone): JSX.Element {
    const [volume, setVolume] = useState<number>(5);
    const recorder = new Tone.Recorder();
    sampler?.connect(recorder);
    const keys = List([
        {id: 'C', note: 'C0'},
        {id: 'D1', note: 'D1'},
        {id: 'E1', note: 'E1'},
        {id: 'F', note: 'F1'},
        {id: 'G', note: 'G1'},
        {id: 'A', note: 'A1'},
        {id: 'B', note: 'B1'},
        {id: 'C1', note: 'C1'},
        {id: 'D', note: 'D0'}
    ]);

    function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
        setVolume(e.target.value as unknown as number);
        sampler?.disconnect();
    }

    return (
        <div className="pv4">
            <div className="relative h4 w-200 ml4">
                <Container id={''} note={''} volume={volume}/>
                {}
            </div>
            <div className='volume'>
                <label>
                    <input
                        type='range'
                        min={-60}
                        max={15}
                        value={volume}
                        onChange={changeVolume}
                    />
                    Volume Control
                </label>
            </div>
        </div>
    );
}

export function Container({sampler, volume}: Xylophone): JSX.Element {
    sampler = new Tone.Sampler({
        urls: {
            C0: 'sounds/c.wav',
            D1: 'sounds/d1.wav',
            E1: 'sounds/e1.wav',
            F1: 'sounds/f.wav',
            G1: 'sounds/g.wav',
            A1: 'sounds/a.wav',
            B1: 'sounds/b.wav',
            C1: 'sounds/c2.wav',
            D0: 'sounds/d1.wav',
        },
        release: 10,
        baseUrl: 'http://localhost:3000/'
    }).toDestination();

    sampler.volume.value = volume;
    return (
        <div>
            <button className="C0"
                    onMouseDown={() => sampler?.triggerAttack(`C0`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >C
            </button>

            <button className="D1"
                    onMouseDown={() => sampler?.triggerAttack(`D1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >D
            </button>

            <button className="E1"
                    onMouseDown={() => sampler?.triggerAttack(`E1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >E
            </button>


            <button className="F1"
                    onMouseDown={() => sampler?.triggerAttack(`F1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >F
            </button>

            <button className="G1"
                    onMouseDown={() => sampler?.triggerAttack(`G1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >G
            </button>

            <button className="A1"
                    onMouseDown={() => sampler?.triggerAttack(`A1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >A
            </button>


            <button className="B1"
                    onMouseDown={() => sampler?.triggerAttack(`B1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >B
            </button>

            <button className="C1"
                    onMouseDown={() => sampler?.triggerAttack(`C1`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >C
            </button>

            <button className="D0"
                    onMouseDown={() => sampler?.triggerAttack(`D0`)}
                    onMouseUp={() => sampler?.triggerRelease('')}
            >D
            </button>
        </div>
    );
}


export const XylophoneInstrument = new Instrument('Xylophone', XylophoneMachine);
