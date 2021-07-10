import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import '@testing-library/jest-dom';
import { createMemoryHistory } from "history";

const TestingWrapper = (props) => {
  const { children, mocks, history} = props;
  return (
  <MockedProvider mocks={mocks}>
    <Router history={history ? history : null}>
      {children}
    </Router>
  </MockedProvider>
  )
}

const customRender = (ui, options) => {
  return render(ui, { wrapper: (props) => <TestingWrapper children={props.children} {...options} />, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
