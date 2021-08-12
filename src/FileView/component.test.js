import React from 'react';
import FileView from './FileView';
import { GET_COURSE_MATERIAL } from './queries';
import { render, fireEvent, waitFor, act} from '../utils/testing-utils';
import { createMemoryHistory } from "history";
import '@testing-library/jest-dom/extend-expect';

const classMaterial = {
  name: "Material 1",
  contribTypes:"Apunte,Final",
  course: {id: 1, name: "Análisis Matemático 1"},
  description: "Esto es un apunte."
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: 1,
  })
}));

describe("<FileView />", () => {

   beforeAll(() => {
   })

   it("Render with a test course material.", async () => {

       const mocks = [{
         request: {
           query: GET_COURSE_MATERIAL,
           variables: { id: 1 }
         },
         result: {
           loading: false,
           error: false,
           data: { classMaterial: classMaterial }
         }
       }
     ];

     const history = createMemoryHistory({
       initialEntries: ["/classnotes/1"]
     });

     const { getByText } = render(<FileView />, {
       mocks: mocks,
       history: history
     });

     expect(history.location.pathname).toStrictEqual('/classnotes/1');
     expect(getByText("Loading")).toBeInTheDocument();

     await waitFor(() => {
       const splittedContribTypes = classMaterial.contribTypes.split(",");
       expect(getByText(classMaterial.name)).toBeInTheDocument();
       expect(getByText(classMaterial.course.name)).toBeInTheDocument();
       expect(getByText(classMaterial.description)).toBeInTheDocument();
       expect(getByText(splittedContribTypes[0])).toBeInTheDocument();
       expect(getByText(splittedContribTypes[1])).toBeInTheDocument();
     })

   })


})
