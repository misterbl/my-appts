import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { TDashBoard, IDashBoardMapStateToProps } from './DashBoard.d';
import Svg from 'src/components/Svg';
import { AccountIcon, chevronRigthIcon, signOutIcon } from 'src/styles/assets';
import { auth } from '../../firebase';
import { IAppState } from 'src/types/state';
import { getUserData } from 'src/selectors/apiSelectors';
import { connect } from 'react-redux';
import { ROUTES } from 'src/consts';

export class DashBoard extends React.Component<TDashBoard> {
  signOut = async () => {
    await auth.doSignOut();
    this.props.history.push(ROUTES.INDEX);
  };
  render() {
    return (
      <>
        {this.props.user && (
          <>
            <div
              onClick={() =>
                // @ts-ignore
                this.props.history.push(`${this.props.user._id}/card`)
              }
              className="flex flex-column pt4 ph5-m"
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
            <div
              onClick={() => this.signOut()}
              className="flex flex-column pt4 ph5-m"
            >
              <div className="h3 br2 mt4 flex justify-center items-center shadow-4 pa3 ba b--moon-gray">
                <div className="flex ml3 justify-between w-100">
                  <span className="flex">
                    <Svg className="mr2" Icon={signOutIcon} />
                    <FormattedMessage id="content|dashboard|signOut" />
                  </span>
                  <Svg Icon={chevronRigthIcon} />
                </div>
              </div>
            </div>
          </>
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
