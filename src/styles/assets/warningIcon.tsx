import * as React from 'react';
import { IIcon } from './Icons';

const WarningIcon = ({
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
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path
          d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256
     C512,114.497,397.493,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216
     c119.393,0,216,96.615,216,216C472,375.393,375.385,472,256,472z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M256,128.877c-11.046,0-20,8.954-20,20V277.67c0,11.046,8.954,20,20,20s20-8.954,20-20V148.877
     C276,137.831,267.046,128.877,256,128.877z"
        />
      </g>
    </g>
    <g>
      <g>
        <circle cx="256" cy="349.16" r="27" />
      </g>
    </g>
  </svg>
);

export default WarningIcon;
