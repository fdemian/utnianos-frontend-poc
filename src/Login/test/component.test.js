import React from 'react';
import { render, fireEvent, act, waitFor} from '../../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

import Login from '../Login';
import Loading from '../../Loading/LoadingIndicator';

import { newLogin, useUser } from '../Actions';
import { isLoggedIn, logout, setLoginData} from '../utils';

describe("<Login />", () => {

    it("Login Form > Can change values.", () => {

      jest.mock('../utils', () => ({
        isLoggedIn: () => false,
        logout: jest.fn(),
        setLoginData: jest.fn()
      }));

      jest.mock('../Actions', () => ({
        useUser: () => ({
          user: {},
          error: false,
          isLoading: false,
          mutate: jest.fn()
        })
      }));

      const { getByRole, getByTestId } = render(<Login />);

      expect(getByRole('form')).toHaveFormValues({
        username: '',
        password: '',
      });

      const usernameInput = getByTestId('username-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.change(usernameInput, { target: { value: 'user1' } })
      fireEvent.change(passwordInput, { target: { value: 'pass' } })

      expect(getByRole('form')).toHaveFormValues({
        username: 'user1',
        password: 'pass',
      });

    })

    it("Submit form.", async () => {

      jest.mock('../utils',() => ({
        isLoggedIn: () => false,
        logout: jest.fn(),
        setLoginData: jest.fn()
      }));

      jest.mock('../Actions', () => ({
        newLogin: async () => {
          return { id: 4 };
        },
        useUser: () => ({
          user: {},
          error: false,
          isLoading: false,
          mutate: jest.fn()
        })
      }));


      const { getByRole, getByTestId, getByText } = render(<Login />);

      const usernameInput = getByTestId('username-input');
      const passwordInput = getByTestId('password-input');

      fireEvent.change(usernameInput, { target: { value: 'user1' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });

      await act(async () => {
        fireEvent.click(getByRole('button'), { bubbles: true });
      });

      const loading = getByText('Loading');
      expect(loading).toBeInTheDocument();
   })

});
