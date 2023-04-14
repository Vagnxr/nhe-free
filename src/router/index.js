/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Home from 'containers/home';

import PrivateRouter from './PrivateRoutes';

const checkAuth = ({ history, authorized, ...rest }) => () =>
  authorized ? <PrivateRouter {...rest} /> : <Home {...rest} />;

const Router = ({ history, authorized, ...rest }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route strict path="/" component={checkAuth({ history, authorized, ...rest })} />
      </Switch>
    </ConnectedRouter>
  );
};

const mapStateToProps = ({
  login: {
    authorized,
    'indicador-perfil-seguro-movel': indicadorPerfilSeguroMovel,
    'indicador-perfil-derrubar-sessao': indicadorPerfilDesconexao,
  },
}) => ({ authorized, indicadorPerfilSeguroMovel, indicadorPerfilDesconexao });

export default connect(mapStateToProps)(Router);
