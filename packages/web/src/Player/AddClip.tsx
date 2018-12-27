import * as React from 'react';
import styled from 'styled-components';

// import AddEditClip from './AddEditClip';

const AddClipComponent = styled.div`
  display: flex;
  background-color: #ccc;
  min-width: 200px;
  position: relative;

  > button {
    cursor: pointer;
  }
`;

// @ts-ignore
const AddClip = (props: { clip?: any; currentTime: number }) => (
  <AddClipComponent>
    <button onClick={() => console.log('NEW CLIP!')}>(+) New Clip</button>
  </AddClipComponent>
);

export default AddClip;
