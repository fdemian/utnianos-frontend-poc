import React from 'react';
import AppRoute from './AppRoute';
import { render, fireEvent, act, waitFor} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from "history";

const authUtils = require('../Login/authUtils');
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
    jest.spyOn(authUtils, 'getUserId').mockImplementation(() => 1);

    const history = createMemoryHistory();

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
    , { history: history });

    expect(getByText("AppRouter")).toBeInTheDocument();
  })

  it("Logged out > Renders public route correctly.", async () => {
    jest.spyOn(authUtils, 'getUserId').mockImplementation(() => null);

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

    jest.spyOn(authUtils, 'getUserId').mockImplementation(() => null);
    const history = createMemoryHistory();

    render(
    <>
     <AppRoute
       exact={true}
       path="/test"
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
    , {history: history});
    expect(history.location.pathname).toStrictEqual("/");
  })

})
