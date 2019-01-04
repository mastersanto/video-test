import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

import Clip from './Clip';

export const GET_CLIPS = gql`
  query Clips {
    clips {
      id
      name
      start
      end
    }
  }
`;

// tslint:disable-next-line
interface ClipType {
  end: number;
  id?: any;
  name: string;
  start: number;
}

// tslint:disable-next-line
interface Props {
  currentTime: number;
  // @ts-ignore
  editClip: (clip) => void;
  // @ts-ignore
  goToFragment: (start, end) => void;
}

// tslint:disable-next-line
interface State {
  clipToEdit?: ClipType;
}

class Clips extends React.Component<Props, State> {
  // tslint:disable-next-line
  props: Props;

  // @ts-ignore
  // tslint:disable-next-line
  saveClip = (clip?: any) => {
    console.log('>>> saveClip > clip > ', clip);
  };

  // @ts-ignore
  // tslint:disable-next-line
  deleteClip = (clip?: any) => {
    console.log('>>> deleteClip > clip > ', clip);
  };

  // tslint:disable-next-line
  render() {
    const { editClip, goToFragment } = this.props;

    return (
      <Query query={GET_CLIPS}>
        {({ loading, data }) => {
          if (!data) {
            return null;
          }
          if (loading) {
            return <p>Loading...</p>;
          }
          return (
            <section className="ClipsList">
              {data.clips.map((clip: any) => (
                <Clip
                  key={clip.id}
                  clip={clip}
                  // tslint:disable-next-line
                  editClip={() => editClip(clip)}
                  // tslint:disable-next-line
                  goToFragment={goToFragment}
                />
              ))}
            </section>
          );
        }}
      </Query>
    );
  }
}

export default Clips;