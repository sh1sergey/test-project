import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { GroupCheckbox, Picker } from 'controls';
import locale from 'core/locale';
import { CurrencyCodes, StopsFilters } from 'core/constants';

class Filters extends PureComponent {
  static propTypes = {
    currencyCode: PropTypes.string.isRequired,
    stopsFilters: PropTypes.object.isRequired,
    changeCurrency: PropTypes.func.isRequired,
    changeStopsFilter: PropTypes.func.isRequired
  };

  render() {
    const { currencyCode, changeCurrency, stopsFilters, changeStopsFilter } = this.props;

    return (
      <div className="filters">
        <div className="filters_title">{locale.filters.currency}</div>
        <Picker
          items={[CurrencyCodes.RUB, CurrencyCodes.USD, CurrencyCodes.EUR].map(code => ({
            label: code,
            code
          }))}
          value={currencyCode}
          onChange={changeCurrency}
        />
        <div className="filters_title">{locale.filters.stopsCount}</div>
        {[
          StopsFilters.ALL,
          StopsFilters.NO,
          StopsFilters.ONE,
          StopsFilters.TWO,
          StopsFilters.THREE
        ].map(code => (
          <GroupCheckbox
            name={code}
            label={locale.filters.stopsLabels[code]}
            checked={stopsFilters[code]}
            onChange={changeStopsFilter}
            key={code}
          />
        ))}
      </div>
    );
  }
}

export default Filters;
