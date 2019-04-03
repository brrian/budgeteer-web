import classnames from 'classnames';
import { getDaysInMonth } from 'date-fns';
import { last } from 'lodash';
import React, { SFC } from 'react';
import {
  Budget as IBudget,
  Categories,
  Stash,
  Transaction,
} from '../../pages/base/store';
import { Counter } from '../counter';
import './budget.scss';
import BudgetItem from './BudgetItem';
import { getTotals } from './helpers';

interface BudgetProps {
  budget?: IBudget;
  categories: Categories;
  isCurrentMonth: boolean;
  stash?: Stash;
  transactions: Transaction[];
}

const Budget: SFC<BudgetProps> = ({
  budget,
  categories,
  isCurrentMonth,
  stash,
  transactions,
}) => {
  if (!budget || !stash) {
    return null;
  }

  let dayPercent: number | null = null;
  let monthPercent: number | null = null;
  let otherLimit: number | null = null;

  if (isCurrentMonth) {
    const daysInMonth = getDaysInMonth(new Date());
    const currentDay = new Date().getDate();

    dayPercent = 100 / daysInMonth;
    monthPercent = Math.round((currentDay / daysInMonth) * 100);
    otherLimit = last(budget.categories)!.limit + stash.total;
  }

  const totals = getTotals(transactions, budget.categories);

  return (
    <div className="budget">
      <div className="budget-totals">
        <span className="is-size-1">
          <Counter number={Math.round(totals.total)} prefix="$" />
        </span>
        <span className="budget-totals__divider">/</span>
        <span
          className={classnames(
            'budget-totals__limit',
            isCurrentMonth && stash.total > 0 && 'is-under',
            isCurrentMonth && stash.total < 0 && 'is-over'
          )}
          data-tip={
            isCurrentMonth
              ? `${budget.total.toLocaleString()} (${stash.total.toLocaleString()})`
              : null
          }
        >
          {isCurrentMonth ? budget.total + stash.total : budget.total}
        </span>
      </div>
      {budget.categories.map(({ id, limit: catLimit }) => {
        return (
          <BudgetItem
            category={categories[id]}
            currentSpending={totals.budget[id].total}
            dayPercent={dayPercent || 100}
            isCurrentMonth={isCurrentMonth}
            key={id}
            limit={
              otherLimit !== null && id === 'other' ? otherLimit : catLimit
            }
            monthPercent={monthPercent || 100}
          />
        );
      })}
    </div>
  );
};

export default Budget;
