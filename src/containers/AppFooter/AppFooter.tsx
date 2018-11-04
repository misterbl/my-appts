import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../consts/routes';
import {
  MessageIcon,
  HomeIcon,
  StarIcon,
  SearchIcon,
  BookingIcon,
} from '../../styles/assets';
import { TAppFooterComponent, IAppFooterState } from './AppFooter.d';
import Svg from '../../components/Svg';

export class AppFooter extends React.Component<
  TAppFooterComponent,
  IAppFooterState
> {
  constructor(props: TAppFooterComponent) {
    super(props);
    this.state = { clicked: '' };
  }
  iconList = () => [
    { icon: MessageIcon, route: ROUTES.INBOX, name: 'inbox' },
    { icon: HomeIcon, route: ROUTES.DASHBOARD, name: 'dashboard' },
    { icon: StarIcon, route: ROUTES.FAVOURITE, name: 'favourite' },
    { icon: SearchIcon, route: ROUTES.SEARCH, name: 'search' },
    { icon: BookingIcon, route: ROUTES.BOOKING, name: 'booking' },
  ];

  clickedAction = (route: string) => {
    this.setState({ clicked: route });
  };

  pushToPage = (route: string) => {
    this.clickedAction(route);
    this.props.history.push(route);
  };

  filled = (route: string) => {
    const { clicked } = this.state;
    if (clicked === route || route === this.props.location.pathname) {
      return '#ff6300';
    } else {
      return undefined;
    }
  };

  mapIcons = (list: any) => {
    return this.iconList().map((element: any) => (
      <Svg
        Icon={element.icon}
        name={<FormattedMessage id={`content|appfooter|${element.name}`} />}
        handleClick={() => this.pushToPage(element.route)}
        fill={this.filled(element.route)}
        key={element.route}
      />
    ));
  };

  render() {
    console.log(this.props);

    return (
      <div className="flex bg-white justify-around fixed w-100 bottom-0 pv2 ph3 ph7-ns shadow-1">
        {this.mapIcons(this.iconList)}
      </div>
    );
  }
}

const injectIntlAppFooter = injectIntl(AppFooter);
export default withRouter(injectIntlAppFooter);
