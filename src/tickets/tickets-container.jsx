import React from 'react';
import { StoreContext } from 'simple-store';
import { CurrencyCodes } from 'core/constants';
import Tickets from './tickets';

const sortByPrice = (a, b) => a.price - b.price;

function TicketsContainer() {
  return (
    <StoreContext.Consumer>
      {({ tickets, currencyCode, rates, stopsFilters, isLoading }) => {
        const props = {
          currencyCode,
          isLoading,
          tickets: tickets
            .filter(
              item => stopsFilters.all
                || (item.stops === 0 && stopsFilters.no)
                || (item.stops === 1 && stopsFilters.one)
                || (item.stops === 2 && stopsFilters.two)
                || (item.stops === 3 && stopsFilters.three)
            )
            .map((item) => {
              if (currencyCode !== CurrencyCodes.RUB) {
                return { ...item, price: Number((item.price / rates[currencyCode]).toFixed(2)) };
              }

              return item;
            })
            .sort(sortByPrice)
        };

        return <Tickets {...props} />;
      }}
    </StoreContext.Consumer>
  );
}

export default TicketsContainer;
