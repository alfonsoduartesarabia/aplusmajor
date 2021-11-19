// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { StarVisualizer } from './visualizers/alfonsoduartesarabia';
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

const instruments = List([PianoInstrument]);
const visualizers = List([WaveformVisualizer,StarVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
