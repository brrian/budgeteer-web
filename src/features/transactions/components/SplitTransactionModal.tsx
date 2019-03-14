import React, { SFC } from 'react';
import { Modal } from '../../modal';

interface SplitTransactionProps {
  closeModal: () => void;
}

const SplitTransactionModal: SFC<SplitTransactionProps> = ({ closeModal }) => (
  <Modal closeModal={closeModal}>
    <h3>Split transaction</h3>
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
          <button className="button is-primary">Split</button>
        </div>
      </div>
    </form>
  </Modal>
);

export default SplitTransactionModal;
