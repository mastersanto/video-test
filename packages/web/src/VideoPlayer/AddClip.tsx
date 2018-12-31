import * as React from 'react';

// import AddEditClip from './AddEditClip';
import { AddClipComponent } from './styles';

// @ts-ignore
const AddClip = (props: { clip?: any; currentTime: number }) => (
  <AddClipComponent>
    <button onClick={() => console.log('NEW CLIP!')}>(+) New Clip</button>
  </AddClipComponent>
);

export default AddClip;
