import {
  InMemoryCache,
  makeVar,
} from '@apollo/client';

import { getUserId } from './Login/authUtils';

const isLoggedIn = () => getUserId() !== null;

/// CACHE
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        loggedIn: {
          read () {
            return isLoggedIn();
          }
        }
      }
    }
  }
});

export const loggedInVar = makeVar(isLoggedIn());
