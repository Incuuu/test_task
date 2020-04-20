import React from 'react';
import Filter from './filter';

function Filters(props) {
  const { list, onChangeCallback } = props;

  return (
    <div>
      <div>
        {list.map((item, i) => (
          <div key={i}>
            <Filter item={item} onChangeCallback={onChangeCallback} />
          </div>
        ))}
      </div>
    </div>
  );
}

Filters.defaultProps = {
  list: [],
  onChangeCallback: Function.prototype
};

export default Filters;
