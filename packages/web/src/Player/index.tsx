import * as React from 'react';
import { withRouter } from 'react-router-dom';
// import { RouteComponentProps } from 'react-router-dom';

import Video from './Video';

// @ts-ignore
const Player = props => {
  const getVideoUrl = () => {
    const { start, end } = props.match.params;
    const fragmentStart = start ? `#t=${start}` : '';
    const fragmentEnd = fragmentStart !== '' && end ? `,${end}` : '';
    // TODO replace this.props => nextProps
    return `${props.baseUrl}${fragmentStart}${fragmentEnd}`;
  };

  return (
    <Video
      baseUrl={props.baseUrl}
      videoUrl={getVideoUrl()}
      history={props.history}
      location={props.location}
      params={props.match.params}
    />
  );
};

// @ts-ignore
export default withRouter(Player);
