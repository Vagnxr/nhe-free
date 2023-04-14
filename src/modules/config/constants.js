import { getTypes } from 'utils/helpers';

export default {
  ...getTypes('VALIDATE'),
  ...getTypes('SAVE'),
  RESET_VALID: 'RESET_VALID',
};
