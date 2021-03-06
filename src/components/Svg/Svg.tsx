import * as React from 'react';
import { ISvg } from './Svg.d';

const Svg = ({
  Icon,
  name,
  className,
  handleClick,
  fill = '#555555',
  width = '15pt',
  height = '15pt',
}: ISvg) => (
  <div
    onClick={handleClick}
    className={`flex flex-column items-center ${className}`}
  >
    <Icon fill={fill} width={width} height={height} />
    {name && (
      <span
        className={`f7 pt1 tc ${fill === '#555555' ? 'mid-gray' : 'orange'}`}
      >
        {name}
      </span>
    )}
  </div>
);

export default Svg;
