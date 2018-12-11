import React, { PureComponent, createContext } from 'react';
import axios from 'axios';
import locale from 'core/locale';
import { FETCH_TICKETS_URL, FETCH_RATES_URL, StopsFilters, CurrencyCodes } from 'core/constants';
import { createMessage } from 'utils';

export const StoreContext = createContext();

class SimpleStore extends PureComponent {
  state = {
    tickets: [],
    currencyCode: CurrencyCodes.RUB,
    stopsFilters: {
      [StopsFilters.ALL]: true,
      [StopsFilters.NO]: true,
      [StopsFilters.ONE]: true,
      [StopsFilters.TWO]: true,
      [StopsFilters.THREE]: true
    },
    rates: {},
    isLoading: true
  };

  componentDidMount() {
    Promise.all([axios.get(FETCH_TICKETS_URL), axios.get(FETCH_RATES_URL)]).then(
      ([ticketsResult, ratesResult]) => {
        if (ticketsResult.status === 200 && ratesResult.status === 200) {
          this.setState({
            tickets: ticketsResult.data.tickets,
            rates: {
              USD: ratesResult.data.Valute.USD.Value,
              EUR: ratesResult.data.Valute.EUR.Value
            },
            isLoading: false
          });
        } else {
          this.setState({
            message: createMessage({ message: locale.messages.BAD_REQUEST }),
            isLoading: false
          });
        }
      }
    );
  }

  changeCurrency = (currencyCode) => {
    this.setState({ currencyCode });
  };

  changeStopsFilter = (value, filterCode, pickOnlyThis) => {
    this.setState((state) => {
      const stopsFilters = { ...state.stopsFilters };
      stopsFilters[filterCode] = value;

      if (filterCode === StopsFilters.ALL) {
        Object.keys(stopsFilters).forEach((code) => {
          stopsFilters[code] = value;
        });

        return { stopsFilters };
      }

      if (pickOnlyThis) {
        Object.keys(stopsFilters).forEach((code) => {
          stopsFilters[code] = code === filterCode;
        });

        return { stopsFilters };
      }

      const { all, ...othersFilters } = stopsFilters;

      stopsFilters[StopsFilters.ALL] = Object.values(othersFilters).every(
        filterValue => filterValue
      );

      return { stopsFilters };
    });
  };

  render() {
    return (
      <StoreContext.Provider
        value={{
          ...this.state,
          changeCurrency: this.changeCurrency,
          changeStopsFilter: this.changeStopsFilter
        }}
      >
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

export default SimpleStore;
