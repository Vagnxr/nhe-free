import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import ConfigPannel from './ConfigPannel';

const mockStore = configureMockStore();

describe('ConfigPannel component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({ configDisconnect: { valid: false } });
    component = render(
      <Provider store={store}>
        <ConfigPannel expanded={false} handleChange={() => {}} />
      </Provider>,
    );
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });

  it('should contain the title "Configurar"', () => {
    expect(component.getByText('Configurar')).toBeInTheDocument();
  });

  it('should have a "DESCONECTAR" button', () => {
    expect(component.getByText('DESCONECTAR')).toBeInTheDocument();
  });

  it('should disable "DESCONECTAR" button initially', () => {
    const disconnectButton = component.getByText('DESCONECTAR');
    expect(disconnectButton).toBeDisabled();
  });

  it('should enable "DESCONECTAR" button when input field is not empty', () => {
    const disconnectButton = component.getByText('DESCONECTAR');
    const inputField = component.getByRole('textbox', { name: 'LOGIN DO USUÁRIO' });
    fireEvent.change(inputField, { target: { value: 'user1\nuser2\nuser3' } });
    expect(disconnectButton).toBeEnabled();
  });
});
