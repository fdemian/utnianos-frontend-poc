import React from 'react';
import Navbar from '../Navbar';
import AccountMenu from '../AccountMenu/AccountMenu';
import { gql } from "@apollo/client";
import { render, fireEvent, waitFor} from '../../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

const utils = require('../../Login/authToken');

describe("<NavbarDesktop />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("Not logged in.", async () => {

     const navProps = {
       mobile: false,
       config: {},
       user: null,
       loggedIn: false,
       isFetching: false,
       blogName: "Morpheus",
       notificationsEnabled: false,
       notifications: [],
       mutateUser: jest.fn()
     };

     const { getAllByText, getByRole } = render(<Navbar {...navProps} />, { mocks: []});

     await waitFor(() => {
        expect(getByRole('img')).toBeInTheDocument();
        expect(getAllByText('Login').length).toStrictEqual(2);
      });
   })

   it("Loading.", async () => {

     const navProps = {
       mobile: false,
       blogName: "Morpheus",
     };

     const GET_USER = gql`
       query User($id: Int!) {
         user(id: $id) {
           __typename
           id
           username
           avatar
         }
       }
     `;

     const mocks = [
       {
           request: {
             query: GET_USER,
             variables: { id: "1" }
           },
           result: {
             loading: true,
             error: false,
             data: undefined
          },
       }
     ];
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

     await waitFor(() => {
       const { getAllByTestId } = render(<Navbar {...navProps} />, { mocks: mocks});
       expect(getAllByTestId('loading-spinner', {hidden:true}).length).toStrictEqual(2);
     });

   })

   it("Logged in.", async () => {

     const navProps = {
       mobile: false,
       blogName: "Morpheus",
     };

     const _user = {
       __typename: 'user',
       id: 1,
       username: "adminuser",
       avatar: "avatar.png"
     };

     const GET_USER = gql`
       query User($id: Int!) {
         user(id: $id) {
           __typename
           id
           username
           avatar
         }
       }
     `;

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
       },
       {
           request: {
             query: GET_USER,
             variables: { id: "1" }
           },
           result: {
             loading: false,
             error: false,
             data: { user: _user }
          },
       }
     ];
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

     const { getAllByText, getAllByRole } = render(<Navbar {...navProps} />, { mocks: mocks});
     //const loadingItems = getAllByTestId("loading-spinner");
     //expect(loadingItems.length).toStrictEqual(2);

     await waitFor(() => {

      const userText = getAllByText('adminuser', {hidden:true});
      const images = getAllByRole('img');
      const altText = navProps.blogName + " logo";

      const blogImage = images[0];
      const userImage = images[1];

      // Test user text.
      expect(userText.length).toStrictEqual(2);

      // Test user image.
      expect(blogImage).toHaveAttribute("alt", altText);
      expect(userImage).toHaveAttribute("src", `/static/avatars/${_user.avatar}`);
      expect(userImage).toHaveAttribute("alt", `Avatar for ：${_user.username}`);
    })

  })

  it("<AccountMenu /> > undefined user", async () => {
     const mutateFn = jest.fn();
     const navProps = {
       mutate: mutateFn,
       user: undefined,
       isFetching: true
     };

     const { queryByTestId } = render(<AccountMenu {...navProps} />,  { mocks: []});
     expect(queryByTestId("logout-button")).toBeFalsy();
  })

  it("<AccountMenu /> > logout", async () => {

     const mutateFn = jest.fn();
     const navProps = {
       mutate: mutateFn,
       user: {
         id: 1,
         username: "adminuser",
         avatar: "avatar.png"
       },
       isFetching: false
     };

     const { getByTestId, getByText, debug } = render(<AccountMenu {...navProps} />,  { mocks: []});

     const menuButton = getByText("adminuser");
     fireEvent.click(menuButton);

     debug();
  })

})
