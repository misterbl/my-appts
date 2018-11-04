import * as React from 'react';
import * as Modal from 'react-modal';
import { injectIntl } from 'react-intl';
import { TChildModal, IChildModalState } from './ChildModal.d';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';

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

  // afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   console.log('modal closed');
  // };
  checked = (box: string) => {
    if (this.state.checked === box) {
      return 'facebook-button white';
    }
    return 'loginNext';
  };

  render() {
    console.log(this);
    const {
      intl: { formatMessage },
    } = this.props;
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          className="green-bg"
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal}>close</button>
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
                      <span>Boy</span>
                    </label>
                  </div>
                  <div
                    className={`fw7 ph3 ttu di pv3 bn shadow-5 tc w-40 ${this.checked(
                      'girl',
                    )}`}
                  >
                    {' '}
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
                      <span>Girl</span>
                    </label>
                  </div>
                </div>
                <input
                  value={values.school}
                  name="school"
                  onChange={event => {
                    setFieldValue('school', event.target.value);
                  }}
                  placeholder={formatMessage({
                    id: 'general|placeholder|school',
                  })}
                />
                <button type="submit">save</button>
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
