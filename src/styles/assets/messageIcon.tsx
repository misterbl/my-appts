import * as React from 'react'

const SVG = ({
    style = {},
    fill = 'b8b8b8',
    width = '20pt',
    className = '',
    height = '20pt',
    viewBox = '0 -24 512 511',
  }) => <svg height={height}  fill={fill} viewBox={viewBox} width={width} xmlns="http://www.w3.org/2000/svg"><path d="m136 70.5h306v30h-306zm0 0"/><path d="m136 130.5h196v30h-196zm0 0"/><path d="m136 190.5h246v30h-246zm0 0"/><path d="m66 .5v100h-66v363.210938l120.261719-96.210938h248.738281v-77h22.738281l120.261719 96.207031v-386.207031zm273 337h-229.261719l-79.738281 63.789062v-270.789062h36v160h273zm143-13.210938-79.738281-63.789062h-306.261719v-230h386zm0 0"/></svg>

export default SVG;