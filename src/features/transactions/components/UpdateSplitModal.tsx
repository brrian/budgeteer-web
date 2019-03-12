import React, { SFC } from 'react';
import { ConfirmationButton } from '../../confirmationButton';
import { Modal } from '../../modal';

interface UpdateSplit {
  closeModal: () => void;
}

const UpdateSplit: SFC<UpdateSplit> = ({ closeModal }) => (
  <Modal closeModal={closeModal}>
    <h3>Update split</h3>
    <form>
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
        <label className="label">Note</label>
        <div className="control">
          <input className="input" type="text" />
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
          <button className="button is-primary">Update</button>
        </div>
      </div>
    </form>
  </Modal>
);

export default UpdateSplit;
