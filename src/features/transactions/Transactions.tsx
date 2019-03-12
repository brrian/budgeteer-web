import React, { SFC, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Categories, Split, Transaction } from '../../pages/base/store';
import SplitTransactionModal from './components/SplitTransactionModal';
import TransactionRow from './components/TransactionRow';
import UpdateSplitModal from './components/UpdateSplitModal';
import UpdateTransactionModal from './components/UpdateTransactionModal';
import './transactions.scss';

interface TransactionsProps {
  categories: Categories;
  transactions: Transaction[];
  updateTransaction: (
    type: string,
    pos: string,
    transaction: Partial<Transaction | Split>
  ) => void;
}

const Transactions: SFC<TransactionsProps> = ({
  categories,
  transactions,
  updateTransaction,
}) => {
  const [modal, setModal] = useState<string | boolean>(false);

  const handleModalClose = () => setModal(false);

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
      {modal &&
        (() => {
          switch (modal) {
            case 'split-transaction':
              return <SplitTransactionModal closeModal={handleModalClose} />;
            case 'update-transaction':
              return <UpdateTransactionModal closeModal={handleModalClose} />;
            case 'update-split':
              return <UpdateSplitModal closeModal={handleModalClose} />;
            default:
              return null;
          }
        })()}
    </div>
  );
};

export default Transactions;
