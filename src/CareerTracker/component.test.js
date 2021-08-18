import React from 'react';
import CareerTracker from './CareerTracker';
import { render, fireEvent, waitFor} from '../utils/testing-utils';
import {
  GET_USER,
  GET_CAREER_PLANS,
  GET_PLAN_STATUS,
  GET_COMPLETION_STATUSES,
  GET_PRERREQUISITES,
  GET_CAREER_PLAN
} from './queries';
import { ADD_CAREER_PLAN } from './mutations';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from "history";
import {
  coursesStatus,
  _user1,
  _user2,
  careerPlans,
  completionStatuses,
  coursePrerrequisites,
  careerPlan
} from './testData';

const authUtils = require('../Login/authUtils');

describe("<CareerTracker />", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  /*
  it("<CareerTracker /> initial render/smoke test", async () => {
    const { getByText } = render(<CareerTracker />);
    expect(getByText("Loading")).toBeInTheDocument();
  })*/

  it("User without a career plan > Basic interaction.", async () => {

    jest.spyOn(authUtils, 'getUserId').mockImplementation(() => 1);

    const mocks = [{
     request: {
       query: GET_USER,
       variables: { id: 1 }
     },
     result: {
       loading: false,
       error: false,
       data: { user: _user1 }
     }
    },
    {
      request: {
        query: GET_CAREER_PLANS
      },
      result: {
        loading: false,
        error: false,
        data: {
          careerPlans: careerPlans
        }
      },
    }];

    const { getByText, getAllByRole, getByTestId } = render(<CareerTracker />, {mocks: mocks});

    await waitFor(() => {
      expect(getByText("Seguidor de carrera")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(getByText(careerPlans[0].name)).toBeInTheDocument();
      expect(getByText(careerPlans[1].name)).toBeInTheDocument();
      expect(getAllByRole("button").length).toStrictEqual(careerPlans.length+1);
    });

    //
    await waitFor(() => {
      expect(getByTestId("career-picker-button")).toHaveProperty('disabled', true);
    });

    const buttons = getAllByRole("button");
    fireEvent.click(buttons[0]);

    // Confirmation button should no longer be
    // disabled, since we've selected a career plan.
    await waitFor(() => {
      expect(getByTestId("career-picker-button")).toHaveProperty('disabled', false);
    });

    // Confirmation button should remain enabled.
    fireEvent.click(buttons[1]);
    await waitFor(() => {
      expect(getByTestId("career-picker-button")).toHaveProperty('disabled', false);
    });
   })

   it("User without a career plan > Call mutation.", async () => {

    jest.spyOn(authUtils, 'getUserId').mockImplementation(() => 1);

    const mocks = [{
       request: {
         query: GET_USER,
         variables: { id: 1 }
       },
       result: {
         loading: false,
         error: false,
         data: { user: _user1 }
       }
      },
      {
        request: {
          query: GET_CAREER_PLANS
        },
        result: {
          loading: false,
          error: false,
          data: {
            careerPlans: careerPlans
          }
        },
      },
      {
        request: {
         query: ADD_CAREER_PLAN,
          variables: {
           planId:1,
           userId:1
          }
        },
        result: {
          loading: false,
          error: false,
          data: {
            addCareerPlan: {
              ok: true
            }
          }
        },
       }
     ];

     const history = createMemoryHistory();
     const { getAllByRole, getByTestId } = render(<CareerTracker />, {mocks: mocks, history: history});

     await waitFor(() => {
       expect(getByTestId("career-picker-button")).toHaveProperty('disabled', true);
     });

     const buttons = getAllByRole("button");
     fireEvent.click(buttons[0]);

     // Confirmation button should remain enabled.
     fireEvent.click(getByTestId("career-picker-button"));
     await waitFor(() => {
       expect(history.location.pathname).toBe("/");
     });
   })

   it("User with a career plan > Basic interaction", async () => {

     jest.spyOn(authUtils, 'getUserId').mockImplementation(() => 1);

     const mocks = [{
       request: {
         query: GET_USER,
         variables: { id: 1 }
       },
       result: {
         loading: false,
         error: false,
         data: { user: _user2 }
       }
     },
     {
       request: {
         query: GET_PLAN_STATUS,
         variables: { id: 1 }
       },
       result: {
         loading: false,
         error: false,
         data: { coursesStatus: coursesStatus }
       }
     },
     {
       request: {
         query: GET_COMPLETION_STATUSES
       },
       result: {
         loading: false,
         error: false,
         data: { completionStatuses: completionStatuses }
       }
     },
     {
       request: {
         query: GET_PRERREQUISITES
       },
       result: {
         loading: false,
         error: false,
         data: { coursePrerrequisites: coursePrerrequisites }
       }
     },
     {
       request: {
         query: GET_CAREER_PLAN,
         variables: { id: 2 }
       },
       result: {
         loading: false,
         error: false,
         data: { careerPlan: careerPlan }
       }
     }
    ];

    const {
      queryByText,
      getByText,
      getByTestId,
      getAllByText
    } = render(<CareerTracker />,{mocks: mocks});

    await waitFor(() => {
      expect(getByText("Seguidor de carrera")).toBeInTheDocument();
      expect(getByText(careerPlan.name)).toBeInTheDocument();

      const courses = careerPlan.courses.filter(c => c.year === 1);
      for(const course of courses){
        expect(getByText(course.name)).toBeInTheDocument();
      }
    })

    // Click right arrow and get the 2nd year.
    fireEvent.click(getByTestId("arrow-right"));

    await waitFor(() => {
      const courses2 = careerPlan.courses.filter(c => c.year === 2);
      for(const course of courses2){
        expect(getByText(course.name)).toBeInTheDocument();
      }
    })

    // Click right arrow and get the 3rd year.
    fireEvent.click(getByTestId("arrow-right"));

    await waitFor(() => {
      const courses3 = careerPlan.courses.filter(c => c.year === 3);
      for(const course of courses3){
        expect(getByText(course.name)).toBeInTheDocument();
      }
    })

    // Click right arrow and get the 4th year.
    fireEvent.click(getByTestId("arrow-right"));

    await waitFor(() => {
      const courses4 = careerPlan.courses.filter(c => c.year === 4);
      for(const course of courses4){
        expect(getByText(course.name)).toBeInTheDocument();
      }
    })

    //Get the previous year and check that no current year elements are present.
    fireEvent.click(getByTestId("arrow-left"));

    await waitFor(() => {
      const courses4 = careerPlan.courses.filter(c => c.year === 4);
      for(const course of courses4){
        expect(queryByText(course.name)).toStrictEqual(null);
      }
    })

    fireEvent.click(getByTestId("arrow-right"));

    //
    const disabledText = "No se cumplen las coorrelativas para que curses esta materia.";
    expect(getAllByText(disabledText).length).toStrictEqual(2);

    /*
    fireEvent.mouseOver(getAllByTestId("disabled-course")[0]);

    await waitFor(() => {
      expect(getByText("Para cursar te faltan las siguientes correlativas:"))
      .toBeInTheDocument();
      //debug();
    })
    */

  })

   // TODO: change course status and check correlatives.

})
