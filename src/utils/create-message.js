import { MessageTypes } from '../core/constants';
import locale from '../core/locale';

export default ({ message = locale.messages.DEFAULT_ERROR, type = MessageTypes.ERROR }) => ({
  message,
  type
});
