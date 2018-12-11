import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import locale from 'core/locale';
import { classNames } from 'utils';
import Checkbox from './checkbox';

class GroupCheckbox extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  };

  onForceClick = () => {
    const { onChange, name } = this.props;
    onChange(true, name, true);
  };

  render() {
    const { name } = this.props;
    return (
      <div className={classNames('group-checkbox', name)}>
        <div className="group-checkbox_force" onClick={this.onForceClick}>
          {locale.checkbox.only}
        </div>
        <Checkbox {...this.props} />
      </div>
    );
  }
}

export default GroupCheckbox;
