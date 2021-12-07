// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * All the components in the side navigation.
 ** ------------------------------------------------------------------------ */

interface SideNavProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
}

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column bb b--light-gray light-gray bg-blue pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
};

interface RadioButtonProps {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
}

const Playlist: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column bb h-50 b--light-gray light-gray bg-blue pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto">{children}</div>
    </div>
  );
};

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center near-white', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}

function Instruments({ state }: SideNavProps): JSX.Element {
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function Visualizers({ state }: SideNavProps): JSX.Element {
  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

function Songs({ state, dispatch }: SideNavProps): JSX.Element {
  const songs: List<any> = state.get('songs', List());
  const [query, setQuery] = useState("");


  return (
    <Playlist title="Playlist">
      {<input className="w-100" onChange={ event => {
      setQuery(event.target.value); 
      console.log(query)
      //console.log(songs.filter(song => song.get('song_title').includes(query)));
      }
      }/>}
      {songs.filter(song => song.get('song_title').toLowerCase().includes(query.toLowerCase())).map(song => ( // Change this to arr.filter and filter based on query
        <div
          key={song.get('id')}
          className="f6 pointer underline flex items-center no-underline i dim"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id') }))
          }
        >
          <Music20 className="mr1" />
          {song.get('song_title')}
        </div>
      ))}
    </Playlist>
  );
}

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  return (
    <div className="absolute top-0 left-0 bottom-0 w5 h-100 z-1 shadow-1 flex light-gray bg-blue flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
        A+ Major
      </div>
      <div className="flex-column h-100">
        <Instruments state={state} dispatch={dispatch} />
        <Visualizers state={state} dispatch={dispatch} />
        <Songs state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}
