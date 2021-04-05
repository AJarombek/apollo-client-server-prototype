/**
 * GraphQL API tests for the 'ping' schema.
 * @author Andrew Jarombek
 * @since 4/4/2021
 */

import { expect } from 'chai';
import * as api from './api';

describe('Ping GraphQL Endpoints', () => {
  it('mocha & chai should be working', () => {
    expect(true).to.eql(true);
  });

  it('returns a number when the server is pinged', async () => {
    const result = await api.ping();
    expect(result.data.data.ping).to.eql(0);
    expect(result.status).to.eql(200);
  });
});
