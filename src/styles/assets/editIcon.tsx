import * as React from 'react';
import { IIcon } from './Icons';

const EditIcon = ({
  fill = '#555555',
  width = '20pt',
  height = '20pt',
}: IIcon) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    viewBox="0 0 6.82666 8.533325000000001"
    x="0px"
    y="0px"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <defs>
      <style type="text/css" />
    </defs>
    <g>
      <g>
        <polygon
          fill="black"
          points="1.81578,2.9703 2.9718,1.81428 2.57086,1.41333 1.41483,2.56935 "
        />
        <polygon
          fill="black"
          points="5.41183,5.41333 5.41183,4.39103 4.38953,5.41333 "
        />
        <polygon
          fill="black"
          points="5.38054,4.22301 3.06672,1.9092 1.9107,3.06522 4.22451,5.37904 "
        />
      </g>
      <path
        fill="black"
        d="M3.41333 -3.93701e-006c1.88513,0 3.41333,1.5282 3.41333,3.41333 0,1.88513 -1.5282,3.41333 -3.41333,3.41333 -1.88513,0 -3.41333,-1.5282 -3.41333,-3.41333 0,-1.88514 1.5282,-3.41333 3.41333,-3.41333zm0 0.341437c1.69656,0 3.0719,1.37533 3.0719,3.0719 0,1.69656 -1.37533,3.0719 -3.0719,3.0719 -1.69656,0 -3.0719,-1.37533 -3.0719,-3.0719 0,-1.69657 1.37533,-3.0719 3.0719,-3.0719z"
      />
    </g>
  </svg>
);

export default EditIcon;
