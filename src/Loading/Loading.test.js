import React from 'react';
import Loading from './LoadingIndicator';
import { render, screen } from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';


describe("<LoadingIndicator />", () => {

  it("Renders correctly", () => {
   const { getByText } = render(<Loading />);

   expect(getByText("Loading...")).toHaveClass("ant-spin-text");
   expect(getByText("Loading")).toHaveClass("ant-alert-message");
   expect(getByText("Please wait.")).toHaveClass("ant-alert-description");
  })
});
