import * as React from 'react';
import { IIcon } from './Icons';

const chevronRigthIcon = ({
  fill = '#555555',
  width = '20pt',
  height = '20pt',
}: IIcon) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    version="1.1"
    id="Capa_1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128 		" />
      </g>
    </g>
  </svg>
);

export default chevronRigthIcon;
