import * as Yup from 'yup';

const ConfigSchema = Yup.object().shape({
  loginsUsuario: Yup.string().required('É necessário ao menos um login de usuário'),
});

export default ConfigSchema;
