import * as React from 'react';

// tslint:disable-next-line
interface Props {
  children: any;
  handleOnPlay: () => void;
  getVideoEl: () => void;
}

// @ts-ignore
const Video = (props: Props) => (
  <video ref={props.getVideoEl} muted={true} autoPlay={true} controls preload="metadata" onPlay={props.handleOnPlay}>
    {props.children != null ? props.children : null}
  </video>
);

export default Video;
