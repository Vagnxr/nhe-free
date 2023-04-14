import React from 'react';
import styled from 'styled-components/macro';

import Loader from 'components/Loader';
import ModalDetails from 'components/ModalDetails';
import Header from 'components/Header';
import ConfirmationModal from 'components/ConfirmationModal';
import CopyModal from 'components/CopyModal';

import Menu from '../Menu';
import ContainerConfig from './Container';

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  width: 100%;
  background-color: #f5f6f5;
`;

const ConfigSeguro = () => (
  <Container>
    <Loader />
    <ModalDetails />
    <CopyModal />
    <ConfirmationModal />
    <Header>
      <Menu />
    </Header>
    <ContainerConfig />
  </Container>
);

export default ConfigSeguro;
