import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import { AddEditClipComponent } from './styles';

const CLIP_MOCKED = {
  end: 20,
  name: 'New Clip',
  start: 15
};

const SAVE_CLIP = gql`
  mutation saveClip($id: Int, $name: String, $start: Int, $end: Int) {
    saveClip(id: $id, name: $name, start: $start, end: $end) {
      id
      name
      start
      end
    }
  }
`;

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
  clipToEdit: {
    end: number;
    id?: number;
    name: string;
    start: number;
  };
  // @ts-ignore
  saveClip: (clip) => void;
}

class AddEditClip extends React.Component<Props, State> {
  // tslint:disable-next-line
  props: Props;
  // tslint:disable-next-line
  state: State = {
    end: (this.props.clipToEdit && this.props.clipToEdit.end) || this.props.currentTime,
    endSet: (this.props.clipToEdit && this.props.clipToEdit.end != null) || false,
    name: this.props.clipToEdit && this.props.clipToEdit.name ? this.props.clipToEdit.name : '',
    start: this.props.clipToEdit && this.props.clipToEdit.start ? this.props.clipToEdit.start : this.props.currentTime,
    startSet: (this.props.clipToEdit && this.props.clipToEdit.start != null) || false
  };

  // @ts-ignore
  // tslint:disable-next-line
  handleOnChangeName = e => this.setState({ name: e.target.value });

  // tslint:disable-next-line
  setClipStart = (currentTime: number) => {
    console.log('>>>>>> SET >>>>>>');
    console.log('>>>>>> SET >>>>>>');
    console.log('>>>>>> SET >>>>>>');
    console.log('>>>>>> setClipStart >>>>>>');
    console.log('currentTime > ', currentTime);
    this.setState({
      start: currentTime,
      startSet: true
    });
  };

  // tslint:disable-next-line
  editClipStart = () => {
    this.setState({
      endSet: false,
      startSet: false
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
  editClipEnd = () => {
    this.setState({
      endSet: false
    });
  };

  // tslint:disable-next-line
  saveClip = (clipToEdit: any) => {
    console.log('SAVE CLIP > clipToEdit > ', clipToEdit);
  };

  // tslint:disable-next-line
  render() {
    const { clipToEdit, closeClipEdition, currentTime, saveClip } = this.props;
    const { name, start, startSet, end, endSet } = this.state;
    console.log('>>>>>> AddClipDialog > RENDER >>>>>>');
    console.log('this.props > ', this.props);
    console.log('this.state > ', this.state);

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
              {startSet ? (
                <div>
                  {start}
                  <button onClick={() => this.setClipStart(currentTime)}>Set Start</button>
                </div>
              ) : (
                <div>
                  {currentTime}
                  <button onClick={this.editClipStart}>Edit Start</button>
                </div>
              )}
            </div>
          </li>
          <li>
            {startSet ? (
              <div>
                End Time
                {endSet ? (
                  <div>
                    {end}
                    <button className="set" onClick={() => this.setClipEnd(currentTime)}>
                      Set End
                    </button>
                  </div>
                ) : (
                  <div>
                    {currentTime}
                    <button className="set" onClick={this.editClipEnd}>
                      Edit End
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </li>
        </ul>
        {saveClip != null ? (
          // @ts-ignore
          <Mutation
            mutation={SAVE_CLIP}
            variables={{
              end: CLIP_MOCKED.end,
              id: clipToEdit.id,
              name,
              start: CLIP_MOCKED.start
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
                Save YES
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
