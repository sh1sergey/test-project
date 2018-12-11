import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    checked: PropTypes.bool
  };

  static defaultProps = {
    className: '',
    checked: false
  };

  controlElement = createRef();

  onChange = () => {
    const { onChange, name } = this.props;

    onChange(this.controlElement.current.checked, name);
  };

  render() {
    const { name, label, className, ...otherProps } = this.props;

    return (
      <div className={`checkbox ${className}`}>
        <input
          className="checkbox_control"
          type="checkbox"
          name={name}
          id={`checkbox_${name}`}
          {...otherProps}
          ref={this.controlElement}
          onChange={this.onChange}
        />
        <label className="checkbox_label" htmlFor={`checkbox_${name}`}>
          {label}
        </label>
      </div>
    );
  }
}

export default Checkbox;
