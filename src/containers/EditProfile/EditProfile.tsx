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
  pagesName = ['MY INFO', 'MY AD', 'MY CHILDREN', 'MY PHOTOS'];
  constructor(props: EditProfileComponent) {
    super(props);
    // @ts-ignore
    this.submiFormInfo = React.createRef();
    // @ts-ignore
    this.submiFormAd = React.createRef();
    // @ts-ignore
    this.submiFormChildren = React.createRef();
    // @ts-ignore
    this.submiFormPhotos = React.createRef();

    this.state = { selected: 'MY INFO' }
  }

  changeTab = (selected: any, tab: any) => {
    console.log(selected)
    switch (selected) {
      case 'MY INFO':
        // @ts-ignore
        if (this.submiFormInfo && this.submiFormInfo.current) { this.submiFormInfo.current.click(); }
      case 'MY AD':
        // @ts-ignore
        if (this.submiFormAd && this.submiFormAd.current) { this.submiFormAd.current.click(); }
      case 'MY CHILDREN':
        // @ts-ignore
        if (this.submiFormChildren && this.submiFormChildren.current) { this.submiFormChildren.current.click(); }
    }
  }

  renderPage = (selected: any) => {
    switch (selected) {
      case 'MY INFO':
        // @ts-ignore
        return (<PersonalInfoForm submitButton={<button ref={this.submiFormInfo} type="submit" />} />);
      case 'MY AD':
        // @ts-ignore
        return <AddInfoForm submitButton={<button ref={this.submiFormAd} type="submit" />} />;
      case 'MY CHILDREN':
        // @ts-ignore
        return <ChildrenForm submitButton={<button ref={this.submiFormChildren} type="submit" />} />;
      default:
        return <span />;
    }
  }
  render() {
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
                <div key={tab} onClick={async () => { await this.changeTab(selected, tab); this.setState({ selected: tab }); }} className={`white pb2 ttu ${selected === tab ? 'bb b--orange' : ''}`}>{tab}</div>
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
