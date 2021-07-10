import React from 'react';
import Login from './Login';
import { render, fireEvent, act } from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from "history";

const utils = require('./authToken');
const mutation = require('./loginMutation');

describe("<Login />", () => {

  beforeAll(() => {
   console.error = (msg) => {}; //no-op
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Login > Renders Form.", async () => {
    const { getByRole, getAllByRole } = render(<Login />, {mocks: []});
    const images = getAllByRole("img");
    const inputs = getAllByRole("textbox");

    expect(images[0]).toHaveAttribute("alt", "Utnianos");
    expect(inputs[0]).toHaveAttribute("type", "text");
    expect(inputs[1]).toHaveAttribute("type", "password");
    expect(getByRole("button")).toHaveAttribute("type", "submit");
  })

  it("Login > Form interaction.", async () => {
    jest.spyOn(mutation, 'useLoginMutation').mockImplementation(() => [
      () => ({
        loading: true
      })
    ]);

    const { getByRole, getAllByRole } = render(<Login />, {mocks: []});

    expect(getByRole('form')).toHaveFormValues({
      username: '',
      password: ''
    });

    const textboxes = getAllByRole("textbox");
    const usernameInput = textboxes[0];
    const passwordInput = textboxes[1];

    fireEvent.change(usernameInput, { target: { value: 'user1' } })
    fireEvent.change(passwordInput, { target: { value: 'pass' } })

    expect(getByRole('form')).toHaveFormValues({
      username: 'user1',
      password: 'pass',
    });

    await act(async () => {
      expect(getByRole('button')).toBeInTheDocument();
      fireEvent.click(getByRole('button'), { bubbles: true });
    });

  })


  it("Login > Logged in (redirects to '/').", async () => {
    jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({ isLoggedIn: true}));
    jest.spyOn(utils, 'useAuthToken').mockImplementation(() => ([{
      'id': 1,
      'auth': "faketoken",
      'refresh': "refresh",
    },
    jest.fn(),
    jest.fn()
    ]
   ));
   jest.spyOn(mutation, 'useLoginMutation').mockImplementation(() => [
     () => {}
   ]);
   const history = createMemoryHistory();

   render(<Login />, {mocks: [], history: history});
   expect(history.location.pathname).toBe("/");
  })

})
