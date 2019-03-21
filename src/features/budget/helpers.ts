import { Budget, Transaction } from '../../pages/base/store';

interface BudgetTotals {
  [key: string]: {
    total: number;
    categories?: {
      [key: string]: number;
    };
  };
}

export const getProgressColor = (delta: number) => {
  if (delta <= 0) {
    return 'green';
  } else if (delta <= 7) {
    return 'yellow';
  } else {
    return 'red';
  }
};

export const getTotals = (
  transactions: Transaction[],
  budgetCategories: Budget['categories']
) => {
  let total = 0;
  const budget: BudgetTotals = {};

  budgetCategories.forEach(category => (budget[category.id] = { total: 0 }));
  budget.other.categories = {};

  const incrementCategory = (id: number, amount: number) => {
    const isOther = budget[id] === undefined;
    const category = isOther ? budget.other : budget[id];

    category.total += amount;

    if (isOther) {
      category.categories![id] = (category.categories![id] || 0) + amount;
    }
  };

  transactions.forEach(transaction => {
    if (!transaction.disabled) {
      total += transaction.amount;
      incrementCategory(transaction.categoryId, transaction.amount);
    }

    if (transaction.splits.length) {
      transaction.splits.forEach(split => {
        if (!split.disabled) {
          total += split.amount;
          incrementCategory(split.categoryId, split.amount);
        }
      });
    }
  });

  return { budget, total };
};
