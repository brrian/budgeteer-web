import React, { SFC, useState } from 'react';
import SplitTransaction from './components/SplitTransaction';
import UpdateSplit from './components/UpdateSplit';
import UpdateTransaction from './components/UpdateTransaction';
import './transactions.scss';

interface TransactionsProps {
  date: string;
}

const Transactions: SFC<TransactionsProps> = () => {
  const [modal, setModal] = useState<string | boolean>(false);

  const handleModalClose = () => setModal(false);

  return (
    <div className="transactions">
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
      <div className="transactions-table">
        <div className="transactions-row is-heading">
          <div className="transactions-row__labels">
            <div className="transactions-row__date">Date</div>
            <div className="transactions-row__description">Description</div>
            <div className="transactions-row__category">Category</div>
            <div className="transactions-row__amount">Amount</div>
          </div>
        </div>
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
              <button className="button">Disable</button>
            </div>
          </div>
          <div className="transactions-row__labels">
            <div className="transactions-row__date">
              <span className="is-hidden-tablet">3/3</span>
              <span className="is-hidden-mobile">Mar 3</span>
            </div>
            <div className="transactions-row__description">
              Sq *maht Gaek Plano Tx
              <span data-tip="Lorem ipsum">&dagger;</span>
            </div>
            <div className="transactions-row__category">Other Expenses</div>
            <div className="transactions-row__amount">$44.80</div>
          </div>
        </div>
        <div className="transactions-row">
          <div className="transactions-row__actions">
            <div className="buttons has-addons are-small">
              <button
                className="button"
                onClick={() => setModal('update-split')}
              >
                Update
              </button>
              <button className="button">Disable</button>
            </div>
          </div>
          <div className="transactions-row__labels">
            <div className="transactions-row__date" />
            <div className="transactions-row__description is-split">
              <span data-tip="Lorem ipsum">&dagger;</span>
            </div>
            <div className="transactions-row__category">Other Expenses</div>
            <div className="transactions-row__amount">$44.80</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
