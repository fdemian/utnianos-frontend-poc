import React, {Suspense} from 'react';
import App from '../App';
/*import { Helmet } from "react-helmet";
import { Layout } from 'antd';
import { getLoginData, isLoggedIn } from '../../Login/utils';
//import { useMediaQuery } from 'react-responsive';
//import { useUser } from '../../Login/Actions';
//import { useConfig, loadWebsocket } from '../Actions';
import fetchMock from 'jest-fetch-mock';
*/
import  { render, waitFor } from '../../utils/testing-utils';
import '@testing-library/jest-dom';

const props = { children: <div><p className="child">Children</p></div> };

jest.mock('react-responsive', () => ({
  useMediaQuery: (query) => false
}));

//const { Content, Header } = Layout;

describe("<App />", () => {

  it("Renders correctly (desktop).", async () => {
    const { getByTestId, getByRole } = render(<App {...props} />);
    const appLayout = getByTestId('app-layout');
    const content = getByTestId('content-container');
    const header = getByRole('banner', {hidden: true});

    expect(appLayout).toBeTruthy();
    expect(content).toBeTruthy();
    expect(header).toHaveClass('page-header-container');

    await waitFor(() => expect(document.title).toEqual("UTNianos"));
  });
});
