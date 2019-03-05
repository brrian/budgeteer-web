import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import AddTransactionModal from '../../features/addTransactionModal/AddTransactionModal';
import { Budget } from '../../features/budget';
import { Transactions } from '../../features/transactions';
import './base.scss';
import { getMonth } from './helpers';

interface RouteParams {
  month?: string;
  year?: string;
}

interface BasePageProps extends RouteComponentProps<RouteParams> {}

interface BasePageState {
  addTransactionModalOpen: boolean;
  month: string;
  year: string;
}

class BasePage extends Component<BasePageProps, BasePageState> {
  state: BasePageState = {
    addTransactionModalOpen: false,
    month: getMonth(this.props.match.params.month),
    year: this.props.match.params.year || new Date().getFullYear().toString(),
  };

  handleAddTransactionModalClose = () => {
    this.setState({ addTransactionModalOpen: false });
  };

  handleAddTransactionModalOpen = () => {
    this.setState({ addTransactionModalOpen: true });
  };

  render() {
    const { addTransactionModalOpen, month, year } = this.state;

    return (
      <div className="base-container section">
        <div className="container">
          <div className="base-header column is-8">
            <h2 className="base-header__date is-size-6 is-size-4-tablet">
              December 2019
            </h2>
            <span className="is-hidden-tablet">
              <a href="#" onClick={this.handleAddTransactionModalOpen}>
                Add transaction
              </a>
            </span>
            <span className="is-hidden-mobile">
              <button
                className="button is-info"
                onClick={this.handleAddTransactionModalOpen}
              >
                Add transaction
              </button>
            </span>
          </div>
          <div className="base-layout columns">
            <div className="base-layout__transactions column is-8">
              <Transactions date={`${year}-${month}`} />
              <button className="button is-light">Previous month</button>
            </div>
            <div className="column is-3-desktop is-offset-1-desktop">
              <Budget />
            </div>
          </div>
        </div>
        {addTransactionModalOpen && (
          <AddTransactionModal
            closeModal={this.handleAddTransactionModalClose}
          />
        )}
      </div>
    );
  }
}

export default BasePage;
