// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import React , { useState, useEffect }from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface LaunchpadKeyProps {
  note: string; 
  keyCode: string;
  duration?: string;
  soundPath?: string; 
}

export function LaunchPadKey({ note, keyCode, soundPath }: LaunchpadKeyProps): JSX.Element {
  const [isKeyDown, setKeyDown] = useState(false)
  const [isReady, setReady] = useState(false)
  let player = new Tone.Player().toDestination()
  player
    .load("/" + soundPath)
    .then(() => {
      setReady(true)
    })
    .catch( err => {
      // console.log(err)
      setReady(false)
    })
  
  let cssClass = !isKeyDown ? "flex w3 h3 ba ml3 items-center justify-center" : "flex w3 h3 ba ml3 items-center justify-center bg-yellow"
  cssClass += !isReady ? " flex w3 h3 ba ml3 items-center justify-center bg-gray" : cssClass
  const keyDownEventHandler = (event) => {
    if (!player.loaded) return
    if (event.code !== keyCode) return
    if (event.repeat) return
    player?.start()
    setKeyDown(true)
  }

  const keyUpEventHandler = (event) => {
    if (!player.loaded) return
    if (event.code !== keyCode) return
    player?.stop()
    setKeyDown(false)
  }

  const handleKeyDown = (event) => {
    if (!player.loaded) return
    setKeyDown(true)
    player?.start()
  }
  const handleKeyUp = () => {
    if (!player.loaded) return
    player?.stop()
    setKeyDown(false)
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDownEventHandler)
    window.addEventListener('keyup', keyUpEventHandler)

    return () => {
      window.removeEventListener('keydown', keyDownEventHandler);
      window.removeEventListener('keyup', keyUpEventHandler);
    }
  });

  return (
    <div className={cssClass} onMouseDown={handleKeyDown} onMouseUp={handleKeyUp}>
      <code>{note}</code>
    </div>
  );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [song, setSong] = useState("kyoto")
  const [chain, setChain] = useState("1")
  let chainPath :string = "chain" + chain + "/"
  let songPath :string = song + "/"
  let keys = [List([
    { note: 'Q', code: 'KeyQ', sound: "q.mp3"},
    { note: 'W', code: 'KeyW', sound: "w.mp3"},
    { note: 'E', code: 'KeyE', sound: "e.mp3"},
    { note: 'R', code: 'KeyR', sound: "r.mp3"},
    { note: 'T', code: 'KeyT', sound: "t.mp3"},
    { note: 'Y', code: 'KeyY', sound: "y.mp3"},
    { note: 'U', code: 'KeyU', sound: "u.mp3"},
    { note: 'I', code: 'KeyI', sound: "i.mp3"},
    { note: 'O', code: 'KeyO', sound: "o.mp3"},
    { note: 'P', code: 'KeyP', sound: "p.mp3"},
  ]), List([
    { note: 'A', code: 'KeyA', sound: "a.mp3"},
    { note: 'S', code: 'KeyS', sound: "s.mp3"},
    { note: 'D', code: 'KeyD', sound: "d.mp3"},
    { note: 'F', code: 'KeyF', sound: "f.mp3"},
    { note: 'G', code: 'KeyG', sound: "g.mp3"},
    { note: 'H', code: 'KeyH', sound: "h.mp3"},
    { note: 'J', code: 'KeyJ', sound: "j.mp3"},
    { note: 'K', code: 'KeyK', sound: "k.mp3"},
    { note: 'L', code: 'KeyL', sound: "l.mp3"},
    { note: ';', code: 'Semicolon', sound: "ll.mp3"},
  ]), List([
    { note: 'Z', code: 'KeyZ', sound: "z.mp3"},
    { note: 'X', code: 'KeyX', sound: "x.mp3"},
    { note: 'C', code: 'KeyC', sound: "c.mp3"},
    { note: 'V', code: 'KeyV', sound: "v.mp3"},
    { note: 'B', code: 'KeyB', sound: "b.mp3"},
    { note: 'N', code: 'KeyN', sound: "n.mp3"},
    { note: 'M', code: 'KeyM', sound: "m.mp3"},
    { note: ',', code: 'Comma', sound: "bb.mp3"},
    { note: '.', code: 'Period', sound: "nn.mp3"},
    { note: '/', code: 'Slash', sound: "mm.mp3"},
  ])]

  useEffect(() => {
    window.addEventListener('keydown', keyDownEventHandler)
    window.addEventListener('keyup', keyUpEventHandler);

    return () => {
      window.removeEventListener('keydown', keyDownEventHandler);
      window.removeEventListener('keyup', keyUpEventHandler);
    }
  });

  const keyDownEventHandler = (event) => {
    if (event.code === "ArrowUp") setChain("1")
    if (event.code === "ArrowLeft") setChain("2")
    if (event.code === "ArrowDown") setChain("3")
    if (event.code === "ArrowRight") setChain("4")
  }

  const keyUpEventHandler = (event) => {
    if (event.code === "ArrowUp") setChain("1")
    if (event.code === "ArrowLeft") setChain("2")
    if (event.code === "ArrowDown") setChain("3")
    if (event.code === "ArrowRight") setChain("4")
  }


  return (
    <div className="flex flex-column">
      <div className="pv3 ba b--black flex flex-column">
          {
            keys.map( (list, id) => {
              return <div key={id} className="flex flex-row pb3">
                { 
                  list.map( (key, idx) => {
                    return (
                      <LaunchPadKey key={idx} note={key.note} keyCode={key.code} soundPath={songPath + chainPath + key.sound}/>
                    )})
                }
              </div>
            })
          }
      </div>
      <div className="pv3 ba b--black flex bt-0">
        <div className={chain === "1" ? "flex w3 h3 ba ml3 items-center justify-center bg-blue" : "flex w3 h3 ba ml3 items-center justify-center"}>
          <code>{"^"}</code>
        </div>
        <div className={chain === "2" ? "flex w3 h3 ba ml3 items-center justify-center bg-blue" : "flex w3 h3 ba ml3 items-center justify-center"}>
          <code>{"<"}</code>
        </div>
        <div className={chain === "3" ? "flex w3 h3 ba ml3 items-center justify-center bg-blue" : "flex w3 h3 ba ml3 items-center justify-center"}>
          <code>{"V"}</code>
        </div>
        <div className={chain === "4" ? "flex w3 h3 ba ml3 items-center justify-center bg-blue" : "flex w3 h3 ba ml3 items-center justify-center"}>
          <code>{">"}</code>
        </div>
        <div className="flex justify-center items-center h3 ph3"> Active Chain: {chain}</div>
        <div onClick={() => setSong("kyoto")} className={song === "kyoto" ? "flex w4 h3 ba ml3 items-center justify-center bg-red pointer" : "flex w4 h3 ba ml3 items-center justify-center pointer"}>
          <code>{"Kyoto"}</code>
        </div>
        <div onClick={() => setSong("animals")} className={song === "animals" ? "flex w4 h3 ba ml3 items-center justify-center bg-red pointer" : "flex w4 h3 ba ml3 items-center justify-center pointer"}>
          <code>{"Animals"}</code>
        </div>
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('Launchpad', Guitar);
