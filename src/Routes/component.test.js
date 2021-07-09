import React from 'react';
import AppRoute from './AppRoute';
import { render, fireEvent, act, waitFor} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

const utils = require('../Login/authToken');
const TestComponent = () => <p>AppRouter</p>;
const LoginTestView = () => <p>Login</p>;

describe("<AppRouter />", () => {

  beforeAll(() => {
    console.error = (msg) => {}; //no-op
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Logged in > Private route. Renders private route.", async () => {
    jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
      isLoggedIn: true
    }));
    const { getByText } = render(
    <>
       <AppRoute
         exact={true}
         path="/"
         component={TestComponent}
         isPrivate={true}
         key="---"
       />
       <AppRoute
         exact={true}
         path="/login"
         component={LoginTestView}
         isPrivate={false}
         key="login3"
       />
    </>
    , []);
    expect(getByText("AppRouter")).toBeInTheDocument();
  })

  it("Logged out > Renders public route correctly.", async () => {
    jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
      isLoggedIn: false
    }));
    const { getByText } = render(<AppRoute
      exact={true}
      path="/"
      component={TestComponent}
      isPrivate={false}
      key="-"
    />, []);
    expect(getByText("AppRouter")).toBeInTheDocument();
  })

  it("Logged out > Private route. Renders login component.", async () => {
    jest.spyOn(utils, 'useIsLoggedIn').mockImplementation(() => ({
      isLoggedIn: false
    }));
    const { getByText } = render(<>
     <AppRoute
       exact={true}
       path="/"
       component={TestComponent}
       isPrivate={true}
       key="--"
     />
     <AppRoute
       exact={true}
       path="/login"
       component={LoginTestView}
       isPrivate={false}
       key="login"
     />
    </>
    , []);
    expect(getByText("Login")).toBeInTheDocument();
  })



})
