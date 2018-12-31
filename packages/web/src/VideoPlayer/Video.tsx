import * as React from 'react';

// tslint:disable-next-line
interface Props {
  children: any;
  handleTimeUpdate: () => void;
  // @ts-ignore
  // handleOnPlay: (el) => void;
  getVideoEl: () => void;
}

// @ts-ignore
const Video = (props: Props) => (
  <video
    ref={props.getVideoEl}
    // TODO: false || remove this
    muted={true}
    autoPlay={true}
    controls
    preload="metadata"
    // onPlay={el => props.handleOnPlay(el)}
    onTimeUpdate={props.handleTimeUpdate}
  >
    {props.children != null ? props.children : null}
  </video>
);

export default Video;
