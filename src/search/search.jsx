import React from 'react';
import Filters from 'filters';
import Tickets from 'tickets';

function Search() {
  return (
    <div className="search">
      <Filters />
      <Tickets />
    </div>
  );
}

export default Search;
