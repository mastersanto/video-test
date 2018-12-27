import * as React from 'react';
import styled from 'styled-components';
// import { ClipType } from '../../typings';
// import 'webrtc';

const AddEditClipComponent = styled.div`
  background-color: cyan;
  padding: 8px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 10px;
  height: 124px;

  ul {
    list-style: none;
    margin: 0 0 5px;
    padding: 0;
  }

  button {
    cursor: pointer;

    &.set {
      display: inline;
    }

    &.save {
      background-color: green;
      color: white;
    }

    &.cancel {
      background-color: grey;
      color: white;
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
  // saveClip: (p: { name: string; start: number; end: number }) => void;
  // closeClipDialog: () => void;
  closeClipEdition: () => void;
  currentTime: number;
  clipToEdit: {
    end: number;
    id: number;
    name: string;
    start: number;
  };
}

class AddEditClip extends React.PureComponent<Props, State> {
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
  /*
  // @ts-ignore-start
  // tslint:disable-next-line
  componentWillReceiveProps(nextProps) {
    // @ts-ignore-end
    console.log('>>>>>> componentWillReceiveProps >>>>>>');
    console.log('> nextProps > ', nextProps);
    // this.setState({
    this.setState({
      end: nextProps.clipToEdit && nextProps.clipToEdit.end ? nextProps.clipToEdit.end : null,
      endSet: nextProps.clipToEdit && nextProps.clipToEdit.end,
      name: nextProps.clipToEdit && nextProps.clipToEdit.name ? nextProps.clipToEdit.name : '',
      start: nextProps.clipToEdit && nextProps.clipToEdit.start ? nextProps.clipToEdit.start : nextProps.currentTime,
      // start: nextProps.clipToEdit && nextProps.clipToEdit.start ? nextProps.clipToEdit.start : null,
      // startSet: false,
      startSet: nextProps.clipToEdit && nextProps.clipToEdit.start
    });
  }
  */

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
    console.log('>>>>>> SET >>>>>>');
    console.log('>>>>>> SET >>>>>>');
    console.log('>>>>>> SET >>>>>>');
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
    // const { saveClip, closeClipDialog, currentTime } = this.props;
    const { currentTime, closeClipEdition } = this.props;
    console.log('>>>>>> AddClipDialog > RENDER >>>>>>');
    console.log('this.props > ', this.props);
    console.log('this.state > ', this.state);
    const { name, start, startSet, end, endSet } = this.state;
    return (
      <AddEditClipComponent>
        <ul>
          <li>
            <div>Name</div>
            <input type="text" value={name} onChange={() => console.log('Name Change!')} />
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
        <button className="save" onClick={this.saveClip}>
          Save
        </button>
        <button className="cancel" onClick={closeClipEdition}>
          Cancel
        </button>
      </AddEditClipComponent>
    );
  }
}

export default AddEditClip;
