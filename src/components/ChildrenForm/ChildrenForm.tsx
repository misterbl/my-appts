import * as React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  IChildrenFormComponent,
  IChildrenFormDispatchToProps,
  IChildrenFormMapStateToProps,
} from './ChildrenForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { getUserData } from '../../selectors/apiSelectors';
import { QUERIES } from '../../consts';
import ChildModal from '../ChildModal/ChildModal';
import { Child, IAppState } from '../../types/state';
import Svg from '../Svg';
import { deleteIcon } from '../../styles/assets';
import * as moment from 'moment';

export class ChildrenForm extends React.Component<IChildrenFormComponent> {
  removeChild = async (child: Child) => {
    this.props.apiThunk.removeChild(
      QUERIES({ _id: this.props.user!._id, child }).REMOVE_CHILD,
    );
  };
  childAge = (dob: number) => {
    const unixStamp = (moment().unix() - dob) / 31536000;
    const years = Math.floor(unixStamp);
    const months = Math.floor(unixStamp * 12);
    if (years === 1) {
      return (
        <FormattedMessage
          id="content|childrenform|year"
          values={{
            years,
          }}
        />
      );
    } else if (years > 1) {
      return (
        <FormattedMessage
          id="content|childrenform|years"
          values={{
            years,
          }}
        />
      );
    } else if (months > 1) {
      return (
        <FormattedMessage
          id="content|childrenform|months"
          values={{
            months,
          }}
        />
      );
    }
    return (
      <FormattedMessage
        id="content|childrenform|month"
        values={{
          months,
        }}
      />
    );
  };
  render() {
    const {
      user,
      intl: { formatMessage },
    } = this.props;

    return (
      <div className="mt3 mh3 mb6 ph5-m ph7-l">
        <p className="f5 gray mb2">
          <FormattedMessage id="content|childrenform|explanation1" />
        </p>
        <strong className="f6 mt2 gray">
          <FormattedMessage id="content|childrenform|explanation2" />
        </strong>
        <div className="flex flex-column mt4 justify-around">
          {user &&
            user.children &&
            user.children.map((child: any, index: number) => (
              <div
                className="flex gray relative mb4 pa1 child-elliptical ba b--orange"
                key={`${child.name}${index}`}
              >
                <div className=" flex flex-column tc pv2">
                  <span className="f4 dark-green">{child.name || ' '}</span>
                  <ChildModal updating child={child} user={user} />
                  <Svg
                    className="absolute delete-child "
                    Icon={deleteIcon}
                    handleClick={() => {
                      if (
                        window.confirm(
                          formatMessage(
                            {
                              id: 'content|childrenform|deleteConfirmation',
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
                <strong className="flex flex-column ml2 w-100 justify-center">
                  {this.childAge(child.dob)}
                  <span className="mt2 f6 i">{child.school}</span>
                </strong>
                {/* <div className="relative ma4" key={`${child.name}${index}`}>
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
                              id: 'content|childrenform|deleteConfirmation',
                            },
                            { childName: child.name },
                          ),
                        )
                      ) {
                        this.removeChild(child);
                      }
                    }}
                  />
                </div> */}
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
): IChildrenFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IChildrenFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlChildrenForm = injectIntl(ChildrenForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlChildrenForm);
