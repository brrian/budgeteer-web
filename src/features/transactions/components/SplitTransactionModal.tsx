import classnames from 'classnames';
import React, { FormEvent, SFC, useState } from 'react';
import { focusInput, validateData } from '../../../global/helpers';
import { useFormData } from '../../../global/hooks';
import { Transaction } from '../../../pages/base/store';
import { AppContext } from '../../app';
import { CategorySelect } from '../../categorySelect';
import { Modal } from '../../modal';

interface SplitTransactionProps {
  categoryId: number;
  pos: string;
  transaction: Transaction;
}

const SplitTransactionModal: SFC<SplitTransactionProps> = ({
  categoryId,
  pos,
  transaction,
}) => {
  const { formData, onChange } = useFormData({ categoryId });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  focusInput('select[name="categoryId"]');

  return (
    <AppContext.Consumer>
      {({ categories, closeModal, splitTransaction }) => {
        const handleFormSubmit = (event: FormEvent) => {
          event.preventDefault();

          setFormErrors({});

          const { errors, hasErrors } = validateData(formData, {
            amount: `required|numeric|max:${transaction.amount.toFixed(2)}`,
          });

          if (hasErrors) {
            return setFormErrors(errors);
          }

          splitTransaction(pos, formData);

          closeModal();
        };

        return (
          <Modal closeModal={closeModal}>
            <h3>Split transaction</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="field">
                <label className="label">Category</label>
                <CategorySelect
                  categories={categories}
                  defaultValue={`${formData.categoryId}`}
                  onChange={onChange}
                />
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
                  <input
                    className="input"
                    name="note"
                    onChange={onChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button className="button is-primary">Split</button>
                </div>
              </div>
            </form>
          </Modal>
        );
      }}
    </AppContext.Consumer>
  );
};

export default SplitTransactionModal;
