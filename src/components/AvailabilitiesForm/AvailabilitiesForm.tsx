import * as React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  IAvailabilitiesFormComponent,
  IAvailabilitiesFormDispatchToProps,
  IAvailabilitiesFormMapStateToProps,
} from './AvailabilitiesForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { getUserData } from 'src/selectors/apiSelectors';
import { QUERIES } from 'src/consts';
import ChildModal from '../ChildModal/ChildModal';
import { Child, IAppState } from 'src/types/state';
import Svg from '../Svg';
import { deleteIcon } from 'src/styles/assets';

export class AvailabilitiesForm extends React.Component<
  IAvailabilitiesFormComponent
> {
  removeChild = async (child: Child) => {
    this.props.apiThunk.removeChild(
      QUERIES({ _id: this.props.user!._id, child }).REMOVE_CHILD,
    );
  };
  render() {
    const {
      user,
      intl: { formatMessage },
    } = this.props;

    return (
      <div className="mt3 mh3">
        <p className="f5 gray mb2">
          <FormattedMessage id="content|availabilitiesForm|explanation1" />
        </p>
        <strong className="f6 mt2 gray">
          <FormattedMessage id="content|availabilitiesForm|explanation2" />
        </strong>
        <div className="flex flex-wrap mt4 justify-around">
          {user &&
            user.children &&
            user.children.map((child: any, index: number) => (
              <div className="relative ma4">
                <div className="flex flex-column tc">
                  <span className="f5 gray">{child.name || ' '}</span>
                  <ChildModal updating child={child} user={user} />
                </div>
                <Svg
                  className="absolute delete-child "
                  Icon={deleteIcon}
                  handleClick={() => {
                    if (
                      window.confirm(
                        formatMessage(
                          {
                            id: 'content|availabilitiesForm|deleteConfirmation',
                          },
                          { childName: child.name },
                        ),
                      )
                    ) {
                      this.removeChild(child);
                    }
                  }}
                />
              </div>
            ))}
        </div>
        <span className="tc">
          <ChildModal user={user} />
        </span>
      </div>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IAvailabilitiesFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAvailabilitiesFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlAvailabilitiesForm = injectIntl(AvailabilitiesForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlAvailabilitiesForm);
