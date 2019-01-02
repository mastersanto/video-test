// import { graphql } from "react-apollo";
// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';
// import { graphql, Mutation } from 'react-apollo';
// import { Link as RouterLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

// import styled from 'styled-components';

// import { Link } from 'react-router-dom';
import ClipData from './ClipData';
import { ClipComponent } from './styles';
// import { Props } from "react";

const DELETE_CLIP = gql`
  mutation deleteClip($id: ID!) {
    deleteClip(id: $id)
  }
`;

// tslint:disable-next-line
interface Props {
  clip: {
    id?: any;
    name: string;
    start?: number;
    end?: number;
  };
  // @ts-ignore
  editClip: (clip) => void;
}

// class Clip extends React.PureComponent<Props, State> {
// @ts-ignore
const Clip = (props: Props) => {
  // tslint:disable-next-line
  const getVideoFragment = () => {
    console.log('>>>>>> Clip >>>>>> getVideoFragment <<<<');
    // const { id, start, end } = props;
    // const { id, name, start, end } = props;
    const { start, end } = props.clip;
    const fragmentStart = start ? `/${start}` : '';
    const fragmentEnd = fragmentStart !== '' && end ? `/${end}` : '';
    console.log('>>>>>> Clip >>>>>> getVideoFragment <<<< fragment >>  ', `${fragmentStart}${fragmentEnd}`);

    return `${fragmentStart}${fragmentEnd}`;
  };

  // tslint:disable-next-line
  return (
    // onClick={() => props.editClip({ clip: clipToEdit })}
    // const Clip = (props: { history: any; clip: any; saveClip: (clip) => void; goToClip: (fragment) => void }) => (
    <ClipComponent>
      <img alt={props.clip.name} src={'https://placekitten.com/200/120'} />
      <ClipData name={props.clip.name || 'Full Video Length'} start={props.clip.start || 0} end={props.clip.end} />
      <div className="actions">
        <Link className="play" to={getVideoFragment()}>
          >
        </Link>
        {props.clip.id != null ? (
          <button className="edit" onClick={() => props.editClip(props.clip)}>
            edit
          </button>
        ) : null}
        {props.clip.id ? (
          <Mutation mutation={DELETE_CLIP} variables={{ id: props.clip.id }}>
            {DELETE_CLIP => ( // tslint:disable-line
              <button
                className="delete"
                // @ts-ignore
                onClick={DELETE_CLIP}
                // onClick={() => DELETE_CLIP({ id: props.id })}
              >
                Delete: {props.clip.id}
              </button>
            )}
          </Mutation>
        ) : null}
      </div>
    </ClipComponent>
  );
};

export default Clip;
// export default withRouter(Clip);
