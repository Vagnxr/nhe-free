export const types = {
  object: '[object Object]',
  array: '[object Array]',
  string: '[object String]',
  boolean: '[object Boolean]',
  number: '[object Number]',
};

export const getType = prop => Object.prototype.toString.call(prop);

export const isObject = maybeAnObject => getType(maybeAnObject) === types.object;

export const unMask = value => value.replace(/[^0-9]+/g, '');

export const removeSpaces = stringValue => stringValue.replace(/\s/g, '');

export const cleanObject = objs => objs.map(obj => obj.value);

export const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result))),
  );

export const capitalizeString = string => string.charAt(0).toUpperCase() + string.slice(1);

const suffixes = ['REQUEST', 'FULFILLED', 'REJECTED'];

export const getTypes = type =>
  suffixes.reduce((acc, curr) => ({ ...acc, [`${type}_${curr}`]: `${type}_${curr}` }), {});

export const isEmptyObj = (obj = {}) => Object.values(obj).filter(Boolean).length === 0;

export const mapDispatchToProps = actions => dispatch => ({
  actions: Object.entries(actions).reduce(
    (acc, [actionName, action]) => ({
      ...acc,
      [actionName]: (...args) => dispatch(action(...args)),
    }),
    {},
  ),
});

function* getColor(colors, reset = 0) {
  let index = reset;
  while (true) {
    yield colors[index];
    index = (index + 1) % colors.length;
  }
}
export const colorGen = (colors = []) => getColor(colors);

export const isRequestOK = status => [200, 201, 208, 300].includes(status);

export const formValidation = {
  isRequired: (field, value) => !value && { [field]: 'campo obrigatório' },
  length: (field, value, length, message) =>
    value.length !== length && {
      [field]: message || `${field} deve conter ${length} caracteres`,
    },
};

export const replaceAllButDigits = (stringValue = '') => stringValue.replace(/[^0-9.]/g, '');
export const replaceAllButDigitsWithoutPoint = (stringValue = '') =>
  stringValue.replace(/[^0-9]/g, '');

export const alphabeticalSortByProp = prop => (a, b) => {
  if (a[prop] < b[prop]) return -1;
  if (a[prop] > b[prop]) return 1;
  return 0;
};

export const flattenObject = (myObk, context = '') =>
  Object.keys(myObk).reduce(
    (acc, current) =>
      isObject(myObk[current])
        ? { ...acc, ...flattenObject(myObk[current], current) }
        : { ...acc, [context ? `${context}.${current}` : current]: myObk[current] },
    {},
  );

export const alphabeticalSortArray = array =>
  array.sort((a, b) => {
    return a.firstname.localeCompare(b.firstname);
  });

export const filterNonEmptyKeys = obj =>
  Object.keys(obj).reduce(
    (acc, current) => (obj[current] ? { ...acc } : { ...acc, [current]: obj[current] }),
    {},
  );

const filterObjectHelper = obj => Object.keys(obj).filter(key => !obj[key]);

export const filterObject = (obj, msg = '') => {
  const filteredObjectedKeys = filterObjectHelper(obj);
  return filteredObjectedKeys.reduce((acc, current) => ({ ...acc, [current]: msg }), {});
};

export const filterObjectByKey = (obj, key) =>
  Object.keys(obj).reduce(
    (acc, current) => (current === key ? { ...acc } : { ...acc, [current]: obj[current] }),
    {},
  );

export const isANumberValue = value => /^\d*$/.test(value);

export const objHasProp = (obj, prop) => obj && Object.prototype.hasOwnProperty.call(obj, prop);

export const findValueByPropName = (array, prop, name) =>
  array.find(item => item.name === name)[prop];

export const curry = (fn, ...args) =>
  fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more);
