import React from 'react';
import UploaderSteps from './UploaderSteps';
import { XhrMock } from '@react-mock/xhr';
import { render, fireEvent, waitFor, act} from '../utils/testing-utils';
import { GET_CONTRIB_TYPES, GET_COURSES, ADD_CONTRIB } from './Queries';
import '@testing-library/jest-dom/extend-expect';

const mocks = [
 {
    request: {
      query: GET_COURSES,
      variables: undefined
    },
    result: {
      loading: false,
      error: false,
      data: {
        courses: [{
          id: 1,
          name: "Analisis Matemático",
          __typename: "CourseObj"
        },
        {
          id: 2,
          name: "Ingeniería y Sociedad",
          __typename: "CourseObj"
        }]
       }
   }
  },
  {
   request: {
     query: GET_CONTRIB_TYPES,
     variables: undefined
   },
   result: {
     loading: false,
     error: false,
     data: {
        contribTypes: [{
           id: 1,
           name: "Parcial",
           __typename: "ContribTypeObj"
           },
           {
             id: 2,
             name: "Final",
             __typename: "ContribTypeObj"
           },
           {
             id: 3,
             name: "Trabajo Pr\u00e1ctico",
             __typename: "ContribTypeObj"
           },
           {
             id: 4,
             name: "Apunte/Guia",
             __typename: "ContribTypeObj"
           },
           {
             id: 5,
             name: "Libro",
             __typename: "ContribTypeObj"
           },
           {
             id: 6,
             name: "Profesores",
             __typename: "ContribTypeObj"
           },
           {
             id: 7,
             name: "Ejercicios",
             __typename: "ContribTypeObj"
           },
           {
             id: 8,
             name: "Dudas y recomendaciones",
             __typename: "ContribTypeObj"
           },
           {
             id: 9,
             name: "Consultas administratias",
             __typename: "ContribTypeObj"
           },
           {
             id: 10,
             name: "Otro",
             __typename: "ContribTypeObj"
           },
           {
             id: 11,
             name: "Guias CEIT",
             __typename: "ContribTypeObj"
           }]
       }
     }
  },
  {
    request: {
      query: ADD_CONTRIB,
      variables: undefined
    },
    result: {
      loading: false,
      error: false,
      data: null
    }
  }
];

const fileResponse = {
  url: 'uploads/chucknorris.png',
  type: 'mime/all'
};

describe("<FileUploader />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("<UploaderSteps /> > Basic form interaction.", async () => {
     const {
       getByText,
       getByTestId,
       getAllByRole
     } = render(<UploaderSteps />, {mocks: mocks});

     expect(getByText("Loading...")).toBeInTheDocument();

     await waitFor(async () => {
       //debug();
       //expect(getByText("Detalles de archivo.")).toBeInTheDocument();

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
     });

   })

   it("<UploaderSteps /> > Change from one step to the other.", async () => {

     const { getByTestId, queryByTestId } = render(<UploaderSteps />, {mocks: mocks});

     // First step. Only "next" button is present.
     await waitFor(async () => {
      expect(getByTestId("next-button")).toBeInTheDocument();
      expect(queryByTestId("prev-button")).not.toBeInTheDocument();
      fireEvent.click(getByTestId("next-button"), { bubbles: true });
     });

     // Since this is the final step, only the "prev" button is present.
     expect(getByTestId("prev-button")).toBeInTheDocument();
     expect(queryByTestId("next-button")).not.toBeInTheDocument();

     // Go back to the previous page, and check that the "prev" button works.
     await act(async () => {
       fireEvent.click(getByTestId("prev-button"), { bubbles: true });
     });

     expect(getByTestId("next-button")).toBeInTheDocument();
     expect(queryByTestId("prev-button")).not.toBeInTheDocument();
   })



   it("<FileUploader /> > Form interaction.", async () => {

     const {
       debug,
       getByRole,
       getByTestId,
       getAllByRole,
       getByText,
       queryByText
      } = render(
      <XhrMock
         url="/api/uploads"
         method="POST"
         response={(req, res) => res.status(200)}>
       >
        <UploaderSteps />
      </XhrMock>
      , {mocks: mocks});

     await waitFor(async () => {
       expect(getByTestId("next-button")).toBeInTheDocument();
       expect(getByRole('form')).toHaveFormValues({
         title: '',
         description: ''
       });
       //debug();

       // TODO: change
     });

     const inputs = getAllByRole("textbox");

     fireEvent.change(inputs[0], { target: { value: "Titulo" } });
     fireEvent.change(inputs[1], { target: { value: "Descripcion" } });

     await waitFor(async () => {
       expect(getByRole('form')).toHaveFormValues({
         title: 'Titulo',
         description: 'Descripcion'
       });
     });

     fireEvent.click(getByTestId("next-button"));

     await waitFor(async () => {
       expect(getByText("Archivos a subir")).toBeInTheDocument();
       expect(getByText("Revisar y subir")).toBeInTheDocument();
       //debug();
     });

     const _filename = 'chucknorris.png';
     const file = new File(['(⌐□_□)'], _filename, { type: 'image/png' });
     const fileUploader = getByTestId("file-uploader");
     expect(fileUploader).toBeInTheDocument();

    await waitFor(async () => {
       fireEvent.change(fileUploader, {
         target: { files: [file] },
       })
    })

    await waitFor(async () => {
      expect(getByText("Archivos subidos")).toBeInTheDocument();
      expect(getByText(_filename, { hidden: true })).toBeInTheDocument();
    });

   })

})
