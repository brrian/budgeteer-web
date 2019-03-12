import { gql } from 'apollo-boost';
import { format, subMonths } from 'date-fns';
import React, { SFC, useEffect, useState } from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import AddTransactionModal from '../../features/addTransactionModal/AddTransactionModal';
import { Budget } from '../../features/budget';
import { Transactions } from '../../features/transactions';
import './base.scss';
import { getDate } from './helpers';

export interface Categories {
  [key: number]: string;
}

interface RouteParams {
  month?: string;
  year?: string;
}

interface BasePageProps extends RouteComponentProps<RouteParams> {}

const BasePage: SFC<BasePageProps> = ({ match: { params } }) => {
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  const openAddTransactionModal = () => {
    setAddTransactionModalOpen(true);
  };

  const closeAddTransactionModal = () => {
    setAddTransactionModalOpen(false);
  };

  const date = getDate(params.month, params.year);
  const prevMonth = subMonths(date, 1);

  useEffect(() => {
    document.title = `${format(date, 'MMM YYYY')} - Budgeteer`;
  }, [params.month, params.year]);

  return (
    <Query query={GET_USER_DATA} variables={{ date: format(date, 'YYYY-MM') }}>
      {({ loading, data }) => {
        console.log('TCL: data', data);
        return (
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
                  <Transactions
                    categories={data.categories}
                    transactions={data.transactions || []}
                  />
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
            {addTransactionModalOpen && (
              <AddTransactionModal closeModal={closeAddTransactionModal} />
            )}
          </div>
        );
      }}
    </Query>
  );
};

const GET_USER_DATA = gql`
  query UserData($date: String!) {
    categories
    transactions(date: $date) {
      amount
      categoryId
      date
      description
      disabled
      id
      note
      splits {
        amount
        categoryId
        disabled
        id
        note
      }
    }
  }
`;

export default BasePage;
