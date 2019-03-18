import React, { FormEvent, SFC } from 'react';
import { useFormData } from '../../../global/hooks';
import { Transaction } from '../../../pages/base/store';
import { AppContext } from '../../app';
import { CategorySelect } from '../../categorySelect';
import { ConfirmationButton } from '../../confirmationButton';
import { Modal } from '../../modal';

interface UpdateTransactionProps {
  pos: string;
  transaction: Transaction;
}

const UpdateTransactionModal: SFC<UpdateTransactionProps> = ({
  pos,
  transaction,
}) => {
  const { formData, onChange } = useFormData(transaction);

  return (
    <AppContext.Consumer>
      {({ categories, closeModal, updateTransaction }) => {
        const handleFormSubmit = (event: FormEvent) => {
          event.preventDefault();

          updateTransaction('transaction', pos, formData);

          closeModal();
        };

        return (
          <Modal closeModal={closeModal}>
            <h3>Update transaction</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <input
                    className="input"
                    defaultValue={formData.description}
                    name="description"
                    onChange={onChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Category</label>
                <CategorySelect
                  categories={categories}
                  defaultValue={`${formData.categoryId}`}
                  onChange={onChange}
                />
              </div>
              <div className="field">
                <label className="label">Note</label>
                <div className="control">
                  <input
                    className="input"
                    defaultValue={formData.note}
                    name="note"
                    onChange={onChange}
                    type="text"
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <ConfirmationButton
                    classNames="is-text has-text-danger"
                    handleClick={() => {
                      console.log('delete');
                    }}
                    label="Delete"
                  />
                </div>
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        );
      }}
    </AppContext.Consumer>
  );
};

export default UpdateTransactionModal;
