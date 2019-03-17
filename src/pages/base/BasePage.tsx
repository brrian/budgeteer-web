import { format, subMonths } from 'date-fns';
import React, { SFC, useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import AddTransactionModal from '../../features/addTransactionModal/AddTransactionModal';
import { AppContext } from '../../features/app';
import { Client } from '../../features/app/App';
import { Budget } from '../../features/budget';
import { Transactions } from '../../features/transactions';
import './base.scss';
import { GET_USER_DATA } from './gql';
import { getDate, updateTransaction } from './helpers';
import { Categories, createStore, Transaction } from './store';

interface UserData {
  categories: Categories;
  transactions: Transaction[];
}

interface RouteParams {
  month?: string;
  year?: string;
}

interface BasePageProps extends RouteComponentProps<RouteParams> {
  client: Client;
}

const BasePage: SFC<BasePageProps> = ({ client, match: { params } }) => {
  const [modal, setModal] = useState<string | false>(false);
  const [store, dispatch] = createStore();

  const date = getDate(params.month, params.year);
  const prevMonth = subMonths(date, 1);

  useEffect(() => {
    document.title = `${format(date, 'MMM YYYY')} - Budgeteer`;

    client
      .query({ query: GET_USER_DATA, variables: { date } })
      .then(({ data }: { data: UserData }) =>
        dispatch({ type: 'initialize', payload: data })
      );
  }, [params.month, params.year]);

  const closeModal = () => setModal(false);

  const openAddTransactionModal = () => setModal('add-transaction');

  return (
    <AppContext.Provider
      value={{
        categories: store.categories,
        closeModal,
        modal,
        setModal,
        updateTransaction: updateTransaction(store, dispatch, client),
      }}
    >
      <div className="base-container section">
        <div className="container">
          <div className="base-header column is-8">
            <h2 className="base-header__date is-size-6 is-size-4-tablet">
              {format(date, 'MMMM YYYY')}
            </h2>
            <span className="is-hidden-tablet">
              <a onClick={openAddTransactionModal}>Add transaction</a>
            </span>
            <span className="is-hidden-mobile">
              <button
                className="button is-info"
                onClick={openAddTransactionModal}
              >
                Add transaction
              </button>
            </span>
          </div>
          <div className="base-layout columns">
            <div className="base-layout__transactions column is-8">
              <Transactions transactions={store.transactions} />
              <Link
                className="button is-light"
                to={format(prevMonth, '/MMM/YYYY').toLowerCase()}
              >
                Previous month
              </Link>
            </div>
            <div className="column is-3-desktop is-offset-1-desktop">
              <Budget />
            </div>
          </div>
        </div>
        {modal === 'add-transaction' && <AddTransactionModal />}
      </div>
    </AppContext.Provider>
  );
};

export default withApollo(BasePage);
