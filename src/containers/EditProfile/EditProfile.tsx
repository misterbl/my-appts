import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { TEditProfile, EditProfileState } from './EditProfile.d';
import { ROUTES } from '../../consts';
import { chevronLeftIcon } from 'src/styles/assets';
import Svg from 'src/components/Svg';
import PersonalInfoForm from '../PersonalInfoForm/PersonalInfoForm';
import AddInfoForm from '../AddInfoForm/AddInfoForm';
import ChildrenForm from 'src/components/ChildrenForm/ChildrenForm';

export class EditProfile extends React.Component<
  TEditProfile,
  EditProfileState
> {
  pagesName = ['myinfo', 'myad', 'mychildren', 'myavailabilities'];
  buttonRef = React.createRef<HTMLButtonElement>();
  constructor(props: TEditProfile) {
    super(props);
    this.state = {
      selected: 'myinfo',
    };
  }

  submitForm = () => {
    const node = this.buttonRef.current;
    if (node) {
      node.click();
    }
  };

  submitButton = () => <button ref={this.buttonRef} type="submit" />;

  handleClick = async (tab: string) => {
    await this.submitForm();
    this.setState({ selected: tab });
  };

  renderPage = (selected: any) => {
    switch (selected) {
      case 'myinfo':
        // @ts-ignore
        return <PersonalInfoForm submitButton={this.submitButton()} />;
      case 'myad':
        // @ts-ignore
        return <AddInfoForm submitButton={this.submitButton()} />;
      case 'mychildren':
        // @ts-ignore
        return <ChildrenForm submitButton={this.submitButton()} />;
      default:
        return <span />;
    }
  };

  render() {
    const {
      pagesName,
      state: { selected },
      props: {
        history: { push },
        intl: { formatMessage },
      },
      handleClick,
      renderPage,
    } = this;
    return (
      <>
        <header className="green-bg pt3 shadow-3">
          <div className="flex ma0" onClick={() => push(ROUTES.DASHBOARD)}>
            <Svg fill="white" Icon={chevronLeftIcon} />
            <span className="white ml3 ttc">
              <FormattedMessage id="content|editprofile|myprofile" />
            </span>
          </div>
          <div className="f6 mt3 flex flex-nowrap justify-between mh2">
            {pagesName.map(tab => (
              <div
                key={tab}
                onClick={() => handleClick(tab)}
                className={`white pb2 ttu ${
                  selected === tab ? 'bb b--orange' : ''
                }`}
              >
                {formatMessage({
                  id: `content|editprofile|${tab}`,
                })}
              </div>
            ))}
          </div>
        </header>
        {renderPage(selected)}
      </>
    );
  }
}

const injectIntlEditProfile = injectIntl(EditProfile);
export default withRouter(injectIntlEditProfile);
