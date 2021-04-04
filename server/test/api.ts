/**
 * Functions for making requests to the GraphQL API.  These are used by the end to end tests.
 * @author Andrew Jarombek
 * @since 4/4/2021
 */

import axios, { AxiosResponse } from 'axios';

export const flower = (variables): Promise<AxiosResponse> =>
  axios.post('', {
    query: '',
    variables
  });
