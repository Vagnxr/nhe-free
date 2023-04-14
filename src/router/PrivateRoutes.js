/* eslint-disable react/prop-types */
import React from 'react';

import ConfigAnaliseDoc from 'containers/dashboard/ConfigAnaliseDoc';
import ConfigSeguro from 'containers/dashboard/ConfigSeguro';
import ConfigDisconnect from 'containers/dashboard/ConfigDisconnect';

const PrivateRouter = ({ indicadorPerfilSeguroMovel, indicadorPerfilDesconexao }) => {
  if (indicadorPerfilDesconexao) return <ConfigDisconnect />;
  if (indicadorPerfilSeguroMovel) return <ConfigSeguro />;
  return <ConfigAnaliseDoc />;
};

export default PrivateRouter;
