import classnames from 'classnames';
import { format, parse } from 'date-fns';
import React, { SFC } from 'react';
import { Transaction } from '../../../pages/base/store';
import { AppContext } from '../../app';
import SplitRow from './SplitRow';
import SplitTransactionModal from './SplitTransactionModal';
import UpdateTransactionModal from './UpdateTransactionModal';

interface TransactionRowProps {
  pos: string;
  transaction: Transaction;
}

const TransactionRow: SFC<TransactionRowProps> = ({ pos, transaction }) => (
  <AppContext.Consumer>
    {({ categories, modal, setModal, updateTransaction }) => {
      const date = parse(transaction.date);

      const handleToggleClick = () => {
        updateTransaction('transaction', pos, {
          disabled: !transaction.disabled,
        });
      };

      return (
        <>
          <div className="transactions-row">
            <div className="transactions-row__actions">
              <div className="buttons are-small has-addons">
                <button
                  className="button"
                  onClick={() => setModal(`split-${transaction.id}`)}
                >
                  Split
                </button>
                <button
                  className="button"
                  onClick={() => setModal(`update-${transaction.id}`)}
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
                <span className="is-hidden-mobile">
                  {format(date, 'MMM D')}
                </span>
              </div>
              <div className="transactions-row__description">
                {transaction.description}
                {transaction.note && (
                  <span data-tip={transaction.note}>&dagger;</span>
                )}
              </div>
              <div
                className="transactions-row__category"
                dangerouslySetInnerHTML={{
                  __html: categories[transaction.categoryId],
                }}
              />
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
              key={split.id}
              pos={`${pos}.splits[${index}]`}
              split={split}
            />
          ))}
          {modal === `split-${transaction.id}` && (
            <SplitTransactionModal
              categoryId={transaction.categoryId}
              pos={pos}
              transaction={transaction}
            />
          )}
          {modal === `update-${transaction.id}` && (
            <UpdateTransactionModal pos={pos} transaction={transaction} />
          )}
        </>
      );
    }}
  </AppContext.Consumer>
);

export default TransactionRow;
