import classnames from 'classnames';
import React, { SFC } from 'react';
import { Split, Transaction } from '../../../pages/base/store';

interface SplitRowProps {
  getCategory: (id: number) => string;
  pos: string;
  setModal: (modal: string) => void;
  split: Split;
  updateTransaction: (
    type: string,
    pos: string,
    transaction: Partial<Transaction | Split>
  ) => void;
}

const SplitRow: SFC<SplitRowProps> = ({
  getCategory,
  pos,
  setModal,
  split,
  updateTransaction,
}) => {
  const handleToggleClick = () => {
    updateTransaction('split', pos, { disabled: !split.disabled });
  };

  return (
    <div className="transactions-row">
      <div className="transactions-row__actions">
        <div className="buttons has-addons are-small">
          <button className="button" onClick={() => setModal('update-split')}>
            Update
          </button>
          {split.disabled ? (
            <button className="button" onClick={handleToggleClick}>
              Enable
            </button>
          ) : (
            <button className="button" onClick={handleToggleClick}>
              Disable
            </button>
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

export default SplitRow;
