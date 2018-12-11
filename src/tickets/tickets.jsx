import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import locale from 'core/locale';
import { classNames } from 'utils';
import Ticket from './ticket';

// eslint-disable-next-line camelcase
const getTicketKey = ({ origin, destination, departure_date, departure_time, carrier }) => `${origin}_${destination}_${departure_date}_${departure_time}_${carrier}`;

class Tickets extends PureComponent {
  static propTypes = {
    tickets: PropTypes.array.isRequired,
    currencyCode: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  renderContent() {
    const { tickets, isLoading, currencyCode } = this.props;

    if (isLoading) {
      return null;
    }

    if (tickets.length === 0) {
      return locale.messages.NO_TICKETS;
    }

    return tickets.map(ticket => (
      <Ticket {...ticket} currencyCode={currencyCode} key={getTicketKey(ticket)} />
    ));
  }

  render() {
    const { isLoading, tickets } = this.props;

    return (
      <div className={classNames('tickets', { loading: isLoading, empty: !tickets.length })}>
        {this.renderContent()}
      </div>
    );
  }
}

export default Tickets;
