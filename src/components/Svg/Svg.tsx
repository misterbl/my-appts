import * as React from 'react';
import { ISvg } from './Svg.d';

const Svg = ({
  Icon,
  name = '',
  handleClick,
  fill = '#555555',
  width = '20pt',
  height = '20pt',
}: ISvg) => (
  <div onClick={handleClick} className="flex flex-column items-center">
    <Icon fill={fill} width={width} height={height} />
    <span className={`f7 ${fill === '#555555' ? 'mid-gray' : 'orange'}`}>
      {name}
    </span>
  </div>
);

export default Svg;
