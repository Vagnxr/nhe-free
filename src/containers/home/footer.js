import React from 'react';
import styled from 'styled-components/macro';

import Typography from '@material-ui/core/Typography';

const FooterCointaner = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => (
  <FooterCointaner>
    <Typography>{`Copyright ${new Date().getFullYear()} - Claro Brasil`}</Typography>
  </FooterCointaner>
);

export default Footer;
