import * as React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  IAvailabilityFormComponent,
  IAvailabilityFormDispatchToProps,
  IAvailabilityFormMapStateToProps,
} from './AvailabilityForm.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { getUserData } from 'src/selectors/apiSelectors';
import { AvailibilityModal } from '../AvailibilityModal/AvailibilityModal';
import { IAppState } from 'src/types/state';

export class AvailabilityForm extends React.Component<
  IAvailabilityFormComponent
> {
  render() {
    const { user } = this.props;

    return (
      <div className="mt3 mh3 ph5-m ph7-l">
        <p className="f5 gray mb2">
          <FormattedMessage id="content|availabilityForm|explanation" />
        </p>

        <span className="tc">
          <AvailibilityModal
            apiThunk={this.props.apiThunk}
            intl={this.props.intl}
            user={user}
          />
        </span>
      </div>
    );
  }
}

export const mapStateToProps = (
  state: IAppState,
): IAvailabilityFormMapStateToProps => ({
  user: getUserData(state),
});

export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IAvailabilityFormDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlAvailabilityForm = injectIntl(AvailabilityForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntlAvailabilityForm);
