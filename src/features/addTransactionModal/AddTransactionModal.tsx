import React, { FocusEvent, SFC, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'; // tslint:disable-line no-submodule-imports
import { focusInput } from '../../global/helpers';
import { AppContext } from '../app';
import { Modal } from '../modal';
import './addTransactionModal.scss';

interface AddTransactionModalProps {}

const AddTransactionModal: SFC<AddTransactionModalProps> = () => {
  const [dayPickerOpen, setDayPickerOpen] = useState(false);

  const toggleDayPicker = () => {
    setDayPickerOpen(!dayPickerOpen);
  };

  const handleDayPickerBlur = (event: FocusEvent<HTMLInputElement>) => {
    const dayPicker = document.getElementById('day-picker');
    if (dayPicker && !dayPicker.contains(event.relatedTarget as Node | null)) {
      toggleDayPicker();
    }
  };

  const handleDayClick = (date: Date) => {
    toggleDayPicker();
  };

  focusInput('input[name="date"]');

  return (
    <AppContext.Consumer>
      {({ closeModal }) => (
        <Modal closeModal={closeModal}>
          <form>
            <h3>Add transaction</h3>
            <div className="field">
              <label className="label">Date</label>
              <div className="control">
                <input
                  className="input"
                  name="date"
                  onBlur={handleDayPickerBlur}
                  onFocus={toggleDayPicker}
                  type="text"
                />
                {dayPickerOpen && (
                  <div
                    id="day-picker"
                    className="addTransactionModal-dayPicker__overlay"
                  >
                    <div className="addTransactionModal-dayPicker__calendar">
                      <DayPicker onDayClick={handleDayClick} />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select>
                    <option value="category">Category</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Amount</label>
              <div className="field has-addons">
                <div className="control">
                  <a className="button is-static">$</a>
                </div>
                <div className="control is-expanded">
                  <input className="input" type="text" />
                </div>
              </div>
              <p className="help">Prepend "+" to add tax (eg: +4.99).</p>
            </div>
            <div className="field">
              <label className="label">Note</label>
              <div className="control">
                <input className="input" type="text" />
              </div>
            </div>
            <div className="field is-grouped is-grouped-right">
              <div className="control">
                <button className="button is-primary">Save</button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </AppContext.Consumer>
  );
};

export default AddTransactionModal;
