import React from 'react';

function Cart(props) {
  const { goods, isOnline, onBuyButtonClick } = props;

  return (
    <div>
      <h3>Корзина</h3>
      {goods.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div>
        <button disabled={!isOnline} onClick={onBuyButtonClick}>
          Купить
        </button>
        {!isOnline && <p>Отсутствует соединение с интернетом</p>}
      </div>
    </div>
  );
}

Cart.defaultProps = {
  goods: [],
  isOnline: true,
  onBuyButtonClick: Function.prototype
};

export default Cart;
