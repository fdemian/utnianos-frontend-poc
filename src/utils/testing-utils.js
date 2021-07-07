import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import '@testing-library/jest-dom';


const TestingWrapper = ({ children }) => {
  return (
    <MockedProvider>
      <Router>
        {children}
      </Router>
    </MockedProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: TestingWrapper, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
