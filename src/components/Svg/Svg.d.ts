import { DetailedHTMLProps, ReactElement } from 'react';
import { HTMLAttributes } from 'enzyme';

export interface ISvg {
  Icon: any;
  name?: any;
  handleClick?: DetailedHTMLProps<any, HTMLDivElement>;
  fill?: string;
  width?: string;
  className?: string;
  height?: string;
}
