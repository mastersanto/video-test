// import { graphql } from "react-apollo";
// import { gql } from 'apollo-boost';
import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';
// import { graphql, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';

// import styled from 'styled-components';

// import { Link } from 'react-router-dom';
import ClipData from './ClipData';
import { ClipComponent } from './styles';

const DELETE_CLIP = gql`
  mutation deleteClip($id: Int!) {
    deleteClip(id: $id)
  }
`;

// tslint:disable-next-line
interface Props {
  id?: number;
  // id?: number;
  name?: string;
  start?: number;
  end?: number;
  // @ts-ignore
  editClip?: (clip) => void;
  // @ts-ignore
  deleteClip?: (id) => void;
}

// @ts-ignore
const Clip = (props: Props) => {
  console.log('CLP!!!! >> ', props);
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
      <ClipData name={props.name || 'Full Video Length'} start={props.start || 0} end={props.end} />
      <div className="actions">
        <Link className="play" to={getVideoFragment()}>
          >
        </Link>
        {props.start ? (
          <section>
            <Mutation mutation={DELETE_CLIP} variables={{ id: props.id }}>
              {DELETE_CLIP => ( // tslint:disable-line
                <button
                  className="delete"
                  // @ts-ignore
                  onClick={DELETE_CLIP}
                  // onClick={() => DELETE_CLIP({ id: props.id })}
                >
                  Delete: {props.id}
                </button>
              )}
            </Mutation>
          </section>
        ) : null}
      </div>
    </ClipComponent>
  );
};

export default Clip;
// export default withRouter(Clip);
