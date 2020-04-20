function getInitialState() {
  return {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    items: [],
    applyFilters: false,
    filters: [
      {
        type: 'color',
        title: 'Цвет',
        options: ['Красный', 'Синий', 'Зеленый', 'Желтый', 'Фиолетовый'],
        value: 'Красный'
      },
      {
        type: 'kind',
        title: 'Тип',
        options: ['Единорог', 'Пегас', 'Аликорн', 'Кирин', 'Чейнджлинг'],
        value: 'Единорог'
      },
      { type: 'is_new', title: 'Новинка', value: true },
      {
        type: 'price',
        title: 'Цена',
        options: { min: 0, max: 200, step: 1 },
        value: { min: 0, max: 200 }
      }
    ]
  };
}

const main = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.params.item;
      let newCart;

      const { cart } = state;
      if (!cart.includes(newItem)) {
        newCart = [...cart, newItem];
      }

      return {
        ...state,
        cart: newCart || cart
      };

    case 'GET_PONIES':
      return {
        ...state,
        items: action.params.items
      };

    case 'TOGGLE_FILTERS':
      return {
        ...state,
        applyFilters: !state.applyFilters
      };

    case 'CHANGE_FILTER':
      const filterType = action.params.type;
      const newFilters = state.filters.map((filter) => filter.type === filterType ? { ...filter, ...action.params } : filter);

      return {
        ...state,
        filters: newFilters
      };

    default:
      return state;
  }
};

export default main;
