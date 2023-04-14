import { getTypes } from 'utils/helpers';

export default {
  ...getTypes('VALIDATE_SEGURO'),
  ...getTypes('SAVE_SEGURO'),
  RESET_SEGURO_VALID: 'RESET_SEGURO_VALID',
};
