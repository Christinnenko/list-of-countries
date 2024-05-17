import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function PaginationBar({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
}) {
  // Вычисляем общее количество страниц
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <Pagination.First
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((number) => {
        if (
          number === 1 ||
          number === currentPage ||
          number === currentPage - 1 ||
          number === currentPage + 1 ||
          number === pageNumbers.length
        ) {
          return (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
            >
              {number}
            </Pagination.Item>
          );
        } else if (number === currentPage - 2 || number === currentPage + 2) {
          return (
            <Pagination.Ellipsis
              key={number}
              onClick={() => paginate(number)}
            />
          );
        } else {
          return null;
        }
      })}
      <Pagination.Next
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      />
      <Pagination.Last
        onClick={() => paginate(pageNumbers.length)}
        disabled={currentPage === pageNumbers.length}
      />
    </Pagination>
  );
}

export default PaginationBar;
