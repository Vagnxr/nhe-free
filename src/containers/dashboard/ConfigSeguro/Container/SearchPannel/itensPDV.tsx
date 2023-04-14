import React from 'react';
import { useSelector } from 'react-redux';

import ItemPDV from './ItemPDV';

const ItensPDV = () => {
  const {
    pesquisarSeguro: { pdvs },
  } = useSelector((store: any) => store);

  return (
    <>
      {pdvs.map((itemPDV: ItemPDV) => (
        <ItemPDV
          pdv={itemPDV.pdv}
          message={itemPDV.message}
          status={itemPDV.status}
          canal={itemPDV.canal}
          seguroMovel={itemPDV.seguroMovel}
          dataConfiguracao={itemPDV.dataConfiguracao}
          operador={itemPDV.operador}
        />
      ))}
    </>
  );
};

export default ItensPDV;
