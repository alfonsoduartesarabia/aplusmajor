// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import { ChangeEventHandler, createRef, useEffect, useRef, useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import Grid from './Grid';
import './alfonsoduartesarabia.css';
import { StateTimeline } from 'tone';
// import { BsFillStopFill } from 'react-icons/bs';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Drum Machine.
 * From Wikipedia:
 * "A drum machine is an electronic musical instrument that creates percussion sounds, drum beats, and patterns"
 ** ------------------------------------------------------------------------ */
interface DrumPadProps{
  id: string;
  note: string;
  synth?: Tone.Synth;
  sampler?: Tone.Sampler;
  volume: number;
  recorder: Tone.Recorder;
  // isRec: boolean;
  // notes: string[];
}

export function DrumMachineKey({
  synth,
  sampler
}: DrumPadProps): JSX.Element {

  sampler = new Tone.Sampler({
    urls: {
      BassDrum: 'Bass-Drum-1.wav',
      BoomKick: 'Boom-Kick.wav',
      ClosedHiHat: 'Closed-Hi-Hat-2.wav',
      DryKick: 'Dry-Kick.wav',
      ElectricGuitar: 'Electric-Guitar-C4.wav',
      EnglishHorn: 'English-Horn-C5.wav',
      HiBongo: 'Hi-Bongo.wav',
      HiHat: 'Hi-Hat-Open-Hit-B1.mp3',
      Snare: 'Hip-Hop-Snare.wav',
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
      className={classNames('ba pointer absolute dim', {
      })}
      style={{
        // CSS
        
      }}
    ></div>
  );
}

/** Drum Machine - keys: id and notes 
**/
function DrumMachine({ state, synth, setSynth }: InstrumentProps ): JSX.Element {
  const [volume,setVolume] = useState<number>(5);
  const socket = state.get('socket')
  const recorder = new Tone.Recorder();

  
  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(e.target.value as unknown as number);
    // sampler?.disconnect();
  }
  
  return (
    <div className="pv4">
        <div className="relative h5 w-200 ml4">
          <CreateGrid 
          id={''} note={''} volume={volume} recorder={recorder} 
          /> 
          {/* {keys.map(k => {
          return  <DrumPadButton id={k.id} note={k.note} synth={synth} />
          })} */}
        </div> 
        <div className='volume-bar'> 
        <label>
          <input 
            // className='volume-bar'
            type='range'  
            min={-60}
            max={15}
            value={volume}
            onChange={changeVolume}
          />
          Volume
          </label>
        </div>
    </div>
  );
}

// Connect to database
export function saveNotesToDB(notes: string[]){
  /* 
  1. pass socket 
  2. import send func
  */
  const response  = await send(socket, 'new_recording', { notes });
  /* 
    Lets figure out what response will be after 
  */
  console.log(notes.length);
}

// Hard coding the grid with buttons
export function CreateGrid({ synth, sampler, volume, recorder}: DrumPadProps): JSX.Element{

  sampler = new Tone.Sampler({
    urls: {
      A0: 'sounds/Bass-Drum-1.wav',
      B0: 'sounds/Boom-Kick.wav',
      C0: 'sounds/Closed-Hi-Hat-2.wav',
      A4: 'sounds/Dry-Kick.wav',
      B5: 'sounds/Electric-Guitar-C4.wav',
      C6: 'sounds/English-Horn-C5.wav',
      D7: 'sounds/Hi-Bongo.wav',
      E1: 'sounds/Hi-Hat-Open-Hit-B1.mp3',
      F2: 'sounds/Hip-Hop-Snare-1.wav',
    }, 
    release: 10,
    baseUrl: 'http://localhost:3000/'
  }).toDestination();

  const [isRec,setIsRec] = useState(false);
  const notes: string[] = [];
  // recorder = new Tone.Recorder();
  sampler.volume.value = volume;
  sampler?.connect(recorder);
  // synth = new Tone.Synth().connect(recorder);
  let url: string = '';
  const videoRef = useRef();
  const previousUrl = useRef(url);
  
  function saveNotes(note: string){
    if(isRec){
      notes.push(note);
    }
  }
  function startRecording(){
    setIsRec(true);
    recorder.start();
  }
  function stopRecording(){
    setIsRec(false);
    saveNotesToDB(notes);
    // Sampler Recorder - Generate 
    //recorder.start();
    setTimeout(async () => {
      const recording = await recorder.stop();
      url = URL.createObjectURL(recording);
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = url;
      anchor.click();
    },2000);
    notes.splice(0,notes.length);
  }

  return (
    <div>
    <Grid row={true} >
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap' 
        onMouseDown={() => sampler?.triggerAttack(`A0`) && saveNotes('A0')}
        onMouseLeave={() => sampler?.triggerRelease('')}
      >Bass Drum</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`B0`) && saveNotes('B0')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Boom Kick</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`C0`) && saveNotes('C0')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Closed HH</button>
      </Grid>
    </Grid>

    <Grid row={true}>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`A4`) && saveNotes('A4')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Dry Kicks</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`B5`) && saveNotes('B5')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Electric Guitar</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`C6`) && saveNotes('C6')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >English Horn</button>
      </Grid>
    </Grid>

    <Grid row={true}>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`D7`) && saveNotes('D7')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Hi Bongo</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`E1`) && saveNotes('E1')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Open HH</button>
      </Grid>
      <Grid column={true} sm={1} md={1}>
      <button id='button-wrap' className='button-wrap'
      onMouseDown={() => sampler?.triggerAttack(`F2`) && saveNotes('F2')}
      onMouseLeave={() => sampler?.triggerRelease('')}
      >Hip Hop Snare</button>
      </Grid>
    </Grid>

      <div className='recorder'>
          <button className={`record-btn ${isRec ? 'bg-dark-red white' : ''}`} disabled={isRec} onClick={startRecording}>
          {/* <BsFillStopFill /> */}
          <div className='button-name'>record</div>
          </button>
          <button className='add-btn'>
          <div className=''>add</div>
          </button>
          <button className={`stop-btn ${isRec ? '' : 'bg-dark-red white'}`} disabled={!isRec} onClick={stopRecording}>
          <div className='button-name'>stop</div>
          </button>

          {/* <video controls >
            <source src={url} type='video/webm'/>
          </video> */}
      </div>

    </div>
  );
}

// create drumpad buttons
export function DrumPadButton({id,note, sampler}: DrumPadProps): JSX.Element {
  sampler = new Tone.Sampler({
    urls: {
      A0: 'sounds/Bass-Drum-1.wav',
      B0: 'sounds/Boom-Kick.wav',
      C0: 'sounds/Closed-Hi-Hat-2.wav',
      A4: 'sounds/Dry-Kick.wav',
      B5: 'sounds/Electric-Guitar-C4.wav',
      C6: 'sounds/English-Horn-C5.wav',
      D7: 'sounds/Hi-Bongo.wav',
      E1: 'sounds/Hi-Hat-Open-Hit-B1.mp3',
      F2: 'sounds/Hip-Hop-Snare-1.wav',
    }, 
    release: 10,
    baseUrl: 'http://localhost:3000/'
  }).toDestination();
  // Tone.Transport.start();

  return (
    // <Grid row={true}>
    //   <Grid column={true} sm={9} md={4}>
    //     <h1>{id}</h1>
    //   </Grid>
    // </Grid>

    <button id='button-wrap' style={{
      border: '2px solid palevioletred',
      color: 'palevioletred',
      margin: '0 0.5em',
      padding: '0.25em 0.5em',
      display: 'flex',
    }} 
    onMouseDown={() => sampler?.triggerAttack(`${note}`)}
    onMouseLeave={() => sampler?.triggerRelease('')}>
       {id}
    </button>
  )
}

export const DrumMachineInstrument = new Instrument('Drum Machine', DrumMachine);