import * as Yup from 'yup';

const ConfigSchema = Yup.object().shape({
  canal: Yup.string()
    .required('É necessário escolher um canal.')
    .notOneOf(['SELECIONE'], 'É necessário escolher um canal.'),
  status: Yup.string().required('É necessário escolher o status da análise de documento.'),
  pontosDeVenda: Yup.string().required('É necessário ao menos um código de ponto de venda'),
});

export default ConfigSchema;
