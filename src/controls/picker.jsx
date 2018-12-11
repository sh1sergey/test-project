import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { classNames } from 'utils';

class Picker extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  onClick = (event) => {
    const { code } = event.currentTarget.dataset;

    this.props.onChange(code);
  };

  render() {
    const { items, value } = this.props;

    return (
      <div className="picker">
        {items.map(({ code, label }) => (
          <div
            className={classNames('picker_item', { active: code === value })}
            onClick={this.onClick}
            data-code={code}
            key={code}
          >
            {label}
          </div>
        ))}
      </div>
    );
  }
}

export default Picker;
