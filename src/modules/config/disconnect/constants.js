import { getTypes } from 'utils/helpers';

export default {
  ...getTypes('VALIDATE_DISCONNECT'),
  ...getTypes('SAVE_DISCONNECT'),
  RESET_DISCONNECT_VALID: 'RESET_DISCONNECT_VALID',
};
