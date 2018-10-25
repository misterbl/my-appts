import * as React from 'react';
// import { Formik, Form } from 'formik';
// import { auth } from '../../firebase';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IDashBoardComponent } from './DashBoard.d';
// import ROUTES from '../../consts/routes';

export class DashBoard extends React.Component<IDashBoardComponent> {
  render() {
    // const { formatMessage } = this.props.intl;

    return (
      <div className="flex flex-column vh-100">
        <span className="white tc mt2">
          <FormattedMessage id="general|or" />
        </span>
      </div>
    );
  }
}

const injectIntlDashBoard = injectIntl(DashBoard);
export default withRouter(injectIntlDashBoard);
