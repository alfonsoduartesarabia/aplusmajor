// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/Guitar';
import { FluteInstrument } from './instruments/Flute';
import { WaveformVisualizer } from './visualizers/Waveform';
import { StarVisualizer } from './visualizers/alfonsoduartesarabia';
<<<<<<< Updated upstream
import { Circle } from './visualizers/thetulga';
import { Smiley } from './visualizers/ezra';
// import { DrumMachineInstrument } from './instruments/alfonsoduartesarabia';
=======
import { DrumMachineInstrument } from './instruments/alfonsoduartesarabia';
>>>>>>> Stashed changes

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

<<<<<<< Updated upstream
const instruments = List([PianoInstrument, GuitarInstrument,FluteInstrument]);
const visualizers = List([WaveformVisualizer, StarVisualizer, Circle,Smiley]);
=======
const instruments = List([PianoInstrument,DrumMachineInstrument]);
const visualizers = List([WaveformVisualizer,StarVisualizer]);
>>>>>>> Stashed changes
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
