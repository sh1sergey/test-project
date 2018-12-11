import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import locale from 'core/locale';
import { CurrencyCodes } from 'core/constants';
import Button from './button';

class BuyButton extends PureComponent {
  static propTypes = {
    price: PropTypes.number.isRequired,
    className: PropTypes.string,
    currencyCode: PropTypes.string
  };

  static defaultProps = {
    className: '',
    currencyCode: CurrencyCodes.RUB
  };

  render() {
    const { price, className, currencyCode, ...otherProps } = this.props;

    return (
      <Button {...otherProps} className={`button__buy ${className}`}>
        <span className="button_buy">{locale.ticket.buy}</span>
        <span className="button_price">
          {`${locale.ticket.forPrice.toString({ price })} 
          ${locale.currencySymbols[currencyCode]}`}
        </span>
      </Button>
    );
  }
}

export default BuyButton;
