import React, { ChangeEvent, SFC } from 'react';
import { Categories } from '../../pages/base/store';

interface CategorySelect {
  categories: Categories;
  defaultValue: string;
  name?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect: SFC<CategorySelect> = ({
  categories,
  defaultValue,
  name = 'categoryId',
  onChange,
}) => (
  <div className="control is-expanded">
    <div className="select is-fullwidth">
      <select
        data-type="number"
        defaultValue={defaultValue}
        name={name}
        onChange={onChange}
      >
        {Object.keys(categories).map(categoryId => (
          <option
            dangerouslySetInnerHTML={{ __html: categories[categoryId] }}
            key={categoryId}
            value={categoryId}
          />
        ))}
      </select>
    </div>
  </div>
);

export default CategorySelect;
