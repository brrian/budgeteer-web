import classnames from 'classnames';
import React, { SFC } from 'react';
import { Split } from '../../../pages/base/store';
import { AppContext } from '../../app';
import UpdateSplitModal from './UpdateSplitModal';

interface SplitRowProps {
  pos: string;
  split: Split;
}

const SplitRow: SFC<SplitRowProps> = ({ pos, split }) => (
  <AppContext.Consumer>
    {({ categories, modal, setModal, updateTransaction }) => {
      const handleToggleClick = () => {
        updateTransaction('split', pos, { disabled: !split.disabled });
      };

      return (
        <>
          <div className="transactions-row">
            <div className="transactions-row__actions">
              <div className="buttons has-addons are-small">
                <button
                  className="button"
                  onClick={() => setModal(`update-${split.id}`)}
                >
                  Update
                </button>
                {split.disabled ? (
                  <button className="button" onClick={handleToggleClick}>
                    Enable
                  </button>
                ) : (
                  <button className="button" onClick={handleToggleClick}>
                    Disable
                  </button>
                )}
              </div>
            </div>
            <div
              className={classnames(
                'transactions-row__labels',
                split.disabled && 'is-disabled'
              )}
            >
              <div className="transactions-row__date" />
              <div className="transactions-row__description is-split">
                {split.note && <span data-tip={split.note}>&dagger;</span>}
              </div>
              <div className="transactions-row__category">
                {categories[split.categoryId]}
              </div>
              <div className="transactions-row__amount">
                {split.amount.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </div>
            </div>
          </div>
          {modal === `update-${split.id}` && (
            <UpdateSplitModal pos={pos} split={split} />
          )}
        </>
      );
    }}
  </AppContext.Consumer>
);

export default SplitRow;
