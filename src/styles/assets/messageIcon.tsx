import * as React from 'react';
import { IIcon } from './Icons';

const messageIcon = ({
  fill = '#555555',
  width = '20pt',
  height = '20pt',
}: IIcon) => (
  <svg
    height={height}
    fill={fill}
    width={width}
    viewBox="0 -24 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m36 320v-220h-36v363.207031l120.261719-96.207031h248.738281v-47zm0 0" />
    <path d="m66 0v290h325.738281l120.261719 96.207031v-386.207031zm70 130h196v30h-196zm246 90h-246v-30h246zm60-120h-306v-30h306zm0 0" />
  </svg>
);

export default messageIcon;
