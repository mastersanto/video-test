import gql from 'graphql-tag';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { GET_CLIPS } from './Clips';
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
  id?: any;
  name: string;
  start: number;
}

// tslint:disable-next-line
interface State {
  id: any;
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
}

class AddEditClip extends React.Component<Props, State> {
  // tslint:disable-next-line
  props: Props;
  // tslint:disable-next-line
  state: State = {
    end: (this.props.clip && this.props.clip.end) || this.props.currentTime,
    endSet: (this.props.clip && this.props.clip.end != null) || false,
    id: (this.props.clip && this.props.clip.id) || null,
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
    const { closeClipEdition, currentTime } = this.props;
    const { id, name, start, startSet, end, endSet } = this.state;
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
                  <button className="set" onClick={() => this.setClipStart(currentTime)}>Set</button>
                  (move through timeline)
                </div>
              ) : (
                <div>
                  {start}
                  <button className="edit" onClick={this.editClipStart}>Change</button>
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
                    <button className="set" onClick={() => this.setClipEnd(currentTime)}>Set</button>
                    (move through timeline)
                  </div>
                ) : (
                  <div>
                    {end}
                    <button className="edit" onClick={this.editClipEnd}>
                      Change
                    </button>
                  </div>
                )}
              </div>
            </li>
          ) : null}
        </ul>
        <Mutation
          mutation={SAVE_CLIP}
          variables={{
            end,
            id,
            name,
            start
          }}
          // tslint:disable-next-line
          update={(cache, { data }) => {
            // @ts-ignore
            const { clips } = cache.readQuery({ query: GET_CLIPS });
            // @ts-ignore
            const setClips = () => {
              if (id == null) {
                return clips.concat([data.saveClip]);
              }
              return;
            };
            cache.writeQuery({
              query: GET_CLIPS,
              // tslint:disable-next-line
              data: {
                clips: setClips()
              }
            });
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
        <button className="cancel" onClick={closeClipEdition}>
          Cancel
        </button>
      </AddEditClipComponent>
    );
  }
}

export default AddEditClip;
