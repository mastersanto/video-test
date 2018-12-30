import * as React from 'react';
import { withRouter } from 'react-router-dom';
// import { RouteComponentProps } from 'react-router-dom';

import Player from './Player';

// @ts-ignore
const VideoPlayer = props => {
  const getVideoUrl = () => {
    const { start, end } = props.match.params;
    const fragmentStart = start ? `#t=${start}` : '';
    const fragmentEnd = fragmentStart !== '' && end ? `,${end}` : '';

    return `${props.baseUrl}${fragmentStart}${fragmentEnd}`;
  };

  return (
    <Player
      baseUrl={props.baseUrl}
      videoUrl={getVideoUrl()}
      history={props.history}
      location={props.location}
      params={props.match.params}
    />
  );
};

// @ts-ignore
export default withRouter(VideoPlayer);
