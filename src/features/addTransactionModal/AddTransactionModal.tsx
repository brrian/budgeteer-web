import classnames from 'classnames';
import { format } from 'date-fns';
import React, { FocusEvent, FormEvent, SFC, useState } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css'; // tslint:disable-line no-submodule-imports
import { focusInput, validateData } from '../../global/helpers';
import { useFormData } from '../../global/hooks';
import { Transaction } from '../../pages/base/store';
import { AppContext } from '../app';
import { CategorySelect } from '../categorySelect';
import { Modal } from '../modal';
import './addTransactionModal.scss';

interface AddTransactionModalProps {}

const AddTransactionModal: SFC<AddTransactionModalProps> = () => {
  const [dayPickerOpen, setDayPickerOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { formData, onChange, updateFormData } = useFormData({
    date: format(new Date(), 'YYYY-MM-DD'),
  } as Pick<Transaction, 'amount' | 'categoryId' | 'date' | 'description'>);

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
    const formattedDate = format(date, 'YYYY-MM-DD');

    updateFormData('date', formattedDate);

    toggleDayPicker();
  };

  focusInput('input[name="date"]');

  return (
    <AppContext.Consumer>
      {({ addTransaction, categories, closeModal }) => {
        const handleFormSubmit = (event: FormEvent) => {
          event.preventDefault();

          setFormErrors({});

          const { errors, hasErrors } = validateData(formData, {
            amount: 'required|numeric',
            categoryId: { rules: 'required', label: 'category' },
            date: 'required',
            description: 'required',
          });

          if (hasErrors) {
            return setFormErrors(errors);
          }

          addTransaction({
            ...formData,
            disabled: false,
            id: new Date().getTime().toString(),
            splits: [],
          });

          closeModal();
        };

        return (
          <Modal closeModal={closeModal}>
            <form onSubmit={handleFormSubmit}>
              <h3>Add transaction</h3>
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    className={classnames(
                      'input',
                      formErrors.date && 'is-danger'
                    )}
                    name="date"
                    onBlur={handleDayPickerBlur}
                    onFocus={toggleDayPicker}
                    readOnly={true}
                    type="text"
                    value={formData.date}
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
                  {formErrors.date && (
                    <p className="help is-danger">{formErrors.date}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className={classnames(
                      'input',
                      formErrors.description && 'is-danger'
                    )}
                    name="description"
                    onChange={onChange}
                    type="text"
                  />
                  {formErrors.description && (
                    <p className="help is-danger">{formErrors.description}</p>
                  )}
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <CategorySelect categories={categories} onChange={onChange} />
                {formErrors.categoryId && (
                  <p className="help is-danger">{formErrors.categoryId}</p>
                )}
              </div>
              <div className="field">
                <label className="label">Amount</label>
                <div className="control">
                  <input
                    className={classnames(
                      'input',
                      formErrors.amount && 'is-danger'
                    )}
                    data-type="amount"
                    name="amount"
                    onChange={onChange}
                    type="text"
                  />
                  {formErrors.amount && (
                    <p className="help is-danger">{formErrors.amount}</p>
                  )}
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
        );
      }}
    </AppContext.Consumer>
  );
};

export default AddTransactionModal;
