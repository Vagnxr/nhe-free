import { mapFiles, getFiles } from 'utils/files';

export default mapFiles(getFiles(require.context('./', true, /.js/)));
