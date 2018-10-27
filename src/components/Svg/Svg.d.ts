import { DetailedHTMLProps, ReactElement } from 'react';

export interface ISvg {
  Icon: any;
  name?: any;
  handleClick?: DetailedHTMLProps<any, HTMLDivElement>;
  fill?: string;
  width?: string;
  className?: string;
  height?: string;
}
