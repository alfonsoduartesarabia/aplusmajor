// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/Guitar';
import { FluteInstrument } from './instruments/Flute';
import { WaveformVisualizer } from './visualizers/Waveform';
import { StarVisualizer } from './visualizers/alfonsoduartesarabia';
import { Circle } from './visualizers/thetulga';
import { Smiley } from './visualizers/ezra';
// import { DrumMachineInstrument } from './instruments/alfonsoduartesarabia';

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

const instruments = List([PianoInstrument, GuitarInstrument,FluteInstrument]);
const visualizers = List([WaveformVisualizer, StarVisualizer, Circle,Smiley]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
