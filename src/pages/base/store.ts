import produce from 'immer';
import { set } from 'lodash';
import { useReducer } from 'react';

export interface Categories {
  [key: string]: string;
}

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

export interface State {
  categories: Categories;
  transactions: Transaction[];
}

export type Action = IntializeAction | SetTransactionAction;

interface IntializeAction {
  type: 'initialize';
  payload: {
    categories: Categories;
    transactions: Transaction[];
  };
}

interface SetTransactionAction {
  type: 'set-transaction';
  payload: {
    pos: string;
    transaction: Transaction | Split;
  };
}

const initialState = {
  categories: {},
  transactions: [],
};

const reducer = (state: State, action: Action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'initialize': {
        draft.categories = action.payload.categories;
        draft.transactions = action.payload.transactions;
        return;
      }
      case 'set-transaction': {
        set(draft.transactions, action.payload.pos, action.payload.transaction);
        return;
      }
    }
  });

export const createStore = () => useReducer(reducer, initialState);
