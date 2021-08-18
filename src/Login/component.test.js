import React from 'react';
import Login from './Login';
import { render, fireEvent, act } from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from "history";
import {
  GET_USER,
  USER_LOGIN
} from './queries';

const user = {
  id: 1,
  username: "adminuser",
  avatar: "avatar.png",
};

const auth = {
  id: 1,
  accessToken: "",
  refreshToken: "",
  __typename: ""
};

const mocks = [
  {
      request: {
        query: USER_LOGIN,
        variables: {"username":"user1","password":"pass"}
      },
      result: {
        loading: false,
        error: false,
        data: { auth: auth }
     },
  },
  {
      request: {
        query: GET_USER,
        variables: { id: 1 }
      },
      result: {
        loading: false,
        error: false,
        data: { user: user }
     },
  }
];

describe("<Login />", () => {

  beforeAll(() => {
   console.error = (msg) => {}; //no-op
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Login > Renders Form.", async () => {
    const { getByRole, getAllByRole } = render(<Login />, {mocks: mocks});
    const images = getAllByRole("img");
    const inputs = getAllByRole("textbox");

    expect(images[0]).toHaveAttribute("alt", "Utnianos");
    expect(inputs[0]).toHaveAttribute("type", "text");
    expect(inputs[1]).toHaveAttribute("type", "password");
    expect(getByRole("button")).toHaveAttribute("type", "submit");
  })



  it("Login > Form interaction.", async () => {

    const { getByRole, getAllByRole } = render(<Login />, {mocks: mocks});

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
   const history = createMemoryHistory();

   render(<Login />, {mocks: mocks, history: history});
   expect(history.location.pathname).toBe("/");
  })

})
