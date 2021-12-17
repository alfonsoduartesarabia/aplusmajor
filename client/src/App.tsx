// 3rd party library imports
import { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';

// project imports
import { MainPage } from './MainPage';
import { DispatchAction, appReducer } from './Reducer';
import { defaultState } from './State';
import { initializeSocket, send } from './Socket';

// css imports
import 'animate.css';

/** ------------------------------------------------------------------------ **
 * App component
 ** ------------------------------------------------------------------------ */

function App() {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  useEffect(() => {
    initializeSocket(
      async socket => {
        dispatch(new DispatchAction('SET_SOCKET', { socket }));
        const response  = await send(socket, 'get_songs', {});
        dispatch(new DispatchAction('SET_SONGS', { songs: response }));
      },
      () => {
        dispatch(new DispatchAction('DELETE_SOCKET'));
      },
    );
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route path="/">
          <MainPage state={state} dispatch={dispatch} />
        </Route>
        <Route path="/:instrument">
          <MainPage state={state} dispatch={dispatch} />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
