import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import LogoClaro from 'static/icons/logo_claro_brasil.svg';
import LogoEmpresa from 'static/icons/empresa_claro_brasil_logo.png';

const HeaderContainer = styled.header`
  background: #d31a15;
  background: linear-gradient(135deg, #d31a15 0%, #223573 50%, #5799dd 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
`;

const LogoImage = styled.img`
  vertical-align: middle;
  padding: 0 2px;
`;

const LogoContainer = styled.div`
  padding: 0 10px;
`;

const Header = ({ children }) => (
  <HeaderContainer>
    <LogoContainer>
      <LogoImage src={LogoClaro} alt="Logo Claro Brasil" />
      <LogoImage src={LogoEmpresa} alt="Logo Net, Claro e Embratel" />
    </LogoContainer>
    {children}
  </HeaderContainer>
);

Header.defaultProps = {
  children: null,
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
