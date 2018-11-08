import * as React from 'react';
// import { generatePath } from 'react-router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { TDashBoard, IDashBoardMapStateToProps } from './DashBoard.d';
import Svg from 'src/components/Svg';
import { AccountIcon, chevronRigthIcon } from 'src/styles/assets';
// import { ROUTES } from 'src/consts';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';
import { connect } from 'react-redux';

export class DashBoard extends React.Component<TDashBoard> {
  pushToPage = (route: string) => {
    this.props.history.push(route);
  };

  render() {
    console.log(this.props.user);

    return (
      <>
        {this.props.user && (
          <div
            onClick={() =>
              // @ts-ignore
              this.props.history.push(`${this.props.user._id}/card`)
            }
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
        )}
      </>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IDashBoardMapStateToProps => ({
  user: getUserData(state),
});

const injectIntlDashBoard = injectIntl(DashBoard);
export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(injectIntlDashBoard),
);
