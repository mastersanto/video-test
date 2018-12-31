import * as React from 'react';

import { ClipDataComponent } from './styles';

// tslint:disable-next-line
interface Props {
  name?: string;
  start?: number;
  end?: number;
}

// @ts-ignore
const ClipData = (props: Props) => (
  <ClipDataComponent>
    <ul className="data">
      <li>
        <span>Title:</span> {props.name || 'Full Video Length'}
      </li>
      <li>
        <span>Start:</span> {props.start || '0'}
      </li>
      <li>
        <span>End:</span> {props.end || 'VideoLength'}
      </li>
    </ul>
  </ClipDataComponent>
);

export default ClipData;
// export default withRouter(Clip);
