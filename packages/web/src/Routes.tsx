import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import VideoPlayer from './VideoPlayer';

const VIDEO_URL = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

const Routes = () => (
  // @ts-ignore
  <BrowserRouter basename={'/'}>
    <Switch>
      <Route exact={true} path="/player" render={() => <div>Player</div>} />
      <Route
        path="/:start?/:end?"
        children={props => {
          return (
            <VideoPlayer baseUrl={VIDEO_URL} history={props.history} location={props.location} match={props.match} />
          );
        }}
      />
      <Route path="/demo" component={VideoPlayer} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
