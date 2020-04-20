import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginator from '../components/paginator';
import Filters from '../components/filters';
import Cart from '../components/cart';
import SelectionList from '../components/selectionList';
import {
  addToCart, getPonies, changeFilter, toggleFilters
} from '../actions';
import * as constants from '../constants';
import api from '../api';

function ShopView() {
  const {
    items, cart, filters, applyFilters
  } = useSelector(
    (state) => state.main
  );

  const [visibleItems, setVisibleItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOnline, setOnlineStatus] = useState(true);
  const itemsPerPage = constants.ITEMS_PER_PAGE;
  const dispatch = useDispatch();

  function getVisibleItems(items, itemsPerPage, currentPage = 1) {
    const firstItemIndex = itemsPerPage * (currentPage - 1);
    const lastItemIndex = firstItemIndex + itemsPerPage;

    return items.slice(firstItemIndex, lastItemIndex);
  }

  function getFilteredItems(items, filters = [], applyFilters = false) {
    if (!applyFilters) return items;

    return filters.reduce((allItems, filter) => {
      switch (filter.type) {
        case 'color':
          return allItems.filter((item) => item.color === filter.value);
        case 'kind':
          return allItems.filter((item) => item.kind === filter.value);
        case 'is_new':
          return allItems.filter((item) => item.is_new === filter.value);
        case 'price':
          return allItems.filter(
            (item) => item.price >= filter.value.min && item.price <= filter.value.max
          );
        default:
          return allItems;
      }
    }, items);
  }

  useEffect(() => {
    api.getPonies().then((data) => {
      dispatch(getPonies({ items: data }));
    });

    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });

    window.addEventListener('online', () => {
      setOnlineStatus(true);
    });
  }, []);

  useEffect(() => {
    setFilteredItems(getFilteredItems(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const visibleItems = getVisibleItems(filteredItems, itemsPerPage);
    setVisibleItems(visibleItems);
  }, [filteredItems, items]);

  const handlePageChange = useCallback(
    (page) => {
      const visibleItems = getVisibleItems(filteredItems, itemsPerPage, page);
      setVisibleItems(visibleItems);
    },
    [filteredItems, items]
  );

  const handleFilterChange = useCallback((data) => {
    dispatch(changeFilter(data));
  }, []);

  const handleFindButtonClick = useCallback(
    () => {
      setFilteredItems(getFilteredItems(items, filters, applyFilters));
    },
    [items, filters, applyFilters]
  );

  const handleBuyButtonClick = useCallback(() => {
    api.buyGoods().then(() => {
      alert('Покупка успешно произведена');
    });
  }, []);

  const handleFilterButtonClick = useCallback(() => {
    dispatch(toggleFilters());
  }, []);

  return (
    <div>
      <Cart
        goods={cart}
        isOnline={isOnline}
        onBuyButtonClick={handleBuyButtonClick}
      />

      <div>
        <div>
          <button onClick={handleFilterButtonClick}>Фильтры</button>
        </div>
        <div style={{ display: applyFilters ? 'block' : 'none' }}>
          <h3>Фильтры</h3>
          <Filters list={filters} onChangeCallback={handleFilterChange} />
        </div>
      </div>

      <div>
        <button onClick={handleFindButtonClick}>Найти</button>
      </div>

      <div>
        <h3>Список пони</h3>
        <SelectionList
          items={visibleItems}
          onSelectCallback={(item) => {
            dispatch(addToCart({ item }));
          }}
        />
      </div>

      <Paginator
        itemsPerPage={itemsPerPage}
        itemsLength={filteredItems.length}
        onChangePageCallback={handlePageChange}
      />
    </div>
  );
}

export default ShopView;
