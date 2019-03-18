import { startOfMonth } from 'date-fns';
import { get } from 'lodash';
import { Dispatch } from 'react';
import { Client } from '../../features/app/App';
import { SPLIT_TRANSACTION, UPDATE_SPLIT, UPDATE_TRANSACTION } from './gql';
import { Action, Split, State, Transaction } from './store';

export const getDate = (month?: string, year?: string) => {
  const date = startOfMonth(new Date());

  if (month) {
    date.setMonth(getMonth(month));
  }

  if (year) {
    date.setFullYear(+year);
  }

  return date;
};

export const splitTransaction = (
  store: State,
  dispatch: Dispatch<Action>,
  client: Client
) => {
  return (pos: string, splitPartial: Partial<Split>) => {
    const { id } = get(store.transactions, pos);

    const split = {
      ...splitPartial,
      id: `${new Date().getTime()}`,
    } as Split;

    dispatch({ type: 'split-transaction', payload: { pos, split } });

    client
      .mutate({
        mutation: SPLIT_TRANSACTION,
        variables: {
          ...split,
          transactionId: id,
        },
      })
      .then(({ data: { splitTransaction: newSplit } }) => {
        // Once we have the saved split, update the store with the database one.
        // This ensures that it has the correct id instead of the temporary one.
        dispatch({
          type: 'set-transaction',
          payload: { pos: `${pos}.splits[0]`, transaction: newSplit },
        });
      });
  };
};

export const updateTransaction = (
  store: State,
  dispatch: Dispatch<Action>,
  client: Client
) => {
  return (type: string, pos: string, updates: Partial<Transaction | Split>) => {
    const transaction: Transaction | Split = {
      ...get(store.transactions, pos),
      ...updates,
    };

    dispatch({ type: 'set-transaction', payload: { pos, transaction } });

    if (type === 'transaction') {
      client.mutate({ mutation: UPDATE_TRANSACTION, variables: transaction });
    } else if (type === 'split') {
      client.mutate({ mutation: UPDATE_SPLIT, variables: transaction });
    }
  };
};

const getMonth = (abbr: string) => {
  switch (abbr.toLowerCase()) {
    case 'jan':
      return 0;
    case 'feb':
      return 1;
    case 'mar':
      return 2;
    case 'apr':
      return 3;
    case 'may':
      return 4;
    case 'jun':
      return 5;
    case 'jul':
      return 6;
    case 'aug':
      return 7;
    case 'sep':
    case 'sept':
      return 8;
    case 'oct':
      return 9;
    case 'nov':
      return 10;
    case 'dec':
      return 11;
    default:
      throw new Error(`Unrecognized month "${abbr}"`);
  }
};
