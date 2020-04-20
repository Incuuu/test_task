import React from 'react';

function SelectionList(props) {
  const { items, onSelectCallback } = props;
  return (
    <div>
      {items.map((item) => (
        <div onClick={() => onSelectCallback(item)} key={item.id}>
          <p>
            {item.name} {item.kind} {item.price} {item.is_new} {item.color}
          </p>
        </div>
      ))}
    </div>
  );
}

SelectionList.defaultProps = {
  items: [{ name: '' }],
  onSelectCallback: Function.prototype
};

// We can add prop types here, and in other components

export default SelectionList;
