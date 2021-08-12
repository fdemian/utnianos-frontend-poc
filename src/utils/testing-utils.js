import React from 'react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';


const TestingWrapper = (props) => {
  const { children, mocks, history} = props;
  return (
  <MockedProvider mocks={mocks}>
    <BrowserRouter history={history ? history : null}>
      {children}
    </BrowserRouter>
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
