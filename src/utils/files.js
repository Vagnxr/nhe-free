import { capitalizeString } from 'utils/helpers';

const setSubProp = key => {
  const str = key.split('/')[2];
  return str && !str.includes('.') ? capitalizeString(str) : '';
};

const setPropName = key => `${key.replace(/.js/, '').split('/')[1]}${setSubProp(key)}`;

export const getFiles = context => {
  const keys = context.keys();
  const values = keys.map(context);
  return keys.reduce((acc, item, index) => {
    acc[item] = values[index];
    return acc;
  }, {});
};

export const mapFiles = files =>
  Object.entries(files).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [setPropName(key)]: value.default,
    }),
    {},
  );
