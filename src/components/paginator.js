import React, { useState } from 'react';

function Paginator(props) {
  const { itemsPerPage, itemsLength, onChangePageCallback } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(itemsLength / itemsPerPage);
  const pagesList = [...Array(pagesCount).keys()].map((i) => ++i);

  const onChangePage = (page) => {
    setCurrentPage(page);
    onChangePageCallback(page);
  };
  return (
    pagesCount > 1 && (
      <div>
        <p>Страница {currentPage}</p>
        {pagesList.map((page) => (
          <button key={page} onClick={() => onChangePage(page)}>
            {page}
          </button>
        ))}
      </div>
    )
  );
}

Paginator.defaultProps = {
  itemsPerPage: 20,
  itemsLength: 50,
  onChangePageCallback: Function.prototype
};

// We can add prop types here, and in other components
export default Paginator;
