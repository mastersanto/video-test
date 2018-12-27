import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
// import Clips from './Clips';

// import AddClip from './AddClip';
import AddEditClip from './AddEditClip';
import Clip from './Clip';
// import Video from './Video';

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
  // saveClip: (p: { name: string; start: number; end: number }) => void;
  // closeClipDialog: () => void;
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

class Player extends React.PureComponent<Props, State> {
  // @ts-ignore
  // tslint:disable-next-line
  videoPlayer;
  // tslint:disable-next-line
  props: Props;
  // tslint:disable-next-line
  state: State = {
    clipToEdit: null,
    currentTime: 0,
    isEditingClip: false,
    url: this.props.videoUrl,
    videoFragment: ''
  };

  // tslint:disable-next-line
  handlePlay = () => {
    console.log('handleClick >> ');
    // @ts-ignore
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
  goToClip = (fragment: string, end: any) => {
    console.log('handleOnPlay >> ');
    this.setState({
      url: `${this.props.videoUrl}#t=${fragment}`
    });
  };

  // @ts-ignore
  // tslint:disable-next-line
  editClip = (clip) => {
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
    const { url, clipToEdit, isEditingClip, currentTime } = this.state;
    return (
      <VideoComponent>
        <h2>Video Component with Fragments</h2>
        <p className="url">{url}</p>
        <nav>
          <button onClick={this.handlePlay}>PLAY</button>
        </nav>
        <video controls preload="metadata" ref={this.ref} onPlay={this.handleOnPlay}>
          <source src={url} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
        </video>
        <Query query={GET_CLIPS}>
          {({ loading, data }) =>
            !loading && (
              <ClipsComponent>
                {data.clips.map((clip: { id: number; name: string; start: number; end: number }) => (
                  <Clip key={clip.id} clip={clip} editClip={this.editClip} goToClip={this.goToClip} />
                ))}
                <button onClick={this.editClip}>(+) New Clip</button>
                {isEditingClip ? (
                  <AddEditClip
                    clipToEdit={clipToEdit}
                    closeClipEdition={this.closeClipEdition}
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
/*
const Video = (props: { videoUrl: string }) => {
  // @ts-ignore
  let videoEl;

  const handleClick = () => {
    console.log('handleClick >> ');
    // @ts-ignore
    videoEl.play();
  };

  return (
    <VideoComponent>
      <h2>Video Component with Fragments</h2>
      <p className="url">{props.videoUrl}</p>
      <nav>
        <button onClick={handleClick}>PLAY</button>
      </nav>
      <video
        // autoPlay={true}
        ref={(video: HTMLVideoElement) => {
          videoEl = video;
        }}
        controls
        preload="metadata"
      >
        <source src={props.videoUrl} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
      <Query query={GET_CLIPS}>
        {({ loading, data }) =>
          !loading && (
            <ClipsComponent>
              {data.clips.map((clip: { id: number; name: string; start: number; end: number }) => (
                <Clip className="Clip" key={clip.id} clip={clip} />
              ))}
              <AddClip currentTime={10} />
              <AddEditClip
                clip={{
                  end: 30,
                  id: 0,
                  name: 'Clip One',
                  start: 10
                }}
                currentTime={10}
              />
            </ClipsComponent>
          )
        }
      </Query>
    </VideoComponent>
  );
};
*/

export default Player;
