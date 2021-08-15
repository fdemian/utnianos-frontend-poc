import React from 'react';
import FileList from './FileList';
import { render, waitFor, getDefaultNormalizer} from '../utils/testing-utils';
import '@testing-library/jest-dom/extend-expect';
import { GET_CONTRIB_FILES, GET_CONTRIB_TYPES, GET_COURSES } from './Queries';

const checkTextComponents = (list, getAllByText) => {
  for (const component of list) {
    const allInstances = getAllByText(component.name,{
      normalizer: getDefaultNormalizer({ trim: false }),
    });

    for (const instance of allInstances) {
      expect(instance).toBeInTheDocument();
    }
  }
}

const mocks = [
  {
      request: {
        query: GET_COURSES,
        variables: {}
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
         variables: {}
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
            query: GET_CONTRIB_FILES,
            variables: {}
         },
         result: {
           loading: false,
           error: false,
           data: {
             classMaterials: [{
                   id: 1,
                   name: "Test",
                     filePath: null,
                   contribTypes: "Profesores, Trabajo Practico",
                   course: {
                     id: 1,
                     name: "Analisis Matem\u00e1tico",
                     __typename: "CourseObj"
                   },
                   __typename: "ClassMaterialObj"
                  },
                  {
                     id: 4,
                   name: "Titulo",
                   filePath: null,
                   contribTypes: "Profesores,Trabajo Pr\u00e1ctico",
                   course: {
                     id: 1,
                     name: "Analisis Matem\u00e1tico",
                    __typename: "CourseObj"
                   },
                   __typename: "ClassMaterialObj"
                  },
                  {
                    id: 5,
                    name: "Prueba3",
                    filePath: null,
                    contribTypes: "Ejercicios,Final",
                    course: {
                    id: 1,
                    name: "Analisis Matem\u00e1tico",
                    __typename: "CourseObj"
                    },
                    __typename: "ClassMaterialObj"
                 }]
             }
       }
     }
];


describe("<FileList />", () => {

   beforeAll(() => {
     console.error = (msg) => {}; //no-op
   })

   it("<FileList />", async () => {
     const {
       getByRole,
       getAllByText,
       getAllByRole
     } = render(<FileList />, { mocks: mocks });

     expect(getAllByText("Loading...").length).toStrictEqual(2);

     await waitFor(async () => {
       expect(getAllByRole("combobox").length).toStrictEqual(2);

       // Expect courses to be in the document
       const courses = mocks[2].result.data.classMaterials.map(c => ({ name: c.course.name }));
       checkTextComponents(courses, getAllByText);
       expect(getByRole("textbox")).toBeInTheDocument();
       expect(getByRole("textbox")).toHaveAttribute("placeholder", "Filtrar por titulo del apunte");
       expect(getByRole("textbox")).toHaveValue("");
     })

   })

})
