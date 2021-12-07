// 3rd party library imports
import * as Tone from 'tone';
import { List, Range } from 'immutable';
import React , { useState, useEffect }from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { act } from '@testing-library/react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface LaunchpadKeyProps {
  note: string; 
  keyCode: string;
  duration?: string;
  soundPath?: string; 
  themeColor?: string
}

export function LaunchPadKey({ note, keyCode, soundPath, themeColor }: LaunchpadKeyProps): JSX.Element {
  const [isKeyDown, setKeyDown] = useState(false)
  const [isReady, setReady] = useState(false)
  let player = new Tone.Player().toDestination()
  let cssBase = "flex w3 h3 ba ml3 items-center justify-center "
  
  let cssClass = !isKeyDown ? cssBase + "bg-white" : cssBase + themeColor
  cssClass += !isReady ? cssBase + "bg-gray" : cssClass
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
    player
      .load("/" + soundPath)
      .then(() => {
        setReady(true)
      })
      .catch( err => {
        // console.log("error loading song", err)
        setReady(false)
        return null
      })
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

function Launchpad({ synth, setSynth }: InstrumentProps): JSX.Element {
  const [song, setSong] = useState("animals")
  const [chain, setChain] = useState("1")
  const [activeIndex, setActive] = useState(0)
  let chainPath :string = "chain" + chain + "/"
  let songPath :string = song + "/"
  const sequence :string[] = [
    "Z", "X", "C", "V", "F", "D", "S", "A", 
    "Q", "W", "E", "E", "R", "R", "4", "3", "E", "R", "R", "2",
    "M", ",", ".", "/", ";", "L", "K", "J",
    "U", "I", "O", "O", "P", "P", "0", "9", "8", "7", "ArrowLeft",
    "1", "M", "M", ",", ".", "/", 
    ";", "L", "K", "J", "U", 
    "O", "O", "P", "P", "P", 
    "1", "U", "8", "I",
  ]
  const keyToCode :Map<String, String> = new Map();
  const sounds = {
    "1": {
      'Digit1': "a0.mp3",
      'Digit2': "a1.mp3",
      'Digit3': "a2.mp3",
      'Digit4': "a3.mp3",
      'Digit5': "5.mp3",
      'Digit6': "6.mp3",
      'Digit7': "b0.mp3",
      'Digit8': "b1.mp3",
      'Digit9': "b2.mp3",
      'Digit0': "b3.mp3",
      'KeyQ': "a4.mp3",
      'KeyW': "a5.mp3",
      'KeyE': "a6.mp3",
      'KeyR': "a7.mp3",
      'KeyT': "t.mp3",
      'KeyY': "y.mp3",
      'KeyU': "b4.mp3",
      'KeyI': "b5.mp3",
      'KeyO': "b6.mp3",
      'KeyP': "b7.mp3",
      'KeyA': "a8.mp3",
      'KeyS': "a9.mp3",
      'KeyD': "a10.mp3",
      'KeyF': "a11.mp3",
      'KeyG': "g.mp3",
      'KeyH': "h.mp3",
      'KeyJ': "b8.mp3",
      'KeyK': "b9.mp3",
      'KeyL': "b10.mp3",
      'Semicolon': "b11.mp3",
      'KeyZ': "a12.mp3",
      'KeyX': "a13.mp3",
      'KeyC': "a14.mp3",
      'KeyV': "a15.mp3",
      'KeyB': "b.mp3",
      'KeyN': "n.mp3",
      'KeyM': "b12.mp3",
      'Comma': "b13.mp3",
      'Period': "b14.mp3",
      'Slash': "b15.mp3",
    }, 
    "2": {
      'Digit1': "c12.mp3",
      'Digit2': "1.mp3",
      'Digit3': "2.mp3",
      'Digit4': "3.mp3",
      'Digit5': "5.mp3",
      'Digit6': "6.mp3",
      'Digit7': "d0.mp3",
      'Digit8': "d1.mp3",
      'Digit9': "d2.mp3",
      'Digit0': "d3.mp3",
      'KeyQ': "4.mp3",
      'KeyW': "5.mp3",
      'KeyE': "6.mp3",
      'KeyR': "7.mp3",
      'KeyT': "t.mp3",
      'KeyY': "y.mp3",
      'KeyU': "d4.mp3",
      'KeyI': "d5.mp3",
      'KeyO': "d6.mp3",
      'KeyP': "d7.mp3",
      'KeyA': "8.mp3",
      'KeyS': "9.mp3",
      'KeyD': "10.mp3",
      'KeyF': "11.mp3",
      'KeyG': "g.mp3",
      'KeyH': "h.mp3",
      'KeyJ': "d8.mp3",
      'KeyK': "d9.mp3",
      'KeyL': "d10.mp3",
      'Semicolon': "d11.mp3",
      'KeyZ': "12.mp3",
      'KeyX': "13.mp3",
      'KeyC': "14.mp3",
      'KeyV': "15.mp3",
      'KeyB': "b.mp3",
      'KeyN': "n.mp3",
      'KeyM': "d12.mp3",
      'Comma': "d13.mp3",
      'Period': "d14.mp3",
      'Slash': "d15.mp3",
    },
    "3": {
      'Digit1': "c12.mp3",
      'Digit2': "1.mp3",
      'Digit3': "2.mp3",
      'Digit4': "3.mp3",
      'Digit5': "5.mp3",
      'Digit6': "6.mp3",
      'Digit7': "d0.mp3",
      'Digit8': "d1.mp3",
      'Digit9': "d2.mp3",
      'Digit0': "d3.mp3",
      'KeyQ': "4.mp3",
      'KeyW': "5.mp3",
      'KeyE': "6.mp3",
      'KeyR': "7.mp3",
      'KeyT': "t.mp3",
      'KeyY': "y.mp3",
      'KeyU': "d4.mp3",
      'KeyI': "d5.mp3",
      'KeyO': "d6.mp3",
      'KeyP': "d7.mp3",
      'KeyA': "8.mp3",
      'KeyS': "9.mp3",
      'KeyD': "10.mp3",
      'KeyF': "11.mp3",
      'KeyG': "g.mp3",
      'KeyH': "h.mp3",
      'KeyJ': "d8.mp3",
      'KeyK': "d9.mp3",
      'KeyL': "d10.mp3",
      'Semicolon': "d11.mp3",
      'KeyZ': "12.mp3",
      'KeyX': "13.mp3",
      'KeyC': "14.mp3",
      'KeyV': "15.mp3",
      'KeyB': "b.mp3",
      'KeyN': "n.mp3",
      'KeyM': "d12.mp3",
      'Comma': "d13.mp3",
      'Period': "d14.mp3",
      'Slash': "d15.mp3",
    },
    "4": {
      'Digit1': "c12.mp3",
      'Digit2': "1.mp3",
      'Digit3': "2.mp3",
      'Digit4': "3.mp3",
      'Digit5': "5.mp3",
      'Digit6': "6.mp3",
      'Digit7': "d0.mp3",
      'Digit8': "d1.mp3",
      'Digit9': "d2.mp3",
      'Digit0': "d3.mp3",
      'KeyQ': "4.mp3",
      'KeyW': "5.mp3",
      'KeyE': "6.mp3",
      'KeyR': "7.mp3",
      'KeyT': "t.mp3",
      'KeyY': "y.mp3",
      'KeyU': "d4.mp3",
      'KeyI': "d5.mp3",
      'KeyO': "d6.mp3",
      'KeyP': "d7.mp3",
      'KeyA': "8.mp3",
      'KeyS': "9.mp3",
      'KeyD': "10.mp3",
      'KeyF': "11.mp3",
      'KeyG': "g.mp3",
      'KeyH': "h.mp3",
      'KeyJ': "d8.mp3",
      'KeyK': "d9.mp3",
      'KeyL': "d10.mp3",
      'Semicolon': "d11.mp3",
      'KeyZ': "12.mp3",
      'KeyX': "13.mp3",
      'KeyC': "14.mp3",
      'KeyV': "15.mp3",
      'KeyB': "b.mp3",
      'KeyN': "n.mp3",
      'KeyM': "d12.mp3",
      'Comma': "d13.mp3",
      'Period': "d14.mp3",
      'Slash': "d15.mp3",
    }
  }

  const setKeyCodes = () => {
    keyToCode.set("ArrowLeft", "ArrowLeft")
    keyToCode.set("ArrowUp", "ArrowUp")
    keyToCode.set("ArrowRight", "ArrowRight")
    keyToCode.set("ArrowDown", "ArrowDown")
    keyToCode.set("Q", "KeyQ")
    keyToCode.set("W", "KeyW")
    keyToCode.set("E", "KeyE")
    keyToCode.set("R", "KeyR")
    keyToCode.set("T", "KeyT")
    keyToCode.set("Y", "KeyY")
    keyToCode.set("U", "KeyU")
    keyToCode.set("I", "KeyI")
    keyToCode.set("O", "KeyO")
    keyToCode.set("P", "KeyP")
    keyToCode.set("A", "KeyA")
    keyToCode.set("S", "KeyS")
    keyToCode.set("D", "KeyD")
    keyToCode.set("F", "KeyF")
    keyToCode.set("G", "KeyG")
    keyToCode.set("H", "KeyH")
    keyToCode.set("J", "KeyJ")
    keyToCode.set("K", "KeyK")
    keyToCode.set("L", "KeyL")
    keyToCode.set("Z", "KeyZ")
    keyToCode.set("X", "KeyX")
    keyToCode.set("C", "KeyC")
    keyToCode.set("V", "KeyV")
    keyToCode.set("B", "KeyB")
    keyToCode.set("N", "KeyN")
    keyToCode.set("M", "KeyM")
    keyToCode.set("1", "Digit1")
    keyToCode.set("2", "Digit2")
    keyToCode.set("3", "Digit3")
    keyToCode.set("4", "Digit4")
    keyToCode.set("5", "Digit5")
    keyToCode.set("6", "Digit6")
    keyToCode.set("7", "Digit7")
    keyToCode.set("8", "Digit8")
    keyToCode.set("9", "Digit9")
    keyToCode.set("0", "Digit0")
    keyToCode.set(",", "Comma")
    keyToCode.set(".", "Period")
    keyToCode.set("/", "Slash")
    keyToCode.set(";", "Semicolon")
  }
  setKeyCodes()
  let keys = [
    List([
      { note: '1', code: 'Digit1', sound: sounds[chain]["Digit1"]},
      { note: '2', code: 'Digit2', sound: sounds[chain]["Digit2"]},
      { note: '3', code: 'Digit3', sound: sounds[chain]["Digit3"]},
      { note: '4', code: 'Digit4', sound: sounds[chain]["Digit4"]},
      { note: '5', code: 'Digit5', sound: sounds[chain]["Digit5"]},
      { note: '6', code: 'Digit6', sound: sounds[chain]["Digit6"]},
      { note: '7', code: 'Digit7', sound: sounds[chain]["Digit7"]},
      { note: '8', code: 'Digit8', sound: sounds[chain]["Digit8"]},
      { note: '9', code: 'Digit9', sound: sounds[chain]["Digit9"]},
      { note: '0', code: 'Digit0', sound: sounds[chain]["Digit0"]},
    ]),
    List([
      { note: 'Q', code: 'KeyQ', sound: sounds[chain]["KeyQ"]},
      { note: 'W', code: 'KeyW', sound: sounds[chain]["KeyW"]},
      { note: 'E', code: 'KeyE', sound: sounds[chain]["KeyE"]},
      { note: 'R', code: 'KeyR', sound: sounds[chain]["KeyR"]},
      { note: 'T', code: 'KeyT', sound: sounds[chain]["KeyT"]},
      { note: 'Y', code: 'KeyY', sound: sounds[chain]["KeyY"]},
      { note: 'U', code: 'KeyU', sound: sounds[chain]["KeyU"]},
      { note: 'I', code: 'KeyI', sound: sounds[chain]["KeyI"]},
      { note: 'O', code: 'KeyO', sound: sounds[chain]["KeyO"]},
      { note: 'P', code: 'KeyP', sound: sounds[chain]["KeyP"]},
    ]), List([
      { note: 'A', code: 'KeyA', sound: sounds[chain]["KeyA"]},
      { note: 'S', code: 'KeyS', sound: sounds[chain]["KeyS"]},
      { note: 'D', code: 'KeyD', sound: sounds[chain]["KeyD"]},
      { note: 'F', code: 'KeyF', sound: sounds[chain]["KeyF"]},
      { note: 'G', code: 'KeyG', sound: sounds[chain]["KeyG"]},
      { note: 'H', code: 'KeyH', sound: sounds[chain]["KeyH"]},
      { note: 'J', code: 'KeyJ', sound: sounds[chain]["KeyJ"]},
      { note: 'K', code: 'KeyK', sound: sounds[chain]["KeyK"]},
      { note: 'L', code: 'KeyL', sound: sounds[chain]["KeyL"]},
      { note: ';', code: 'Semicolon', sound: sounds[chain]["Semicolon"]},
    ]), List([
      { note: 'Z', code: 'KeyZ', sound: sounds[chain]["KeyZ"]},
      { note: 'X', code: 'KeyX', sound: sounds[chain]["KeyX"]},
      { note: 'C', code: 'KeyC', sound: sounds[chain]["KeyC"]},
      { note: 'V', code: 'KeyV', sound: sounds[chain]["KeyV"]},
      { note: 'B', code: 'KeyB', sound: sounds[chain]["KeyB"]},
      { note: 'N', code: 'KeyN', sound: sounds[chain]["KeyN"]},
      { note: 'M', code: 'KeyM', sound: sounds[chain]["KeyM"]},
      { note: ',', code: 'Comma', sound: sounds[chain]["Comma"]},
      { note: '.', code: 'Period', sound: sounds[chain]["Period"]},
      { note: '/', code: 'Slash', sound: sounds[chain]["Slash"]},
    ])]
  const themeColor = {
    "1": "bg-yellow",
    "2": "bg-red",
    "3": "bg-blue",
    "4": "bg-green",
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDownEventHandler)
    window.addEventListener('keyup', keyUpEventHandler);

    return () => {
      window.removeEventListener('keydown', keyDownEventHandler);
      window.removeEventListener('keyup', keyUpEventHandler);
    }
  });

  const keyDownEventHandler = (event) => {
    console.log("Clicked", event.code)
    console.log("Suggested", keyToCode.get(sequence[activeIndex]))
    if (event.code === "ArrowUp") setChain("1")
    if (event.code === "ArrowLeft") setChain("2")
    if (event.code === "ArrowDown") setChain("3")
    if (event.code === "ArrowRight") setChain("4")
    if (event.code === keyToCode.get(sequence[activeIndex])) setActive(activeIndex+1)
  }

  const keyUpEventHandler = (event) => {
    if (event.code === "ArrowUp") setChain("1")
    if (event.code === "ArrowLeft") setChain("2")
    if (event.code === "ArrowDown") setChain("3")
    if (event.code === "ArrowRight") setChain("4")
  }
  const arrowBaseClass = "flex w3 h3 ba ml3 items-center justify-center"
  return (
    <div className="flex flex-column">
      <div className="flex pv2 bg-black">
        <div className="flex flex-column">
          {
            keys.map( (list, id) => {
              return <div key={id} className="flex flex-row pv2 bg-black">
                { 
                  list.map( (key, idx) => {
                    return (
                      <LaunchPadKey themeColor={themeColor[chain]}key={idx} note={key.note} keyCode={key.code} soundPath={songPath + chainPath + key.sound}/>
                    )})
                }
              </div>
            })
          }
        </div>
        <div className='white pa5 flex items-center'>
          <h1 className="ttu tracked b lh-title">
            {sequence[activeIndex]}
          </h1>
          <p>
            {
              sequence.slice(activeIndex + 1, activeIndex+30)
            }
          </p>
        </div>
      </div>
      <div className="pv3 ba b--black flex bt-0">
        <div className={chain === "1" ? arrowBaseClass + " " + themeColor["1"] : arrowBaseClass}>
          <code>{"^"}</code>
        </div>
        <div className={chain === "2" ? arrowBaseClass + " " + themeColor["2"] : arrowBaseClass}>
          <code>{"<"}</code>
        </div>
        <div className={chain === "3" ? arrowBaseClass + " " + themeColor["3"] : arrowBaseClass}>
          <code>{"V"}</code>
        </div>
        <div className={chain === "4" ? arrowBaseClass + " " + themeColor["4"] : arrowBaseClass}>
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

export const GuitarInstrument = new Instrument('Launchpad', Launchpad);
