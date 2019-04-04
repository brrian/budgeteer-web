import produce from 'immer';
import { get, set, sumBy, unset } from 'lodash';
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
  | AddTransactionAction
  | DeleteTransactionAction
  | IntializeAction
  | SetTransactionAction
  | SplitTransactionAction
  | UpdateSashAction;

interface AddTransactionAction {
  type: 'add-transaction';
  payload: {
    index: number;
    transaction: Transaction;
  };
}

interface DeleteTransactionAction {
  type: 'delete-transaction';
  payload: string;
}

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

interface UpdateSashAction {
  type: 'update-stash';
  payload: number;
}

const initialState = {
  categories: {},
  transactions: [],
};

const reducer = (state: State, action: Action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'add-transaction': {
        const { index, transaction } = action.payload;

        draft.transactions.splice(index, 0, transaction);

        return;
      }

      case 'delete-transaction': {
        const pos = action.payload;

        // If we are deleting a split, we need to update the parent transaction
        if (pos.indexOf('splits') !== -1) {
          const [transactionPos] = pos.split('.');

          const transaction = get(draft.transactions, transactionPos);
          const split = get(draft.transactions, pos);

          transaction.amount += split.amount;
        }

        unset(draft.transactions, action.payload);

        return;
      }

      case 'initialize': {
        draft = { ...draft, ...action.payload };

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

      case 'update-stash': {
        if (draft.stash) {
          draft.stash.total = action.payload;
        }
        return;
      }
    }
  });

export const createStore = () => useReducer(reducer, initialState);
