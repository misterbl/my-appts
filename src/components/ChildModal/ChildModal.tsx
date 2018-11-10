import * as React from 'react';
import * as Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import * as uniqid from 'uniqid';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import {
  TChildModal,
  IChildModalState,
  IChildModalDispatchToProps,
} from './ChildModal.d';
import * as apiThunk from '../../actions/thunks/apiThunk';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as ReactAutocomplete from 'react-autocomplete';
import { getSchools } from 'src/actions/thunks/getSchools';
import { QUERIES } from 'src/consts';
import { Dispatch, AnyAction, bindActionCreators } from 'redux';
import Svg from '../Svg';
import {
  girlIcon,
  boyIcon,
  calendarIcon,
  schoolIcon,
  nameIcon,
} from 'src/styles/assets';

const customStyles = {
  content: {
    height: '100%',
    top: 0,
    right: 0,
    left: 0,
  },
};
export class ChildModal extends React.Component<TChildModal, IChildModalState> {
  constructor(props: TChildModal) {
    super(props);
    this.state = {
      id: this.props.child ? this.props.child.id : uniqid(),
      modalIsOpen: false,
      checked: this.props.child ? this.props.child.gender : '',
      selectedSchool: '',
      schools: [],
      dob: this.props.child ? moment.unix(this.props.child.dob) : moment(),
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
    const { firstName, information } = event;
    const { checked, selectedSchool, dob, id } = this.state;
    if (!this.props.user) {
      return;
    }
    const {
      user: { _id },
    } = this.props;

    const child = {
      id,
      name: firstName,
      gender: checked,
      dob: dob.unix(),
      school: selectedSchool,
      information,
    };

    if (this.props.updating) {
      await this.props.apiThunk.updateChild(
        QUERIES({ _id: this.props.user!._id, child }).UPDATE_CHILD,
      );
    } else {
      await this.props.apiThunk.updateUser(QUERIES({ _id, child }).ADD_CHILD);
    }
    this.setState({ modalIsOpen: false });
  };

  checked = (box: string) => {
    const {
      intl: { formatMessage },
    } = this.props;
    if (
      this.state.checked === box &&
      box === formatMessage({ id: 'content|childrenform|boy' })
    ) {
      return 'dark-green';
    } else if (
      this.state.checked === box &&
      box === formatMessage({ id: 'content|childrenform|girl' })
    ) {
      return 'dark-green';
    }
    return 'white';
  };

  findSchools = async (e: any) => {
    e.persist();
    if (e.target.value) {
      window.setTimeout(async () => {
        const tempSchoolList: any = [];
        const data = await getSchools(e.target.value);
        const schoolsFound = data.data.records;
        await schoolsFound.map((school: any) =>
          tempSchoolList.push({
            id: school.recordid,
            label: `${school.fields.appellation_officielle} ${
              school.fields.code_postal_uai
            } ${school.fields.libelle_commune} ${
              school.fields.libelle_departement
            }`,
          }),
        );
        this.setState({ schools: tempSchoolList });
      }, 500);
    }
  };

  handleChange = (date: moment.Moment) => {
    this.setState({
      dob: date,
    });
  };

  render() {
    const {
      intl: { formatMessage },
      child,
    } = this.props;

    return (
      <div>
        <button
          className={`${
            !child
              ? 'w-100 bn fixed left-0 bottom-0 green-bg pv3 white'
              : 'bg-transparent mt2 fw7 ph3 ttu di pv3 bn shadow-5'
          }`}
          onClick={this.openModal}
        >
          {child ? (
            <Svg
              fill="#777777"
              width="40pt"
              height="40pt"
              Icon={child.gender === 'girl' ? girlIcon : boyIcon}
            />
          ) : (
            <FormattedMessage id="content|childfield|addAChild" />
          )}
        </button>
        <Modal
          className="green-bg"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="ml2 mt2 f3 white bn bg-transparent"
            onClick={this.closeModal}
          >
            x
          </button>
          <Formik
            initialValues={{
              firstName: child ? child.name : '',
              boy: child && child.gender === 'boy' ? 'on' : 'off',
              girl: child && child.gender === 'girl' ? 'on' : 'off',
              school: child ? child.school : '',
              information: child ? child.information : '',
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="placeholder-white white mh4 ttc flex flex-column mt3">
                <button
                  className="ttu absolute white top-1 right-1 bn bg-transparent"
                  type="submit"
                >
                  <FormattedMessage id="general|button|ok" />
                </button>
                <div className="flex ml3">
                  <Svg
                    width="25pt"
                    height="25pt"
                    fill="white"
                    Icon={nameIcon}
                  />
                  <input
                    className="white-text w-40 mb0 ml3"
                    value={values.firstName}
                    name="firstName"
                    onChange={event => {
                      setFieldValue('firstName', event.target.value);
                    }}
                    placeholder={formatMessage({
                      id: 'general|placeholder|firstName',
                    })}
                  />
                </div>
                <div className="mt4 flex ml3">
                  <div className={`${this.checked('boy')}`}>
                    <label>
                      <input
                        className="dn"
                        type="checkbox"
                        checked={values.boy}
                        name="boy"
                        onChange={event => {
                          setFieldValue('boy', event.target.value);
                          setFieldValue('girl', 'off');
                          this.setState({ checked: 'boy' });
                        }}
                      />
                      <Svg
                        width="25pt"
                        height="25pt"
                        fill={`${this.checked('boy')}`}
                        Icon={boyIcon}
                      />
                    </label>
                  </div>
                  <FormattedMessage id="general|or">
                    {text => <span className="white lh-copy ml5">{text}</span>}
                  </FormattedMessage>
                  <div className={`${this.checked('girl')} ml5`}>
                    <label>
                      <input
                        className="dn"
                        type="checkbox"
                        checked={values.girl}
                        name="girl"
                        onChange={event => {
                          setFieldValue('girl', event.target.value);
                          setFieldValue('boy', 'off');
                          this.setState({ checked: 'girl' });
                        }}
                      />
                      <Svg
                        width="25pt"
                        height="25pt"
                        fill={`${this.checked('girl')}`}
                        Icon={girlIcon}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex mt4 ">
                  <Svg
                    className="ml3"
                    width="25pt"
                    height="25pt"
                    fill="white"
                    Icon={calendarIcon}
                  />
                  <FormattedMessage id="general|placeholder|dob">
                    {text => <span className="white ml3">{text}:</span>}
                  </FormattedMessage>
                  <DatePicker
                    selected={this.state.dob}
                    onChange={this.handleChange}
                    dateFormat="DD/MM/YYYY"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="w-100 white-text bn lh-copy ml3 mb0"
                    popperModifiers={{
                      flip: {
                        behavior: ['bottom'], // don't allow it to flip to be above
                      },
                    }}
                  />
                </div>
                <span className="white-input flex mt4  form-green">
                  <Svg
                    className="ml3"
                    width="25pt"
                    height="25pt"
                    fill="white"
                    Icon={schoolIcon}
                  />
                  <ReactAutocomplete
                    wrapperStyle={{
                      width: '100%',
                      display: 'block',
                      marginLeft: '1rem',
                    }}
                    inputProps={{
                      defaultValue: child ? child.school : '',
                      placeholder: formatMessage({
                        id: 'general|placeholder|school',
                      }),
                      className: 'w-100',
                    }}
                    items={this.state.schools}
                    shouldItemRender={(item, value) =>
                      item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    getItemValue={item => item.label}
                    renderItem={(item, highlighted) => (
                      <span
                        className="f7"
                        key={item.id}
                        style={{
                          backgroundColor: 'white',
                          color: '#014404',
                        }}
                      >
                        {item.label}
                      </span>
                    )}
                    value={this.state.selectedSchool}
                    onChange={e => {
                      this.findSchools(e),
                        this.setState({ selectedSchool: e.target.value });
                    }}
                    onSelect={selectedSchool =>
                      this.setState({ selectedSchool })
                    }
                  />
                </span>
                <textarea
                  className="mt4 ml3 pa1 h4 bg-transparent b--white"
                  value={values.information}
                  name="information"
                  onChange={event => {
                    setFieldValue('information', event.target.value);
                  }}
                  placeholder={formatMessage({
                    id: 'content|childrenform|information',
                  })}
                />
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}
export const mapDispatchToProps = (
  dispatch: Dispatch<AnyAction>,
): IChildModalDispatchToProps => ({
  apiThunk: bindActionCreators(apiThunk, dispatch),
});

const injectIntlChildModal = injectIntl(ChildModal);
export default connect(
  null,
  mapDispatchToProps,
)(injectIntlChildModal);
