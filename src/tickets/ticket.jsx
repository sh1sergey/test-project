import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import plural from 'plural-ru';
import { classNames } from 'utils';
import { BuyButton } from 'controls';
import locale from 'core/locale';

class Ticket extends PureComponent {
  static propTypes = {
    origin: PropTypes.string.isRequired,
    origin_name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    destination_name: PropTypes.string.isRequired,
    departure_date: PropTypes.string.isRequired,
    departure_time: PropTypes.string.isRequired,
    arrival_date: PropTypes.string.isRequired,
    arrival_time: PropTypes.string.isRequired,
    carrier: PropTypes.string.isRequired,
    stops: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired
  };

  static getFormattedDate(date) {
    const parsedDate = moment(`${date}`, 'DD.MM.YY');

    return parsedDate.format('D MMM YYYY, ddd');
  }

  static getStationLocale(stopsCount) {
    if (stopsCount === 0) {
      return locale.ticket.withoutStops;
    }
    return `${stopsCount} ${plural(stopsCount, ...locale.plural.stops)}`;
  }

  render() {
    /* eslint-disable camelcase */
    const {
      carrier,
      price,
      departure_time,
      origin,
      origin_name,
      departure_date,
      arrival_time,
      destination,
      destination_name,
      arrival_date,
      stops,
      currencyCode
    } = this.props;

    return (
      <div className="ticket">
        <div className="ticket_action">
          <img
            className="ticket_action_carrier-logo"
            src={`https://pics.avs.io/120/32/${carrier}@2x.png`}
            alt={carrier}
          />
          <BuyButton price={price} currencyCode={currencyCode} />
        </div>
        <div className="ticket_info">
          <div className="ticket_info_transfer">{Ticket.getStationLocale(stops)}</div>
          <div className={classNames('ticket_info_point', 'origin')}>
            <div className="ticket_info_point_time">{departure_time}</div>
            <div className="ticket_info_point_airport">
              {locale.ticket.airport.toString({ code: origin, name: origin_name })}
            </div>
            <div className="ticket_info_point_date">{Ticket.getFormattedDate(departure_date)}</div>
          </div>
          <div className={classNames('ticket_info_point', 'destination')}>
            <div className="ticket_info_point_time">{arrival_time}</div>
            <div className="ticket_info_point_airport">
              {locale.ticket.airport.toString({ code: destination, name: destination_name })}
            </div>
            <div className="ticket_info_point_date">{Ticket.getFormattedDate(arrival_date)}</div>
          </div>
        </div>
      </div>
    );
    /* eslint-enable camelcase */
  }
}

export default Ticket;
