import React from 'react';
import { StoreContext } from 'simple-store';
import Filters from './filters';

function FiltersContainer() {
  return (
    <StoreContext.Consumer>
      {({ stopsFilters, changeStopsFilter, changeCurrency, currencyCode }) => {
        const props = {
          currencyCode,
          stopsFilters,
          changeCurrency,
          changeStopsFilter
        };

        return <Filters {...props} />;
      }}
    </StoreContext.Consumer>
  );
}

export default FiltersContainer;
