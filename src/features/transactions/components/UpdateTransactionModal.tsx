import React, { FormEvent, SFC } from 'react';
import { useFormData } from '../../../global/hooks/useFormData';
import { Categories, Transaction } from '../../../pages/base/store';
import { CategorySelect } from '../../categorySelect';
import { ConfirmationButton } from '../../confirmationButton';
import { Modal } from '../../modal';

interface UpdateTransactionProps {
  categories: Categories;
  closeModal: () => void;
  meta: { pos: string };
  transaction: Transaction;
  updateTransaction: (
    type: string,
    pos: string,
    transaction: Partial<Transaction>
  ) => void;
}

const UpdateTransactionModal: SFC<UpdateTransactionProps> = ({
  categories,
  closeModal,
  meta,
  transaction,
  updateTransaction,
}) => {
  const { formData, onChange } = useFormData(transaction, { categoryId: true });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    updateTransaction('transaction', meta.pos, formData);

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
            onChange={onChange.bind(true)}
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
};

export default UpdateTransactionModal;
