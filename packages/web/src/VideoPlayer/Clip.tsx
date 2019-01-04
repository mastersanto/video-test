import gql from 'graphql-tag';
// import { gql } from 'apollo-boost';
import * as React from 'react';
import { Mutation } from 'react-apollo';

import ClipData from './ClipData';
import { GET_CLIPS } from './Clips';
import { ClipComponent } from './styles';

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
  editClip?: (clip) => void;
  // @ts-ignore
  goToFragment: (start, end) => void;
}

// @ts-ignore
const Clip = (props: Props) => {
  return (
    <ClipComponent>
      <img alt={props.clip.name} src={'https://placekitten.com/200/120'} />
      <ClipData name={props.clip.name || 'Full Video Length'} start={props.clip.start || 0} end={props.clip.end} />
      <div className="actions">
        <button className="play" onClick={() => props.goToFragment(props.clip.start, props.clip.end)}>
          >
        </button>
        {props.editClip != null ? (
          <button
            className="edit"
            onClick={
              // @ts-ignore
              () => props.editClip(props.clip)
            }
          >
            edit
          </button>
        ) : null}
        {props.clip.id ? (
          <Mutation
            mutation={DELETE_CLIP}
            variables={{ id: props.clip.id }}
            update={(cache, { data }) => {
              // @ts-ignore
              const { clips } = cache.readQuery({ query: GET_CLIPS });
              console.log('Mutation DELETE_CLIP >> data > ', data);
              console.log('Mutation DELETE_CLIP >> clips > ', clips);
              // @ts-ignore
              // const clipToDelete = clips.find(clipItem => clipItem.id === data.id);
              // const index = clips.indexOf(clipToDelete);
              cache.writeQuery({
                query: GET_CLIPS,
                // tslint:disable-next-line
                data: {
                  clips: () => {
                    // @ts-ignore
                    const clipToDelete = clips.find(clipItem => clipItem.id === data.id);
                    // const index = clips.indexOf(clipToDelete);
                    return clips.splice(clipToDelete, 1);
                    // return clips.splice(index, 1);
                  }
                }
                // data: { clips: data.splice(index, 1) }
              });
              /*
              cache.writeQuery({
                query: GET_CLIPS,
                // tslint:disable-next-line
                data: {
                  clips: () => {
                    // @ts-ignore
                    const clipToDelete = async clips.find(clipItem => clipItem.id === data.id);
                    const index = clips.indexOf(clipToDelete);
                    clips.splice(index, 1);
                  }
                }
              });
              */
            }}
          >
            {DELETE_CLIP => ( // tslint:disable-line
              <button
                className="delete"
                // @ts-ignore
                onClick={DELETE_CLIP}
              >
                Delete
              </button>
            )}
          </Mutation>
        ) : null}
      </div>
    </ClipComponent>
  );
};

export default Clip;
