import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ROUTES from '../../consts/routes';
import {
  MessageIcon,
  HomeIcon,
  StarIcon,
  SearchIcon,
} from '../../styles/assets';
import { IAppFooterComponent } from './AppFooter.d';
import Svg from '../../components/Svg';

export class AppFooter extends React.Component<IAppFooterComponent> {
  state = { clicked: '' };
  iconList = [
    { icon: MessageIcon, route: ROUTES.INBOX, name: 'inbox' },
    { icon: HomeIcon, route: ROUTES.DASHBOARD, name: 'dashboard' },
    { icon: StarIcon, route: ROUTES.FAVOURITE, name: 'favourite' },
    { icon: SearchIcon, route: ROUTES.SEARCH, name: 'search' },
  ];

  clickedAction = (route: string) => {
    this.setState({ clicked: route });
  };

  pushToPage = (route: string) => {
    this.clickedAction(route);
    this.props.history.push(route);
  };

  filled = (route: string) => {
    if (this.state.clicked === route) {
      return '#ff6300';
    } else {
      return undefined;
    }
  };

  mapIcons = (list: any) => {
    return list.map((element: any) => (
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
    return (
      <div className="flex justify-around absolute w-100 bottom-0 mb2">
        {this.mapIcons(this.iconList)}
      </div>
    );
  }
}

const injectIntlAppFooter = injectIntl(AppFooter);
export default withRouter(injectIntlAppFooter);
