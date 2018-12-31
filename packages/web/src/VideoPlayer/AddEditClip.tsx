import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { AddEditClipComponent } from './styles';

const SAVE_CLIP = gql`
  mutation saveClip($id: ID, $name: String, $start: Int, $end: Int) {
    saveClip(id: $id, name: $name, start: $start, end: $end) {
      id
      name
      start
      end
    }
  }
`;

// tslint:disable-next-line
interface Clip {
  end: number;
  id: any;
  name: string;
  start: number;
}

// tslint:disable-next-line
interface State {
  name: string;
  start: number;
  startSet: boolean;
  end: number;
  endSet: boolean;
}

// tslint:disable-next-line
interface Props {
  closeClipEdition: () => void;
  currentTime: number;
  clip: Clip;
  saveClip: (clip: Clip) => void;
}

class AddEditClip extends React.Component<Props, State> {
  // tslint:disable-next-line
  props: Props;
  // tslint:disable-next-line
  state: State = {
    end: (this.props.clip && this.props.clip.end) || this.props.currentTime,
    endSet: (this.props.clip && this.props.clip.end != null) || false,
    name: this.props.clip && this.props.clip.name ? this.props.clip.name : '',
    start: this.props.clip && this.props.clip.start ? this.props.clip.start : this.props.currentTime,
    startSet: (this.props.clip && this.props.clip.start != null) || false
  };

  // @ts-ignore
  // tslint:disable-next-line
  handleOnChangeName = e => this.setState({ name: e.target.value });

  // tslint:disable-next-line
  editClipStart = () => {
    console.log('>>>>>> editClipStart >>>>>>');
    this.setState({
      endSet: false,
      startSet: false
      // endSet: false,
      // startSet: false
    });
  };

  // tslint:disable-next-line
  setClipStart = (currentTime: number) => {
    console.log('>>>>>> setClipStart >>>>>>');
    console.log('currentTime > ', currentTime);
    this.setState({
      start: currentTime,
      startSet: true
    });
  };

  // tslint:disable-next-line
  editClipEnd = () => {
    this.setState({
      endSet: false
    });
  };

  // tslint:disable-next-line
  setClipEnd = (currentTime: number) => {
    console.log('>>>>>> setClipEnd >>>>>>');
    console.log('currentTime > ', currentTime);
    if (this.state.start < currentTime) {
      this.setState({
        end: currentTime,
        endSet: true
      });
    } else {
      console.warn('END time MUST be AFTER start!!');
    }
  };

  // tslint:disable-next-line
  saveClip = (clip: any) => {
    console.log('SAVE CLIP > clip > ', clip);
  };

  // tslint:disable-next-line
  render() {
    const { clip, closeClipEdition, currentTime, saveClip } = this.props;
    const { name, start, startSet, end, endSet } = this.state;
    /*
    console.log('>>>>>> AddClipDialog > RENDER >>>>>>');
    console.log('this.props > CURRENT TIME > ', currentTime);
    console.log('this.props > ', this.props);
    console.log('this.state > ', this.state);
    */
    return (
      <AddEditClipComponent>
        <ul>
          <li>
            <div>Name</div>
            <input type="text" value={name} onChange={this.handleOnChangeName} />
          </li>
          <li>
            <div>
              Start Time
              {!startSet ? (
                <div>
                  {currentTime}
                  <button className="set" onClick={() => this.setClipStart(currentTime)}>Set Start</button>
                </div>
              ) : (
                <div>
                  {start}
                  <button className="edit" onClick={this.editClipStart}>Edit Start</button>
                </div>
              )}
            </div>
          </li>
          {startSet ? (
            <li>
              <div>
                End Time
                {!endSet ? (
                  <div>
                    {currentTime}
                    <button className="set" onClick={() => this.setClipEnd(currentTime)}>Set End</button>
                  </div>
                ) : (
                  <div>
                    {end}
                    <button className="edit" onClick={this.editClipEnd}>
                      Edit End
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : null}
        </ul>
        {saveClip != null ? (
          // @ts-ignore
          <Mutation
            mutation={SAVE_CLIP}
            variables={{
              end,
              id: clip && clip.id ? clip.id : null,
              name,
              start
            }}
          >
            {SAVE_CLIP => ( // tslint:disable-line
              <button
                className="delete"
                // @ts-ignore
                onClick={() => {
                  SAVE_CLIP();
                  closeClipEdition();
                }}
              >
                Save
              </button>
            )}
          </Mutation>
        ) : null}
        <button className="cancel" onClick={closeClipEdition}>
          Cancel
        </button>
      </AddEditClipComponent>
    );
  }
}

export default AddEditClip;
