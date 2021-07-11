import React from 'react';
import UploaderSteps from './UploaderSteps';
import FileUploader from './FileUploader';
import { render, fireEvent, waitFor, act} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';

describe("<FileUploader />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("<UploaderSteps /> > Basic form interaction.", async () => {
     const { debug, getByTestId, getAllByRole } = render(<UploaderSteps />, []);

     const titleText = "File Text";
     const descriptionText = "This is a file.";

     // File inputs change value.
     const textBoxes = getAllByRole("textbox");
     const fileTitleInput = textBoxes[0];
     const fileDescInput = textBoxes[1];

     expect(fileTitleInput).toHaveValue("");
     expect(fileDescInput).toHaveValue("");

     fireEvent.change(fileTitleInput, { target: { value: titleText } })
     fireEvent.change(fileDescInput, { target: { value: descriptionText } })

     expect(fileTitleInput).toHaveValue(titleText);
     expect(fileDescInput).toHaveValue(descriptionText);

     const nextBtn = getByTestId("next-button")
     expect(nextBtn).toBeInTheDocument();
   })


   it("<UploaderSteps /> > Change from one step to the other.", async () => {
     const { debug, getByTestId, queryByTestId, getAllByRole } = render(<UploaderSteps />, []);

     const nextBtn = getByTestId("next-button")
     expect(nextBtn).toBeInTheDocument();
     expect(queryByTestId("prev-button")).not.toBeInTheDocument();

     await act(async () => {
       fireEvent.click(nextBtn, { bubbles: true });
     });

     // Both next and prev buttons are present.
     expect(getByTestId("next-button")).toBeInTheDocument();
     expect(getByTestId("prev-button")).toBeInTheDocument();

     await act(async () => {
       fireEvent.click(nextBtn, { bubbles: true });
     });

     // Since this is the final step, only the "prev" button is present.
     expect(getByTestId("prev-button")).toBeInTheDocument();
     expect(queryByTestId("next-button")).not.toBeInTheDocument();

     // Go back to the previous page, and check that the "prev" button works.
     await act(async () => {
       fireEvent.click(getByTestId("prev-button"), { bubbles: true });
     });

     expect(getByTestId("next-button")).toBeInTheDocument();
     expect(getByTestId("prev-button")).toBeInTheDocument();
   })



   it("<FileUploader />", async () => {
     const _filename = 'chucknorris.png';
     const file = new File(['(⌐□_□)'], _filename, { type: 'image/png' });
     const { debug, getByTestId, getByText } = render(<FileUploader />, {mocks:[]});

     let uploader = getByTestId('uploader');

      // simulate ulpoad event and wait until finish
      await waitFor(() =>
        fireEvent.change(uploader, {
          target: { files: [file] },
        })
      );

      expect(getByText(_filename)).toBeInTheDocument();

      const preview = getByText(_filename);
      fireEvent.click(preview, { bubbles: true });

      //debug();
   })

})
