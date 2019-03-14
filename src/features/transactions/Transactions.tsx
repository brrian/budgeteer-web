import React, { SFC, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { Categories, Split, Transaction } from '../../pages/base/store';
import TransactionRow from './components/TransactionRow';
import './transactions.scss';

interface TransactionsProps {
  categories: Categories;
  setModal: (modal: string) => void;
  transactions: Transaction[];
  updateTransaction: (
    type: string,
    pos: string,
    transaction: Partial<Transaction | Split>
  ) => void;
}

const Transactions: SFC<TransactionsProps> = ({
  categories,
  setModal,
  transactions,
  updateTransaction,
}) => {
  const getCategory = (id: number) => categories[id];

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
            getCategory={getCategory}
            key={transaction.id}
            pos={`[${index}]`}
            setModal={setModal}
            transaction={transaction}
            updateTransaction={updateTransaction}
          />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
