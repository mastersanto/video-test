// import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
// import { Route, Router, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { LoginView } from './modules/user/LoginView';
// import { RegisterView } from "./modules/user/RegisterView";
// import { Account } from "./modules/account/Account";
// import { PaidUsers } from "./modules/account/PaidUsers";
// import { Header } from "./shared/Header";
import Player from './Player';

// const VIDEO_URL = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';
// const VIDEO_URL = './sintel_trailer-480p.mp4';
const VIDEO_URL = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

const Routes = () => (
  // @ts-ignore
  <BrowserRouter basename={'/'}>
    <Switch>
      <Route exact={true} path="/player" render={() => <div>Player</div>} />
      <Route
        path="/:start?/:end?"
        children={props => {
          return <Player baseUrl={VIDEO_URL} history={props.history} location={props.location} match={props.match} />;
        }}
      />
      <Route path="/demo" component={Player} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
