import * as React from 'react';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import {
  EditProfileComponent,
  EditProfileState
} from './EditProfile.d';
// import * as apiThunk from '../../actions/thunks/apiThunk';
// import { IAppState } from 'src/types/state';
// import { getUserData } from 'src/selectors/apiSelectors';

import { ROUTES } from '../../consts';
import { chevronLeftIcon } from 'src/styles/assets';
import Svg from 'src/components/Svg';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import AddInfoForm from '../AddInfoForm/AddInfoForm';
import ChildrenForm from 'src/components/ChildrenForm/ChildrenForm';

export class EditProfile extends React.Component<EditProfileComponent, EditProfileState> {
  pagesName = ['MY DETAILS', 'MY AD', 'MY CHILDREN', 'MY PHOTOS'];
  constructor(props: EditProfileComponent) {
    super(props);
    this.state = { selected: '' }
  }
  // onSubmit = (event: any) => {
  //   const { firstName, lastName, address, postCode, city } = event;
  //   // @ts-ignore
  //   const { _id } = this.props.user;
  //   this.props.apiThunk.updateUser(
  //     QUERIES({ _id, firstName, lastName, address, postCode, city })
  //       .UPDATE_PERSONAL_INFO,
  //   );
  //   this.props.history.push(ROUTES.AD_DETAILS);
  // };

  renderPage = (selected: any) => {
    switch (selected) {
      case 'MY DETAILS':
        // @ts-ignore
        return <PersonalInfoForm />;
      case 'MY AD':
        return <AddInfoForm />;
      case 'MY CHILDREN':
        // @ts-ignore
        return <ChildrenForm />;
      default:
        return <span />;
    }
  }
  render() {
    // const {
    //   user,
    //   intl: { formatMessage },
    // } = this.props;
    const { pagesName, state: { selected } } = this
    return (
      <>
        <header className="green-bg pt3 shadow-3">
          <p className="flex ma0" onClick={() => this.props.history.push(ROUTES.SEARCH)}>
            <Svg fill="white" Icon={chevronLeftIcon} />
            <p className="white ma0 ml3">My Profile</p>
          </p>
          <div className="f6 mt3 flex flex-nowrap justify-between mh2">
            {
              pagesName.map((tab, index) => (
                <div onClick={() => this.setState({ selected: tab })} className={`white pb2 ${selected === tab ? 'bb b--orange' : ''}`}>{tab}</div>
              ))
            }
          </div>
        </header>
        {this.renderPage(selected)}

      </>
    );
  }
}

// export const mapStateToProps = (
//   state: IAppState,
// ): IEditProfileMapStateToProps => ({
//   user: getUserData(state),
// });

// export const mapDispatchToProps = (
//   dispatch: Dispatch<AnyAction>,
// ): IEditProfileDispatchToProps => ({
//   apiThunk: bindActionCreators(apiThunk, dispatch),
// });

const injectIntlEditProfile = injectIntl(EditProfile);
export default withRouter(injectIntlEditProfile);
