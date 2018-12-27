import * as React from 'react';

// @ts-ignore
const VideoDisplay = props => (
  <video autoPlay={true} controls preload="metadata" onPlay={props.handleOnPlay}>
    {props.children}
  </video>
);

export default VideoDisplay;
// export default withRouter(Clip);
