import React from 'react';

function Filter(props) {
  const renderOptionsList = (item, onChangeCallback) => {
    const { options } = item;

    return (
      <div>
        <div>{item.title}</div>
        <select
          onChange={(e) => {
            onChangeCallback({
              value: e.target.value,
              type: item.type
            });
          }}
        >
          {options.map((value, i) => (
            <option defaultChecked={item.value === value} key={i} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const renderBoolean = (item, onChangeCallback) => (
    <div>
      <div>{item.title}</div>
      <input
        type="checkbox"
        checked={item.value}
        onChange={(e) => {
          onChangeCallback({
            value: e.target.checked,
            type: item.type
          });
        }}
      />
    </div>
  );

  const renderRange = (item, onChangeCallback) => {
    const onMinRangeChange = (e, valueObj) => {
      const newValue = { ...valueObj };
      newValue.min = e.target.value;
      onChangeCallback({
        value: valueObj,
        type: item.type
      });
    };

    const onMaxRangeChange = (e, valueObj) => {
      const newValue = { ...valueObj };
      newValue.max = e.target.value;
      onChangeCallback({
        value: valueObj,
        type: item.type
      });
    };

    return (
      <div>
        <div>{item.title}</div>
        <form name="registrationForm">
          <input
            type="range"
            onChange={(e) => {
              onMinRangeChange(e, item.value);
            }}
            value={item.value.min}
            min={item.options.min}
            max={item.options.max}
          />
          <output>{item.value.min}</output>

          <input
            type="range"
            onChange={(e) => {
              onMaxRangeChange(e, item.value);
            }}
            value={item.value.max}
            min={item.options.min}
            max={item.options.max}
          />
          <output>{item.value.max}</output>
        </form>
      </div>
    );
  };

  const getFilter = (props) => {
    const { item, onChangeCallback } = props;

    switch (item.type) {
      case 'color':
      case 'kind':
        return <div>{renderOptionsList(item, onChangeCallback)}</div>;

      case 'is_new':
        return <div>{renderBoolean(item, onChangeCallback)}</div>;

      case 'price':
        return <div>{renderRange(item, onChangeCallback)}</div>;

      default:
        return <div />;
    }
  };

  return (
    <div>
      <div>{getFilter(props)}</div>
    </div>
  );
}

Filter.defaultProps = {
  item: { type: 'color', options: [] },
  onChangeCallback: Function.prototype
};

export default Filter;
