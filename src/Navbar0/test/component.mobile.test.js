import React from 'react';
import Navbar from '../Navbar';
import AccountMenu from '../Mobile/AccountMenu';
import MobileMenu from '../Mobile/MobileMenu';
import { render, fireEvent, act, waitFor} from '../../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

describe("<Navbar /> > Mobile", () => {

    it("Not logged in.", async () => {

       const navProps = {
         mobile: true,
         config: {},
         user: null,
         loggedIn: false,
         isFetching: false,
         blogName: "Morpheus",
         notificationsEnabled: false,
         notifications: [],
         mutateUser: jest.fn()
       };

       const { getByText, getByRole, debug } = render(<Navbar {...navProps} />);

       await waitFor(() => {
          //expect(getByRole('img')).toBeInTheDocument();

       })

     })

     it("Loading.", async () => {

       const navProps = {
         mobile: true,
         config: {},
         user: null,
         loggedIn: false,
         isFetching: true,
         blogName: "Morpheus",
         notificationsEnabled: false,
         notifications: [],
         mutateUser: jest.fn()
       };

       const { getByText, getByRole } = render(<Navbar {...navProps} />);

       await waitFor(() => {
          //expect(getByText('Morpheus')).toBeInTheDocument();
          expect(getByRole('img')).toBeInTheDocument();
        });

     })

     it("Logged in.", async () => {

       const navProps = {
         mobile: true,
         config: {},
         user: {
           id: 1,
           user: "adminuser",
           avatar: "avatar.png"
         },
         loggedIn: true,
         isFetching: false,
         blogName: "Morpheus",
         notificationsEnabled: false,
         notifications: [],
         mutateUser: jest.fn()
       };

       const { getByText, getByRole } = render(<Navbar {...navProps} />);

       await waitFor(() => {
          //expect(getByText('Morpheus')).toBeInTheDocument();
          expect(getByRole('img')).toBeInTheDocument();
          //expect(getByText('adminuser')).toBeInTheDocument();
       })

     })

     it("<AccountMenu />", () => {

       const navProps = {
         notificationsEnabled: true,
         notifications: [],
         logoutFn: jest.fn(),
         closeDrawer: jest.fn()
       };

       const { getByText } = render(<AccountMenu {...navProps} />);

       expect(getByText("User")).toBeInTheDocument();
       expect(getByText("Notifications")).toBeInTheDocument();
     })

     it("<MobileMenu /> > Renders account menu.", async () => {

       const navProps = {
         logoutFn: jest.fn(),
         loggedIn: true,
         notifications: [],
         notificationsEnabled: true,
         user: {
           id: 1,
           user: "adminuser",
           avatar: "avatar.png"
         },
         clearFn: jest.fn(),
         closeDrawer: jest.fn()
       };

       const { getByText, debug } = render(<MobileMenu {...navProps} />);

       await waitFor(() => {
         expect(getByText("User")).toBeInTheDocument();
       })

     })

     it("<MobileMenu /> > Renders login menu.", async () => {

       const navProps = {
         logoutFn: jest.fn(),
         loggedIn: false,
         notifications: [],
         notificationsEnabled: false,
         user: null,
         clearFn: jest.fn(),
         closeDrawer: jest.fn()
       };

       const { getByTestId } = render(<MobileMenu {...navProps} />);

       await waitFor(() => {
         expect(getByTestId("login-link")).toHaveAttribute('href', '/login');
       })

     })

  })
