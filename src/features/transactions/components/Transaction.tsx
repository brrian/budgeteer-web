import classnames from 'classnames';
import { format, parse } from 'date-fns';
import React, { SFC } from 'react';
import { Transaction as TransactionItem } from '../Transactions';
import Split from './Split';

interface TransactionProps {
  getCategory: (id: number) => string;
  setModal: (modal: string) => void;
  transaction: TransactionItem;
}

const Transaction: SFC<TransactionProps> = ({
  getCategory,
  setModal,
  transaction,
}) => {
  const date = parse(transaction.date);

  return (
    <>
      <div className="transactions-row">
        <div className="transactions-row__actions">
          <div className="buttons are-small has-addons">
            <button
              className="button"
              onClick={() => setModal('split-transaction')}
            >
              Split
            </button>
            <button
              className="button"
              onClick={() => setModal('update-transaction')}
            >
              Update
            </button>
            {transaction.disabled ? (
              <button className="button">Enable</button>
            ) : (
              <button className="button">Disable</button>
            )}
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
      {transaction.splits.map(split => (
        <Split
          getCategory={getCategory}
          key={split.id}
          setModal={setModal}
          split={split}
        />
      ))}
    </>
  );
};

export default Transaction;
