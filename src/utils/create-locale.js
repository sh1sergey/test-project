import compile from 'string-template/compile';

const wrapString = (string) => {
  const wrappedString = new String(string); // eslint-disable-line no-new-wrappers
  wrappedString.toString = compile(string);

  return wrappedString;
};

const hanleData = (data, value, key) => {
  if (typeof value === 'string' && value.match(/\{.+\}/g)) {
    data[key] = wrapString(value); // eslint-disable-line no-param-reassign
    return;
  }

  if (typeof value === 'object') {
    // eslint-disable-next-line no-param-reassign, no-use-before-define
    data[key] = createLocale(data[key]);
  }
};

const createLocale = (data) => {
  if (Array.isArray(data)) {
    data.forEach((value, index) => {
      hanleData(data, value, index);
    });
  } else if (typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      hanleData(data, data[key], key);
    });
  }

  return data;
};

export default createLocale;
