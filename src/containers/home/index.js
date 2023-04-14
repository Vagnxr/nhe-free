import React from 'react';
import styled from 'styled-components/macro';

import LoginBackground from 'static/images/bg_brsafe.jpg';

import Loader from 'components/Loader';
import ModalDetails from 'components/ModalDetails';
import Header from 'components/Header';
import Footer from './footer';
import Login from './Login';

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px auto 80px;
  height: 100vh;
  width: 100%;
  background: url(${LoginBackground}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;

const Home = () => (
  <Container>
    <Loader />
    <ModalDetails />
    <Header />
    <Login />
    <Footer />
  </Container>
);

export default Home;
