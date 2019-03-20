import React, { SFC } from 'react';
import { Counter } from '../counter';
import { getProgressColor } from './helpers';

interface BudgetItem {
  category: string;
  currentSpending: number;
  dayPercent: number;
  isCurrentMonth: boolean;
  limit: number;
  monthPercent: number;
}

const BudgetItem: SFC<BudgetItem> = ({
  category,
  currentSpending,
  dayPercent,
  isCurrentMonth,
  limit,
  monthPercent,
}) => {
  const percent = Math.round((currentSpending / limit) * 100);
  const percentDelta = percent - monthPercent;

  const target = limit * (monthPercent / 100);

  const spending = Math.round(target - currentSpending);
  const spendingDelta = Math.ceil((monthPercent - percent) / dayPercent);

  const overOrUnder = spending > 0 ? 'under' : 'over';

  return (
    <div
      className="budget-category"
      data-tip={`You've ${overOrUnder}spent by $${Math.abs(spending).toLocaleString()}`} // prettier-ignore
    >
      <div className="budget-category__progress">
        {isCurrentMonth && (
          <>
            <span
              className="budget-category__delta"
              style={{ width: `${percent > 100 ? 100 : percent}%` }}
            >
              {spendingDelta > 0 ? `+${spendingDelta}` : spendingDelta}
            </span>
            <span
              className="budget-category__marker"
              style={{ left: `${monthPercent}%` }}
            />
          </>
        )}
        <div className="budget-progress">
          <div
            className={`budget-progress__bar ${getProgressColor(percentDelta)}`}
            style={{ width: `${percent > 100 ? 100 : percent}%` }}
          />
        </div>
      </div>
      <span className="is-size-7">
        <strong>
          {category}:&nbsp;
          <Counter number={Math.round(currentSpending)} prefix="$" /> / $
          {limit.toLocaleString()}
        </strong>
      </span>
    </div>
  );
};

export default BudgetItem;
