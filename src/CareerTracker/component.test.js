import React from 'react';
import CareerTracker from './CareerTracker';
import { render, fireEvent, waitFor} from '../utils/testing-utils';
import { GET_USER, GET_CAREER_PLANS } from './queries';
import { ADD_CAREER_PLAN } from './mutations';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from "history";

const _user1 = {
  __typename: "UserObject",
	id: 1,
	username: "pipe",
	avatar: null,
	careerPlan: null
};

const _user2 = {
  __typename: "UserObject",
	id: 1,
	username: "pipe",
	avatar: null,
	careerPlan: {
		id: 1,
		name: "Ingenier\u00eda en sistemas de Informaci\u00f3n [K08] (UTN - FRBA)",
		__typename: "CareerPlanObj"
	}
};

const careerPlans = [{
  __typename: "CareerPlanObj",
	id: 1,
  name: "Ingenier\u00eda en sistemas de Informaci\u00f3n [K08] (UTN - FRBA)"
	},
  {
  __typename: "CareerPlanObj",
	id: 2,
  name: "Analista Universitario en Sistemas (UTN - FRBA)"
}];


jest.mock('../Login/authToken', () => ({
  useAuthToken: () => ([{'id': 1}])
}));

describe("<CareerTracker />", () => {

   it("<CareerTracker /> initial render/smoke test", async () => {
      const { getByText } = render(<CareerTracker />);
      expect(getByText("Loading")).toBeInTheDocument();
   })

   it("User without a career plan > Basic interaction.", async () => {

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
       }
      ];

      const { debug, getByText, getAllByRole, getByTestId } = render(<CareerTracker />, {mocks: mocks});

      await waitFor(() => {
        expect(getByText("Seguidor de carrera")).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(getByText(careerPlans[0].name)).toBeInTheDocument();
        expect(getByText(careerPlans[1].name)).toBeInTheDocument();
        expect(getAllByRole("button").length).toStrictEqual(careerPlans.length+1);
        debug();
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
      const { debug, getByText, getAllByRole, getByTestId } = render(<CareerTracker />, {mocks: mocks, history: history});

      await waitFor(() => {
        expect(getByText("Seguidor de carrera")).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(getByText(careerPlans[0].name)).toBeInTheDocument();
        expect(getByText(careerPlans[1].name)).toBeInTheDocument();
        expect(getAllByRole("button").length).toStrictEqual(careerPlans.length+1);
        debug();
      });

      //
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



})
