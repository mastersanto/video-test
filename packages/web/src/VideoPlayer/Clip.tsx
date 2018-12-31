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

// tslint:disable-next-line
interface State {
  videoFragment: string;
}

/*
// @ts-ignore
function getVideoFragment(start, end) {
  const fragmentStart = start ? `/${start}` : '';
  const fragmentEnd = fragmentStart !== '' && end ? `/${end}` : '';
  console.log('>>>>>> Clip >>>>>> getVideoFragment <<<< fragment >>  ', `${fragmentStart}${fragmentEnd}`);

  return `${fragmentStart}${fragmentEnd}`;

}
*/

// const Clip = (props: Props) => {
// @ts-ignore
class Clip extends React.PureComponent<Props, State> {
  // tslint:disable-next-line
  getVideoFragment = () => {
    console.log('>>>>>> Clip >>>>>> getVideoFragment <<<<');
    // const { id, start, end } = props;
    // const { id, name, start, end } = props;
    const { start, end } = this.props.clip;
    const fragmentStart = start ? `/${start}` : '';
    const fragmentEnd = fragmentStart !== '' && end ? `/${end}` : '';
    console.log('>>>>>> Clip >>>>>> getVideoFragment <<<< fragment >>  ', `${fragmentStart}${fragmentEnd}`);

    return `${fragmentStart}${fragmentEnd}`;
  };

  // console.log('CLIP!!!! >> ', props);
  // props = Props;
  // tslint:disable-next-line
  state: State = {
    // videoFragment: getVideoFragment(this.props.clip.start, this.props.clip.end)
    // @ts-ignore
    videoFragment: this.getVideoFragment()
  };
  // const videoFragment = getVideoFragment();
  /*
  const clipToEdit = (clip) => {
    const { id, name, start, end } = clip;
    return { id, name, start, end };
  };
  */

  /*
   const { id, name, start, end } = props.clip;
   <button className="edit" onClick={() => props.editClip({ end, id, name, start }}>
   */

  // tslint:disable-next-line
  render() {
    return (
      // onClick={() => props.editClip({ clip: clipToEdit })}
      // const Clip = (props: { history: any; clip: any; saveClip: (clip) => void; goToClip: (fragment) => void }) => (
      <ClipComponent>
        <img alt={this.props.clip.name} src={'https://placekitten.com/200/120'} />
        <ClipData
          name={this.props.clip.name || 'Full Video Length'}
          start={this.props.clip.start || 0}
          end={this.props.clip.end}
        />
        <div className="actions">
          <Link className="play" to={this.state.videoFragment}>
            >
          </Link>
          {this.props.clip.id != null ? (
            <button className="edit" onClick={() => this.props.editClip(this.props.clip)}>
              edit
            </button>
          ) : null}
          {this.props.clip.id ? (
            <Mutation mutation={DELETE_CLIP} variables={{ id: this.props.clip.id }}>
              {DELETE_CLIP => ( // tslint:disable-line
                <button
                  className="delete"
                  // @ts-ignore
                  onClick={DELETE_CLIP}
                  // onClick={() => DELETE_CLIP({ id: props.id })}
                >
                  Delete: {this.props.clip.id}
                </button>
              )}
            </Mutation>
          ) : null}
        </div>
      </ClipComponent>
    );
  }
};

export default Clip;
// export default withRouter(Clip);
