import { createContext } from 'react';
import { Categories, Split, Transaction } from '../../pages/base/store';

interface AppContext {
  addTransaction: (transaction: Transaction) => void;
  categories: Categories;
  closeModal: () => void;
  modal: string | false;
  setModal: (id: string) => void;
  splitTransaction: (pos: string, updates: Partial<Split>) => void;
  updateTransaction: (
    type: string,
    pos: string,
    updates: Partial<Transaction | Split>
  ) => void;
}

export default createContext<AppContext>({
  addTransaction() {
    throw new Error('addTransaction not defined');
  },
  categories: {},
  closeModal() {
    throw new Error('closeModal not defined');
  },
  modal: false,
  setModal() {
    throw new Error('setModal not defined');
  },
  splitTransaction() {
    throw new Error('splitTransaction not defined');
  },
  updateTransaction() {
    throw new Error('updateTransaction not defined');
  },
});
