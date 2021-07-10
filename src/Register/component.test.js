import React from 'react';
import Register from './Register';
import RegisterSuccess from './RegisterSuccess';
import { render, fireEvent, act, waitFor} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';
import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      ok
      id
      message
    }
  }
`;

const mocks = [
  {
      request: {
        query: CREATE_USER,
        variables: { id: "1" }
      },
      result: {
        loading: false,
        error: false,
        data: {
          user: {
           ok: true,
           id: 1,
           message: ""
         }
       }
     },
  }
];

describe("<Register />", () => {

  beforeAll(() => {
   console.error = (msg) => {}; //no-op
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Register screen > Form interaction.", async () => {
    const { getByText, getByRole, getAllByRole } = render(<Register />, {mocks: mocks});

    expect(getByRole('form')).toHaveFormValues({
      username: '',
      email: '',
      password: '',
      passwordrepeat:'',
    });

    const textboxes = getAllByRole("textbox");
    const username = textboxes[0];
    const email = textboxes[1];
    const password = textboxes[2];
    const passwordrepeat = textboxes[3];

    fireEvent.change(username, { target: { value: 'user1' } })
    fireEvent.change(email, { target: { value: 'user1@mail.com' } })
    fireEvent.change(password, { target: { value: 'password' } })
    fireEvent.change(passwordrepeat, { target: { value: 'pass' } })

    expect(getByRole('form')).toHaveFormValues({
      username: 'user1',
      email: 'user1@mail.com',
      password: 'password',
      passwordrepeat: 'pass',
    });

    await act(async () => {
      expect(getByRole('button')).toBeInTheDocument();
      fireEvent.click(getByRole('button'), { bubbles: true });
    });

    expect(getByText("Password values do not match.")).toBeInTheDocument();

    fireEvent.change(passwordrepeat, { target: { value: 'password' } });

    await act(async () => {
      const button = getAllByRole('button');
      fireEvent.click(button[0], { bubbles: true });
      fireEvent.click(button[1], { bubbles: true });
    });

  })

  it("Register success.", async () => {
    const { getAllByRole } = render(<RegisterSuccess />, {mocks: []});

    const links = getAllByRole("link");

    //Check that the pages has links to login and register pages.
    expect(links[0]).toHaveAttribute("href", "/login");
    expect(links[1]).toHaveAttribute("href", "/");

  })

})
