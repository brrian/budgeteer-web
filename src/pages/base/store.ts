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

interface State {
  categories: Categories;
  transactions: Transaction[];
}

type Action = IntializeAction | UpdateTransactionAction;

interface IntializeAction {
  type: 'initialize';
  payload: {
    categories: Categories;
    transactions: Transaction[];
  };
}

interface UpdateTransactionAction {
  type: 'update-transaction';
  payload: {
    pos: string;
    transaction: Partial<Transaction | Split>;
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
      case 'update-transaction': {
        set(draft.transactions, action.payload.pos, action.payload.transaction);
        return;
      }
    }
  });

export const createStore = () => useReducer(reducer, initialState);
