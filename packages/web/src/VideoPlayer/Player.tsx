import * as React from 'react';

import AddEditClip from './AddEditClip';
import Clip from './Clip';
import Clips from './Clips';
import Video from './Video';

import { getFragment } from '../utils';

import { ClipsComponent, VideoComponent } from './styles';

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
  videoFragment: string;
  clipToEdit: any;
  currentTime: number;
}

// @ts-ignore
class Player extends React.PureComponent<Props, State> {
  // @ts-ignore
  // tslint:disable-next-line
  videoPlayer;
  // tslint:disable-next-line
  state: State = {
    clipToEdit: null,
    currentTime: 0,
    isEditingClip: false,
    videoFragment: ''
  };

  // tslint:disable-next-line
  handlePlay = () => {
    console.log('handleClick >> ');
    this.videoPlayer.play();
  };

  // @ts-ignore
  // tslint:disable-next-line
  editClip = clip => {
    console.log('>>> editClip > clip > ', clip);
    console.log('>>> editClip > clip.name > ', clip.name);
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

  // @ts-ignore
  // tslint:disable-next-line
  handleTimeUpdate = () => {
    this.setState({
      currentTime: Math.floor(this.videoPlayer.currentTime)
    });
    /*
    TODO: this would be useful to listen video currentTime or unListen it
    this.setState({
      isEditingClip: false
    });
    */
  };

  // @ts-ignore
  // tslint:disable-next-line
  goToFragment = (start?, end?) => {
    this.props.history.push(getFragment(start, end));
    this.videoPlayer.load();
  };

  // @ts-ignore
  // tslint:disable-next-line
  setVideoRef = videoPlayer => {
    this.videoPlayer = videoPlayer;
  };

  // tslint:disable-next-line
  render() {
    const { clipToEdit, currentTime, isEditingClip } = this.state;
    const { videoUrl } = this.props;
    return (
      <VideoComponent>
        <h2>Video Component with Fragments</h2>
        <p className="description">Edit a clip and Change its start and end time.</p>
        <Video setRef={this.setVideoRef} handleTimeUpdate={this.handleTimeUpdate} videoUrl={videoUrl} />
        <ClipsComponent>
          <Clip
            clip={{
              name: 'Full Video'
            }}
            goToFragment={() => this.goToFragment(0)}
          />
          <Clips currentTime={currentTime} editClip={this.editClip} goToFragment={this.goToFragment} />
          <button onClick={this.editClip}>(+) New Clip</button>
          {isEditingClip ? (
            <AddEditClip
              // @ts-ignore
              clip={clipToEdit}
              closeClipEdition={this.closeClipEdition}
              currentTime={currentTime}
            />
          ) : null}
        </ClipsComponent>
      </VideoComponent>
    );
  }
}

export default Player;
