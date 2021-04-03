/**
 * This file is identified as Jest test framework config in jest.config.js.
 * @author Andrew Jarombek
 * @since 4/3/2021
 */

import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });
