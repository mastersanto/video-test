import * as React from 'react';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const ClipComponent = styled.div`
  position: relative;

  &:hover > .data {
    opacity: 1;
  }

  .data {
    background-color: rgba(255, 255, 255, 0.7);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: transform opacity 0.3s easy-out;
    list-style: none;
    margin: 0;
    padding: 16px;
    text-align: left;
    font-size: 12px;

    > li {
      > span {
        font-weight: bold;
      }
    }
  }

  .actions {
    position: absolute;
    bottom: 16px;
    left: 16px;

    > a,
    > button {
      border: 1px solid white;
      color: white;
      font-weight: bold;
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      display: inline-block;
      z-index: 1;
      border-radius: 15px;
      text-align: center;
    }
  }

  .play {
    background-color: red;
    width: 30px;
  }

  .edit {
    background-color: green;
    width: auto;
  }

  .delete {
    background-color: black;
    width: auto;
  }
`;

// @ts-ignore
const Clip = props => (
  // const Clip = (props: { history: any; clip: any; editClip: (clip) => void; goToClip: (fragment) => void }) => (
  <ClipComponent>
    <img alt={props.clip.name} src={'https://placekitten.com/200/120'} />
    <ul className="data">
      <li>
        <span>Title:</span> {props.clip.name}
      </li>
      <li>
        <span>Start:</span> {props.clip.start}
      </li>
      <li>
        <span>End:</span> {props.clip.end}
      </li>
    </ul>
    <div className="actions">
      <Link className="play" to={`/${props.clip.start}/${props.clip.end}`}>
        >
      </Link>
      <button
        className="edit"
        onClick={() => {
          props.editClip(props.clip);
        }}
      >
        edit
      </button>
      <button className="delete" onClick={() => console.log('CLICK on DELETE!!')}>
        delete
      </button>
    </div>
  </ClipComponent>
);

export default Clip;
// export default withRouter(Clip);
