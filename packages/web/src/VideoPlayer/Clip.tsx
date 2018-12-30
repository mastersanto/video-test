// import { graphql } from "react-apollo";
// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';
// import { graphql, Mutation } from 'react-apollo';
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

const DELETE_CLIP = gql`
  mutation deleteClip($id: Int!) {
    deleteClip(clipId: $id)
  }
`;

// tslint:disable-next-line
interface Props {
  id?: any;
  // id?: number;
  name?: string;
  start?: number;
  end?: number;
  // @ts-ignore
  editClip?: (clip) => void;
  // @ts-ignore
  // deleteClip?: (id) => void;
}

// @ts-ignore
const Clip = (props: Props) => {
  const getVideoFragment = () => {
    // const { id, start, end } = props;
    const { start, end } = props;
    const fragmentStart = start ? `/${start}` : '';
    const fragmentEnd = fragmentStart !== '' && end ? `/${end}` : '';

    return `${fragmentStart}${fragmentEnd}`;
  };

  return (
    // const Clip = (props: { history: any; clip: any; saveClip: (clip) => void; goToClip: (fragment) => void }) => (
    <ClipComponent>
      <img alt={props.name} src={'https://placekitten.com/200/120'} />
      <ul className="data">
        <li>
          <span>Title:</span> {props.name}
        </li>
        <li>
          <span>Start:</span> {props.start}
        </li>
        <li>
          <span>End:</span> {props.end}
        </li>
      </ul>
      <div className="actions">
        <Link className="play" to={getVideoFragment()}>
          >
        </Link>
        <button className="edit" onClick={props.editClip}>
          edit
        </button>
        <Mutation mutation={DELETE_CLIP} key={props.id}>
          {DELETE_CLIP => ( // tslint:disable-line
            <button
              className="delete"
              // @ts-ignore
              onClick={() => DELETE_CLIP({ clipId: props.id })}
            >
              Delete
            </button>
          )}
        </Mutation>
      </div>
    </ClipComponent>
  );
};

export default Clip;
// export default withRouter(Clip);
