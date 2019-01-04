import * as React from 'react';

// tslint:disable-next-line
interface Props {
  handleTimeUpdate: () => void;
  setRef: any;
  videoUrl: string;
}

// @ts-ignore
class Video extends React.Component<Props, State> {
  // @ts-ignore
  // tslint:disable-next-line
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.videoUrl !== this.props.videoUrl;
  }

  // tslint:disable-next-line
  render() {
    return (
      <section>
        <video
          // ref={() => this.ref}
          ref={this.props.setRef}
          // TODO: false || remove this
          muted={true}
          autoPlay={true}
          controls
          preload="metadata"
          onTimeUpdate={this.props.handleTimeUpdate}
        >
          <source src={this.props.videoUrl} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
      </section>
    );
  }
}

export default Video;
