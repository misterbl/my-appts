import * as React from 'react';
import * as Modal from 'react-modal';
import { injectIntl, FormattedMessage } from 'react-intl';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { TChildModal, IChildModalState } from './ChildModal.d';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as ReactAutocomplete from 'react-autocomplete';
import { getSchools } from 'src/actions/thunks/getSchools';

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
      modalIsOpen: false,
      checked: '',
      selectedSchool: '',
      schools: [],
      dob: moment(),
    };

    Modal.setAppElement('body');
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onSubmit = (event: any) => {
    console.log(event);

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
      return 'facebook-button white';
    } else if (
      this.state.checked === box &&
      box === formatMessage({ id: 'content|childrenform|girl' })
    ) {
      return 'pink-button';
    }
    return 'loginNext';
  };

  findSchools = async (e: any) => {
    e.persist();
    console.log('event', e);
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
            }\n`,
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
    console.log(this);
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div>
        <button
          className="loginNext fw7 ph3 mt4 ml4 mt6 ttu di pv3 bn shadow-5"
          onClick={this.openModal}
        >
          <FormattedMessage id="content|childfield|addAChild" />
        </button>
        <Modal
          className="green-bg"
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button className="ml3 mt3 f3" onClick={this.closeModal}>
            x
          </button>
          <Formik
            initialValues={{
              firstName: '',
              boy: 'off',
              girl: 'off',
              school: '',
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className=" profile-form mh4 flex flex-column mt4 white-input">
                <input
                  value={values.firstName}
                  name="firstName"
                  onChange={event => {
                    setFieldValue('firstName', event.target.value);
                  }}
                  placeholder={formatMessage({
                    id: 'general|placeholder|firstName',
                  })}
                />
                <div className="mt5 flex justify-between">
                  <div
                    className={`fw7 ph3 ttu di pv3 bn shadow-5 tc w-40 ${this.checked(
                      'boy',
                    )}`}
                  >
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
                      <FormattedMessage id="content|childrenform|boy" />
                    </label>
                  </div>
                  <div
                    className={`fw7 ph3 ttu di pv3 bn shadow-5 tc w-40 ${this.checked(
                      'girl',
                    )}`}
                  >
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
                      <FormattedMessage id="content|childrenform|girl" />
                    </label>
                  </div>
                </div>
                <FormattedMessage id="general|placeholder|dob">
                  {text => <p className="mt5 mb2 white">{text}:</p>}
                </FormattedMessage>
                <DatePicker
                  selected={this.state.dob}
                  onChange={this.handleChange}
                  dateFormat="DD/MM/YYYY"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className="w-100 white-text"
                />
                <span className="white-input mt5 form-green">
                  <ReactAutocomplete
                    wrapperStyle={{ width: '100%', display: 'block' }}
                    inputProps={{
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
                          backgroundColor: 'transparent',
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
                <button
                  className="loginNext fw7 ph3 mt6 ttu di pv3 bn shadow-5"
                  type="submit"
                >
                  <FormattedMessage id="general|button|save" />
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    );
  }
}

const injectIntlChildModal = injectIntl(ChildModal);
export default connect(null)(injectIntlChildModal);
