// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
import * as React from 'react';
// import { Mutation, Query } from 'react-apollo';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import AddEditClip from './AddEditClip';
import Clip from './Clip';
import Video from './Video';

const VideoComponent = styled.section`
  background-color: blue;
  padding: 5px;
  position: relative;

  video {
    max-width: 100%;
    min-width: 100%;
  }

  .url {
    font-size: 12px;
  }
`;

const ClipsComponent = styled.nav`
  display: flex;

  > button {
    cursor: pointer;
  }
`;

const GET_CLIPS = gql`
  query Clips {
    clips {
      id
      name
      start
      end
    }
  }
`;

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
    if (nextProps.videoUrl !== this.props.videoUrl || nextState.isEditingClip !== this.state.isEditingClip) {
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

  // @ts-ignore
  // tslint:disable-next-line
  editClip = clip => {
    console.log('>>> editClip > clip > ', clip);
    this.setState(
      {
        clipToEdit: clip
      },
      () => {
        this.setState({
          isEditingClip: true
        });
      }
    );
  };

  // @ts-ignore
  // tslint:disable-next-line
  saveClip = (clip?: any) => {
    console.log('>>> saveClip > clip > ', clip);
  };

  // @ts-ignore
  // tslint:disable-next-line
  deleteClip = (clip?: any) => {
    console.log('>>> deleteClip > clip > ', clip);
  };

  // tslint:disable-next-line
  closeClipEdition = () => {
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
    const { clipToEdit, isEditingClip, currentTime } = this.state;
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
        <Query query={GET_CLIPS}>
          {({ loading, data }) =>
            !loading && (
              <ClipsComponent>
                <Clip />
                {data.clips.map((clip: any) => (
                  <Clip
                    key={clip.id}
                    // id={clip.id}
                    name={clip.name}
                    start={clip.start}
                    end={clip.end}
                    // deleteClip={id => this.deleteClip(id)}
                    // tslint:disable-next-line
                    editClip={clip => this.editClip(clip)}
                  />
                ))}
                <button onClick={() => this.editClip}>(+) New Clip</button>
                {isEditingClip ? (
                  <AddEditClip
                    clipToEdit={clipToEdit}
                    closeClipEdition={this.closeClipEdition}
                    saveClip={clip => this.saveClip(clip)}
                    currentTime={currentTime}
                  />
                ) : null}
              </ClipsComponent>
            )
          }
        </Query>
      </VideoComponent>
    );
  }
}

export default Player;
