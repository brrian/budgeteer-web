import classnames from 'classnames';
import React, { SFC } from 'react';
import { Split as SplitItem } from '../Transactions';

interface SplitProps {
  getCategory: (id: number) => string;
  setModal: (modal: string) => void;
  split: SplitItem;
}

const Split: SFC<SplitProps> = ({ getCategory, setModal, split }) => {
  return (
    <div className="transactions-row">
      <div className="transactions-row__actions">
        <div className="buttons has-addons are-small">
          <button className="button" onClick={() => setModal('update-split')}>
            Update
          </button>
          {split.disabled ? (
            <button className="button">Enable</button>
          ) : (
            <button className="button">Disable</button>
          )}
        </div>
      </div>
      <div
        className={classnames(
          'transactions-row__labels',
          split.disabled && 'is-disabled'
        )}
      >
        <div className="transactions-row__date" />
        <div className="transactions-row__description is-split">
          {split.note && <span data-tip={split.note}>&dagger;</span>}
        </div>
        <div className="transactions-row__category">
          {getCategory(split.categoryId)}
        </div>
        <div className="transactions-row__amount">
          {split.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
      </div>
    </div>
  );
};

export default Split;
