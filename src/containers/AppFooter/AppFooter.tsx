import * as React from 'react';
// import { Formik, Form } from 'formik';
// import { auth } from '../../firebase';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router';
import MessageIcon from '../../styles/assets/messageIcon'
import { IDashBoardComponent } from './AppFooter.d';
// import ROUTES from '../../consts/routes';

export class DashBoard extends React.Component<IDashBoardComponent> {
  
  render() {
    // const { formatMessage } = this.props.intl;

    return (
      <div className="flex absolute bottom-0 mb2">
       <span>APP FOOTER</span> 
      <MessageIcon/>


      </div>
    );
  }
}

const injectIntlDashBoard = injectIntl(DashBoard);
export default withRouter(injectIntlDashBoard);
