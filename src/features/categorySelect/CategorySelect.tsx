import React, { SFC } from 'react';
import { Categories } from '../../pages/base/store';

interface CategorySelect {
  categories: Categories;
}

const CategorySelect: SFC<CategorySelect> = ({ categories }) => (
  <div className="control is-expanded">
    <div className="select is-fullwidth">
      <select>
        {Object.keys(categories).map(categoryId => (
          <option
            dangerouslySetInnerHTML={{ __html: categories[categoryId] }}
            value={categoryId}
          />
        ))}
      </select>
    </div>
  </div>
);

export default CategorySelect;
