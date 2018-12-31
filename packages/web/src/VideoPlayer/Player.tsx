// import { gql } from 'apollo-boost';
// import gql from 'graphql-tag';
import * as React from 'react';
// import { Mutation, Query } from 'react-apollo';
// import { Query } from 'react-apollo';

// import AddEditClip from './AddEditClip';
import Clips from './Clips';
import Video from './Video';

import { VideoComponent } from './styles';

// tslint:disable-next-line
interface Props {
  baseUrl: string;
  location: any;
  history: any;
  params: any;
  videoUrl: string;
}

// tslint:disable-next-line
interface State {
  isEditingClip: boolean;
  url: string;
  videoFragment: string;
  clipToEdit: any;
  currentTime: number;
}

// @ts-ignore
class Player extends React.Component<Props, State, context> {
  // @ts-ignore
  // tslint:disable-next-line
  videoPlayer;
  // tslint:disable-next-line
  state: State = {
    clipToEdit: null,
    currentTime: 0,
    isEditingClip: false,
    url: this.props.baseUrl,
    // url: this.props.videoUrl,
    videoFragment: ''
  };
  // componentWillMount() {
  // @ts-ignore
  // tslint:disable-next-line
  componentDidMount() {
    console.log('>>> componentDidMount!!!');
    console.log('>>> this.props >', this.props);

    this.setState({ url: this.props.videoUrl }, () => {
      this.videoPlayer.load();
      return true;
    });
  }

  // @ts-ignore
  // tslint:disable-next-line
  shouldComponentUpdate(nextProps, nextState) {
    console.log('>>> shouldComponentUpdate!!!');
    console.log('nextProps.videoUrl !== this.props.videoUrl > ', nextProps.videoUrl !== this.props.videoUrl);
    // if (nextProps.videoUrl !== this.props.videoUrl || !!nextState.isEditingClip) {
    // if (nextProps.videoUrl !== this.props.videoUrl || nextState.isEditingClip !== this.state.isEditingClip) {
    if (nextProps.videoUrl !== this.props.videoUrl) {
      console.log('NEW > nextProps.videoUrl > ', nextProps.videoUrl);
      this.videoPlayer.load();
      return true;
    }
    return false;
  }

  // tslint:disable-next-line
  handlePlay = () => {
    console.log('handleClick >> ');
    this.videoPlayer.play();
  };

  // tslint:disable-next-line
  handleOnPlay = () => {
    console.log('handleOnPlay >> ');
    this.setState({
      isEditingClip: false
    });
  };

  // tslint:disable-next-line
  ref = (videoPlayer: HTMLVideoElement) => {
    this.videoPlayer = videoPlayer;
  };

  // tslint:disable-next-line
  render() {
    const { currentTime } = this.state;
    const { videoUrl } = this.props;
    return (
      <VideoComponent>
        <h2>Video Component with Fragments</h2>
        <p className="url">{videoUrl}</p>
        <nav>
          <button onClick={this.handlePlay}>PLAY</button>
        </nav>
        <Video getVideoEl={this.ref.bind(this)} handleOnPlay={() => this.handleOnPlay}>
          <source src={videoUrl} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
        </Video>
        <Clips currentTime={currentTime} />
      </VideoComponent>
    );
  }
}

export default Player;