/**
 * GraphQL API tests for the 'flower' schema.
 * @author Andrew Jarombek
 * @since 4/4/2021
 */

import { expect } from 'chai';
import * as api from './api';

describe('Flower GraphQL Endpoints', () => {
  it('returns a flower with all properties if a valid identifier is passed', async () => {
    const result = await api.flower({});
  });
});
