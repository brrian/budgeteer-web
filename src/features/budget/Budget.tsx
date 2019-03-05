import React, { SFC } from 'react';
import './budget.scss';

interface BudgetProps {}

const Budget: SFC<BudgetProps> = () => (
  <div className="budget">
    <div className="budget-totals">
      <span className="is-size-1">$963</span>
      <span className="budget-totals__divider">/</span>
      <span className="budget-totals__limit is-under" data-tip="1,224 (-345)">
        855
      </span>
    </div>
    <div className="budget-category" data-tip="You've underspent by 30">
      <div className="budget-category__progress">
        <span className="budget-category__delta" style={{ width: '20%' }}>
          +1
        </span>
        <span className="budget-category__marker" style={{ left: '30%' }} />
        <progress className="progress is-success" value={20} max={100} />
      </div>
      <span className="is-size-7">
        <strong>Groceries: $19 / 400</strong>
      </span>
    </div>
    <div className="budget-category" data-tip="You've underspent by 30">
      <div className="budget-category__progress">
        <span className="budget-category__delta" style={{ width: '20%' }}>
          +1
        </span>
        <span className="budget-category__marker" style={{ left: '30%' }} />
        <progress className="progress is-warning" value={20} max={100} />
      </div>
      <span className="is-size-7">
        <strong>Groceries: $19 / 400</strong>
      </span>
    </div>
    <div className="budget-category" data-tip="You've underspent by 30">
      <div className="budget-category__progress">
        <span className="budget-category__delta" style={{ width: '20%' }}>
          +1
        </span>
        <span className="budget-category__marker" style={{ left: '30%' }} />
        <progress className="progress is-danger" value={20} max={100} />
      </div>
      <span className="is-size-7">
        <strong>Groceries: $19 / 400</strong>
      </span>
    </div>
  </div>
);

export default Budget;
