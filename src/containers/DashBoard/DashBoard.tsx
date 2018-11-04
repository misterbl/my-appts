import * as React from 'react';

import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { IDashBoardComponent } from './DashBoard.d';
import Svg from 'src/components/Svg';
import { AccountIcon, chevronRigthIcon } from 'src/styles/assets';
import { ROUTES } from 'src/consts';

export class DashBoard extends React.Component<IDashBoardComponent> {
  pushToPage = (route: string) => {
    this.props.history.push(route);
  };

  render() {
    return (
      <div
        onClick={() => this.pushToPage(ROUTES.PROFILE)}
        className="flex flex-column vh-100 ph7-ns"
      >
        <div className="h3 br2 mt4 flex justify-center items-center shadow-4 pa3 ba b--moon-gray">
          <div className="flex ml3 justify-between w-100">
            <span className="flex">
              <Svg className="mr2" Icon={AccountIcon} />
              <FormattedMessage id="content|dashboard|profile" />
            </span>
            <Svg Icon={chevronRigthIcon} />
          </div>
        </div>
      </div>
    );
  }
}

const injectIntlDashBoard = injectIntl(DashBoard);
export default withRouter(injectIntlDashBoard);
