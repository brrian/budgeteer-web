import classnames from 'classnames';
import { format, parse } from 'date-fns';
import React, { SFC } from 'react';
import { Modal } from '../../../pages/base/BasePage';
import { Split, Transaction } from '../../../pages/base/store';
import SplitRow from './SplitRow';

interface TransactionRowProps {
  getCategory: (id: number) => string;
  pos: string;
  setModal: (modal: Modal) => void;
  transaction: Transaction;
  updateTransaction: (
    type: string,
    pos: string,
    transaction: Partial<Transaction | Split>
  ) => void;
}

const TransactionRow: SFC<TransactionRowProps> = ({
  getCategory,
  pos,
  setModal,
  transaction,
  updateTransaction,
}) => {
  const date = parse(transaction.date);

  const handleToggleClick = () => {
    updateTransaction('transaction', pos, { disabled: !transaction.disabled });
  };

  const handleModalOpen = (id: string) =>
    setModal({
      id,
      data: transaction,
      meta: { pos },
    });

  return (
    <>
      <div className="transactions-row">
        <div className="transactions-row__actions">
          <div className="buttons are-small has-addons">
            <button
              className="button"
              onClick={() => handleModalOpen('split-transaction')}
            >
              Split
            </button>
            <button
              className="button"
              onClick={() => handleModalOpen('update-transaction')}
            >
              Update
            </button>
            <button className="button" onClick={handleToggleClick}>
              {transaction.disabled ? 'Enable' : 'Disable'}
            </button>
          </div>
        </div>
        <div
          className={classnames(
            'transactions-row__labels',
            transaction.disabled && 'is-disabled'
          )}
        >
          <div className="transactions-row__date">
            <span className="is-hidden-tablet">{format(date, 'M/D')}</span>
            <span className="is-hidden-mobile">{format(date, 'MMM D')}</span>
          </div>
          <div className="transactions-row__description">
            {transaction.description}
            {transaction.note && (
              <span data-tip={transaction.note}>&dagger;</span>
            )}
          </div>
          <div className="transactions-row__category">
            {getCategory(transaction.categoryId)}
          </div>
          <div className="transactions-row__amount">
            {transaction.amount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </div>
        </div>
      </div>
      {transaction.splits.map((split, index) => (
        <SplitRow
          getCategory={getCategory}
          key={split.id}
          pos={`${pos}.splits[${index}]`}
          setModal={setModal}
          split={split}
          updateTransaction={updateTransaction}
        />
      ))}
    </>
  );
};

export default TransactionRow;
