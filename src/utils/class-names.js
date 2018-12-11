const MOD_SEPARATOR = '__';

const toKebabCase = string => String(string)
  .replace(/([A-Z])/g, '-$1')
  .toLowerCase();

const getMods = (...args) => {
  const mods = [];

  args.forEach((arg) => {
    if (typeof arg === 'string' || typeof arg === 'number') {
      mods.push(toKebabCase(arg));
    } else if (Array.isArray(arg)) {
      mods.concat(getMods(...arg));
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          mods.push(key);
        }
      });
    }
  });

  return mods;
};

export default (name, ...args) => [name].concat(getMods(...args).map(mod => `${name}${MOD_SEPARATOR}${mod}`)).join(' ');
