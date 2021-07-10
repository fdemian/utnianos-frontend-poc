import React from 'react';
import FileList from './FileList';
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


describe("<FileList />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("<FileList />", async () => {
     jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
       isLoggedIn: false
     }));
     const { getByRole, getAllByRole, debug } = render(<FileList />, []);

     //debug();
     //console.log(getByRole("textbox"));
     expect(getByRole("textbox")).toHaveAttribute("placeholder", "Basic usage");
     expect(getAllByRole("heading").length).toStrictEqual(3);
    /*
    const links = getAllByRole("link");
     * Check that page has a welcome text and
     * that it has links to login and register pages.
     */
   })

})
