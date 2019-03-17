import { createContext } from 'react';
import { Categories, Split, Transaction } from '../../pages/base/store';

interface AppContext {
  categories: Categories;
  closeModal: () => void;
  modal: string | false;
  setModal: (id: string) => void;
  updateTransaction: (
    type: string,
    pos: string,
    updates: Partial<Transaction | Split>
  ) => void;
}

export default createContext<AppContext>({
  categories: {},
  closeModal() {
    throw new Error('closeModal not defined');
  },
  modal: false,
  setModal() {
    throw new Error('setModal not defined');
  },
  updateTransaction() {
    throw new Error('updateTransaction not defined');
  },
});