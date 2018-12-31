import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';

import AddEditClip from './AddEditClip';
import Clip from './Clip';

import { ClipsComponent } from './styles';

const GET_CLIPS = gql`
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
interface Props {
  // closeClipEdition: () => void;
  // editClip: () => void;
  // saveClip: () => void;
  currentTime: number;
}

// tslint:disable-next-line
interface State {
  isEditingClip: boolean;
  clipToEdit: any;
}

class Clips extends React.PureComponent<Props, State> {
  // tslint:disable-next-line
  props: Props;

  // tslint:disable-next-line
  state: State = {
    clipToEdit: null,
    isEditingClip: false
  };

  // @ts-ignore
  // tslint:disable-next-line
  editClip = clip => {
    console.log('>>> editClip > clip > ', clip);
    console.log('>>> editClip > clip.name > ', clip.name);
    this.setState(
      {
        clipToEdit: clip
      },
      () => {
        this.setState({
          isEditingClip: true
        });
      }
    );
  };

  // tslint:disable-next-line
  closeClipEdition = () => {
    this.setState({
      isEditingClip: false
    });
  };

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
    const { clipToEdit, isEditingClip } = this.state;
    const { currentTime } = this.props;

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
            <ClipsComponent>
              <Clip />
              <section>
                {data.clips.map((clip: any) => (
                  <Clip
                    key={clip.id}
                    id={clip.id}
                    name={clip.name}
                    start={clip.start}
                    end={clip.end}
                    // deleteClip={id => this.deleteClip(id)}
                    // tslint:disable-next-line
                    editClip={this.editClip}
                  />
                ))}
              </section>
              <button onClick={this.editClip}>(+) New Clip</button>
              {isEditingClip ? (
                <AddEditClip
                  clipToEdit={clipToEdit}
                  closeClipEdition={this.closeClipEdition}
                  // tslint:disable-next-line
                  saveClip={this.saveClip}
                  // saveClip={clipToEdit => this.saveClip(clipToEdit)}
                  currentTime={currentTime}
                />
              ) : null}
            </ClipsComponent>
          );
        }}
      </Query>
    );
  }
}

export default Clips;