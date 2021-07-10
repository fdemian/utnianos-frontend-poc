import React from 'react';
import Home from './Home';
import { gql } from "@apollo/client";
import { render, fireEvent, waitFor} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

const utils = require('../Login/authToken');

const GET_USER = gql`
  query User($id: Int!) {
    user(id: $id) {
      id
      username
      avatar
    }
  }
`;

const _user = {
  id: 1,
  username: "adminuser",
  avatar: "avatar.png"
};

describe("<Home />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("<Home /> not logged in.", async () => {
     jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
       isLoggedIn: false
     }));
     const { getAllByRole } = render(<Home />, {mocks: []});
     const links = getAllByRole("link");

     //Check that the pages has links to login and register pages.
     expect(links[0]).toHaveAttribute("href", "/login");
     expect(links[1]).toHaveAttribute("href", "/register");
   })

   it("<Home />  Logged in.", async () => {
     jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
       isLoggedIn: true
     }));

     jest.spyOn(utils, 'useAuthToken').mockImplementation(() => ([{
       'id': 1,
       'auth': "faketoken",
       'refresh': "refresh",
     },
     jest.fn(),
     jest.fn()
     ]
    ));

     const mocks = [
       {
           request: {
             query: GET_USER,
             variables: { id: 1 }
           },
           result: {
             loading: false,
             error: false,
             data: { user: _user }
          },
       }
     ];

     const { getAllByRole, getByText, getByRole } = render(<Home />, {mocks: mocks});

     // Loading phase.
     await waitFor(async () => {
       expect(getByText("Loading...")).toBeInTheDocument();
     });

     // After loading request.
     await waitFor(async () => {
       expect(getAllByRole("button").length).toStrictEqual(3);
       expect(getByRole("heading")).toHaveAttribute("class", "welcome-text");
     });

   })



})
