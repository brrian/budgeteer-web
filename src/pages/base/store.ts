import produce from 'immer';
import { get, set, sumBy } from 'lodash';
import { useReducer } from 'react';

export interface UserData {
  budget: Budget;
  categories: Categories;
  stash: Stash;
  transactions: Transaction[];
}

export interface Budget {
  total: number;
  categories: Array<{
    id: number | string;
    limit: number;
  }>;
}

export interface Categories {
  [key: string]: string;
}

export interface Stash {
  total: number;
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
  budget?: Budget;
  categories: Categories;
  stash?: Stash;
  transactions: Transaction[];
}

export type Action =
  | IntializeAction
  | SetTransactionAction
  | SplitTransactionAction;

interface IntializeAction {
  type: 'initialize';
  payload: UserData;
}

interface SetTransactionAction {
  type: 'set-transaction';
  payload: {
    pos: string;
    transaction: Transaction | Split;
  };
}

interface SplitTransactionAction {
  type: 'split-transaction';
  payload: {
    pos: string;
    split: Split;
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
        draft = action.payload;

        if (draft.budget) {
          const categoriesTotal = sumBy(draft.budget.categories, 'limit');

          draft.budget.categories.push({
            id: 'other',
            limit: draft.budget.total - categoriesTotal,
          });
        }

        if (draft.categories) {
          draft.categories.other = 'Other';
        }

        return draft;
      }
      case 'set-transaction': {
        set(draft.transactions, action.payload.pos, action.payload.transaction);
        return;
      }
      case 'split-transaction': {
        const { pos, split } = action.payload;

        const transaction: Transaction = get(draft.transactions, pos);

        transaction.amount -= split.amount;
        transaction.splits.splice(0, 0, split);

        return;
      }
    }
  });

export const createStore = () => useReducer(reducer, initialState);
