import * as React from 'react';
import * as Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TAboutYouModal,
  IAboutYouModalState,
  // IAboutYouModalDispatchToProps,
} from './AboutYouModal.d';
// import * as apiThunk from '../../actions/thunks/apiThunk';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
// import { QUERIES } from 'src/consts';
// import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import Svg from '../Svg';
import { drivingLicenseIcon, carIcon, noSmokingIcon } from 'src/styles/assets';
import { QUERIES } from 'src/consts';

const customStyles = {
  content: {
    height: '100%',
    top: 0,
    right: 0,
    left: 0,
  },
};
export class AboutYouModal extends React.Component<
  TAboutYouModal,
  IAboutYouModalState
> {
  constructor(props: TAboutYouModal) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };

    Modal.setAppElement('body');
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onSubmit = async (event: any) => {
    const { drivingLicense, car, nonSmoker } = event;
    if (this.props.user) {
      const { _id } = this.props.user;
      this.props.updateUser(
        QUERIES({
          _id,
          drivingLicense,
          car,
          nonSmoker,
        }).UPDATE_ABOUT_YOU,
      );
    }
    this.setState({ modalIsOpen: false }); //
  };

  render() {
    const {
      intl: { formatMessage },
      user,
    } = this.props;

    return (
      <div>
        <button
          className="pa0 w-100 tl  bt-0 bl-0 br-0 bt-0 bg-transparent b--moon-gray mh3 mt4"
          onClick={this.openModal}
        >
          About you
        </button>
        <Modal
          className="green-bg"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className="ml2 mt2 f3 white" onClick={this.closeModal}>
            x
          </button>
          <Formik
            initialValues={{
              drivingLicense: (user && user.drivingLicense) || false,
              car: (user && user.car) || false,
              nonSmoker: (user && user.nonSmoker) || false,
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="placeholder-white white mh4 ttc flex flex-column mt3">
                <button
                  className="ttu absolute white top-1 right-1"
                  type="submit"
                >
                  <FormattedMessage id="general|button|ok" />
                </button>

                <label
                  className={`flex ml3 mt4 ${
                    values.drivingLicense ? 'dark-green' : 'white'
                  }`}
                >
                  <Svg
                    width="25pt"
                    height="25pt"
                    fill={`${values.drivingLicense ? '#137752' : 'white'}`}
                    Icon={drivingLicenseIcon}
                  />

                  <input
                    className="dn"
                    checked={values.drivingLicense}
                    type="checkbox"
                    name="drivingLicense"
                    onChange={event => {
                      setFieldValue('drivingLicense', !values.drivingLicense);
                      // this.setState({
                      //   drivingLicense: !this.state.drivingLicense,
                      // });
                    }}
                    placeholder={formatMessage({
                      id: 'general|placeholder|firstName',
                    })}
                  />
                  <span className="ml3 lh-copy">Driving license?</span>
                </label>
                <label
                  className={`flex ml3 mt4 ${
                    values.car ? 'dark-green' : 'white'
                  }`}
                >
                  <Svg
                    width="25pt"
                    height="25pt"
                    fill={`${values.car ? '#137752' : 'white'}`}
                    Icon={carIcon}
                  />
                  <input
                    className="dn"
                    checked={values.car}
                    type="checkbox"
                    name="car"
                    onChange={event => {
                      setFieldValue('car', !values.car);
                      // this.setState({ car: !this.state.car });
                    }}
                    placeholder={formatMessage({
                      id: 'general|placeholder|firstName',
                    })}
                  />
                  <span className="ml3 lh-copy">Car?</span>
                </label>
                <div>
                  <label
                    className={`flex ml3 mt4 ${
                      values.nonSmoker ? 'dark-green' : 'white'
                    }`}
                  >
                    <Svg
                      width="25pt"
                      height="25pt"
                      fill={`${values.nonSmoker ? '#137752' : 'white'}`}
                      Icon={noSmokingIcon}
                    />
                    <input
                      className="dn"
                      checked={values.nonSmoker}
                      type="checkbox"
                      name="nonSmoker"
                      onChange={event => {
                        setFieldValue('nonSmoker', !values.nonSmoker);
                        // this.setState({ nonSmoker: !this.state.nonSmoker });
                      }}
                      placeholder={formatMessage({
                        id: 'general|placeholder|firstName',
                      })}
                    />
                    <span className="ml3 lh-copy">Smoking?</span>
                  </label>
                  <div>Accept money or just child care</div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
// export const mapDispatchToProps = (
//   dispatch: Dispatch<AnyAction>,
// ): IAboutYouModalDispatchToProps => ({
//   apiThunk: bindActionCreators(apiThunk, dispatch),
// });

const injectIntlAboutYouModal = injectIntl(AboutYouModal);
export default connect(null)(injectIntlAboutYouModal);
