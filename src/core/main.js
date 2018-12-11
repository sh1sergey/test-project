import { createElement } from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import Root from './root';

moment.locale('ru');

const rootElement = document.querySelector('#root');

ReactDom.render(createElement(Root), rootElement);
