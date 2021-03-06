import * as React from 'react';
import { FacebookIcon } from '../../styles/assets/';
import Svg from '../Svg';
import { FormattedMessage } from 'react-intl';

const FacebookButton = (props: any) => (
  <div
    onClick={props.onClick}
    className={`facebook-button h45 flex items-center ${props.className}`}
  >
    <Svg
      className="bg-white fbIcon"
      width="20pt"
      height="25pt"
      Icon={FacebookIcon}
    />
    <strong className="white tc w-100 f5">
      <FormattedMessage id="general|button|continuewithfacebook" />
    </strong>
  </div>
);

export default FacebookButton;
