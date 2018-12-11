import { createLocale } from 'utils';

export default createLocale({
  checkbox: {
    only: 'только'
  },
  plural: {
    stops: ['пересадка', 'пересадки', 'пересадок']
  },
  currencySymbols: {
    RUB: '₽',
    EUR: '€',
    USD: '$'
  },
  messages: {
    DEFAULT_ERROR: 'Что то пошло не так',
    BAD_REQUEST: 'Не удалось запросить данные',
    NO_TICKETS: 'Не найдено билетов по заданному фильтру'
  },
  ticket: {
    buy: 'Купить',
    forPrice: 'за {price}',
    airport: '{code}, {name}',
    withoutStops: 'Без пересадок'
  },
  filters: {
    currency: 'Валюта',
    stopsCount: 'Количество пересадок',
    stopsLabels: {
      all: 'Все',
      no: 'Без пересадок',
      one: '1 пересадка',
      two: '2 пересадки',
      three: '3 пересадки'
    }
  }
});
