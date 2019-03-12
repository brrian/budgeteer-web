import React, { SFC, useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { Categories } from '../../pages/base/BasePage';
import SplitTransaction from './components/SplitTransaction';
import Transaction from './components/Transaction';
import UpdateSplit from './components/UpdateSplit';
import UpdateTransaction from './components/UpdateTransaction';
import './transactions.scss';

export interface Transaction {
  amount: number;
  categoryId: number;
  date: string;
  description: string;
  disabled: boolean;
  id: string;
  note?: string;
  splits: Split[];
}

export interface Split {
  amount: number;
  categoryId: number;
  disabled: boolean;
  id: string;
  note?: string;
}

interface TransactionsProps {
  categories: Categories;
  transactions: Transaction[];
}

const Transactions: SFC<TransactionsProps> = ({ categories, transactions }) => {
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
        {transactions.map(transaction => (
          <Transaction
            getCategory={getCategory}
            key={transaction.id}
            setModal={setModal}
            transaction={transaction}
          />
        ))}
      </div>
      {modal &&
        (() => {
          switch (modal) {
            case 'split-transaction':
              return <SplitTransaction closeModal={handleModalClose} />;
            case 'update-transaction':
              return <UpdateTransaction closeModal={handleModalClose} />;
            case 'update-split':
              return <UpdateSplit closeModal={handleModalClose} />;
            default:
              return null;
          }
        })()}
    </div>
  );
};

export default Transactions;
