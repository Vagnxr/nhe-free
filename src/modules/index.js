import { mapFiles, getFiles } from 'utils/files';

export const reducers = mapFiles(getFiles(require.context('./', true, /reducer.js/)));
export const actions = mapFiles(getFiles(require.context('./', true, /actions.js/)));
export const sagas = mapFiles(getFiles(require.context('./', true, /sagas.js/)));

export default {
  reducers,
  actions,
  sagas,
};
