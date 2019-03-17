import React, { SFC, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { Transaction } from '../../pages/base/store';
import TransactionRow from './components/TransactionRow';
import './transactions.scss';

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: SFC<TransactionsProps> = ({ transactions }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [transactions]);

  return (
    <div className="transactions">
      <div className="transactions-table">
        <div className="transactions-row is-heading">
          <div className="transactions-row__labels">
            <div className="transactions-row__date">Date</div>
            <div className="transactions-row__description">Description</div>
            <div className="transactions-row__category">Category</div>
            <div className="transactions-row__amount">Amount</div>
          </div>
        </div>
        {transactions.map((transaction, index) => (
          <TransactionRow
            key={transaction.id}
            pos={`[${index}]`}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
