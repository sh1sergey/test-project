import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Button extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { className, children, ...otherProps } = this.props;

    return (
      <button className={`button ${className}`} {...otherProps}>
        {children}
      </button>
    );
  }
}

export default Button;
