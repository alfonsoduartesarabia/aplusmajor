// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { Map, List, Range } from 'immutable';
import { ChangeEventHandler, createRef, useEffect, useRef, useState } from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import Grid from './Grid';
import './alfonsoduartesarabia.css';
import { Socket } from 'socket.io-client';
import { send } from '../Socket';
import { DispatchAction } from '../Reducer';

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
  socket: Socket;
  dispatch: any;
}  

/** Drum Machine 
**/
function DrumMachine({ state, synth, setSynth, dispatch }: InstrumentProps ): JSX.Element {
  const [volume,setVolume] = useState<number>(5);
  const recorder = new Tone.Recorder();
  const socket = state.get('socket');
  
  function changeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(e.target.value as unknown as number);
    // sampler?.disconnect();
  }
  
  return (
    <div className="pv4">
        <div className="relative h5 w-200 ml4">
          <CreateGrid 
          id={''} note={''} volume={volume} recorder={recorder} socket={socket} dispatch={dispatch}
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
async function saveNotesToDB(notes: string[], socket: Socket, dispatch: any){
  const response = await send(socket, 'save_song', { notes });
  dispatch(new DispatchAction('SET_SONGS', { songs: response }));

  /* 
    Lets figure out what response will be after 
  */
}

// Hard coding the grid with buttons
export function CreateGrid({ sampler, volume, recorder, socket, dispatch }: DrumPadProps): JSX.Element{

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
  const [audioUrl,setAudioURL] = useState('');
  const notes: string[] = [];
  sampler.volume.value = volume;
  sampler?.connect(recorder);
  let url: string = '';
  
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
    saveNotesToDB(notes, socket, dispatch);
    setTimeout(async () => {
      const recording = await recorder.stop();
      url = URL.createObjectURL(recording);
      setAudioURL(url);
    },1000);
    notes.splice(0,notes.length);
  }
  function downloadRecording(){
    if(audioUrl.length > 0){
      const anchor = document.createElement("a");
      anchor.download = "recording.webm";
      anchor.href = audioUrl;
      anchor.click();
      setAudioURL('');
    }
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
          <button className={`stop-btn ${isRec ? '' : 'bg-dark-red white'}`} disabled={!isRec} onClick={stopRecording}>
          <div className='button-name'>stop</div>
          </button>
          <button className='add-btn'onClick={downloadRecording}>
          <div className='button-name'>Download</div>
          </button>
          {isRec && <p style={{color:'red'}}>You are recording</p>}
          <div className='audio'>
            <audio controls src={audioUrl}>
            </audio>
          </div>
      </div>

    </div>
  );
}

// create drumpad buttons - NOT USED
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