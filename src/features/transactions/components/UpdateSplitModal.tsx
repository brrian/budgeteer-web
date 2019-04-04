import React, { SFC, FormEvent } from 'react';
import { useFormData } from '../../../global/hooks';
import { Split } from '../../../pages/base/store';
import { AppContext } from '../../app';
import { CategorySelect } from '../../categorySelect';
import { ConfirmationButton } from '../../confirmationButton';
import { Modal } from '../../modal';

interface UpdateSplit {
  pos: string;
  split: Split;
}

const UpdateSplitModal: SFC<UpdateSplit> = ({ pos, split }) => {
  const { formData, onChange } = useFormData(split);

  return (
    <AppContext.Consumer>
      {({ categories, closeModal, deleteTransaction, updateTransaction }) => {
        const handleFormSubmit = (event: FormEvent) => {
          event.preventDefault();

          updateTransaction('split', pos, formData);

          closeModal();
        };

        const handleSplitDelete = () => {
          deleteTransaction('split', pos, split.id);

          closeModal();
        };

        return (
          <Modal closeModal={closeModal}>
            <h3>Update split</h3>
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
                <label className="label">Note</label>
                <div className="control">
                  <input className="input" type="text" />
                </div>
              </div>
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <ConfirmationButton
                    classNames="is-text has-text-danger"
                    handleClick={handleSplitDelete}
                    label="Delete"
                  />
                </div>
                <div className="control">
                  <button className="button is-primary">Update</button>
                </div>
              </div>
            </form>
          </Modal>
        );
      }}
    </AppContext.Consumer>
  );
};

export default UpdateSplitModal;
