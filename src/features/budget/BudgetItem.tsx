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
  let percent = Math.round((currentSpending / limit) * 100);
  if (isNaN(percent)) {
    percent = 0;
  } else if (limit < 0) {
    percent = -Infinity;
  }

  const percentDelta = percent - monthPercent;

  const target = limit > 0 ? limit * (monthPercent / 100) : limit;

  const spending = Math.round(target - currentSpending);
  const spendingDelta = Math.ceil((monthPercent - percent) / dayPercent);

  const overOrUnder = spending > 0 ? 'under' : 'over';

  const barWidth = `${percent > 100 || percent < 0 ? 100 : percent}%`;

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
              style={{ width: barWidth }}
            >
              {spendingDelta > 0
                ? `+${spendingDelta}`
                : spendingDelta.toString().replace('Infinity', '∞')}
            </span>
            <span
              className="budget-category__marker"
              style={{ left: `${monthPercent}%` }}
            />
          </>
        )}
        <div className="budget-progress">
          <div
            className={`budget-progress__bar ${getProgressColor(
              percent,
              percentDelta
            )}`}
            style={{ width: barWidth }}
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
