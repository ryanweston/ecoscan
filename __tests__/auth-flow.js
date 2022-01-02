/**
 * @format
 */

import React from 'react';
import {
  cleanup,
  render, waitFor,
} from '@testing-library/react-native';
import * as keyChainFunctions from 'react-native-keychain';
import App from '../App';
import { request, setTokenHeaders } from '../app/request';
import { mockToken, mockKeychain } from '../data/auth';
import { mockProducts, mockSustainableProducts } from '../data/product';

jest.setTimeout(10000);

afterEach(() => cleanup());

/// /// MOCKS

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(
    // eslint-disable-line no-unused-vars
    () => new Promise((resolve) => resolve(true)),
  ),
  getGenericPassword: jest.fn(
    // eslint-disable-line no-unused-vars
    () => new Promise((resolve) => resolve(mockKeychain)),
  ),
  resetGenericPassword: jest.fn(
    // eslint-disable-line no-unused-vars
    () => new Promise((resolve) => resolve(true)),
  ),
}));

jest.mock('../app/request', () => ({
  request: {
    get: jest.fn(() => ({ data: [] })),
    post: jest.fn(() => ({ data: [] })),
  },
  setTokenHeaders: jest.fn(),
}));

/// /// TESTS

describe('Authentication flow:', () => {
  it('Credentials: Home page rendered', async () => {
    // Mock returned data for subsequent get calls.
    request.get.mockReturnValueOnce({ data: mockProducts })
      .mockReturnValueOnce({ data: mockProducts })
      .mockReturnValueOnce({ data: mockSustainableProducts });

    const app = render(<App />);
    expect.assertions(8);

    // Signing in / fetching keychain (token) data
    expect(app.toJSON().children[1].children[0]).toEqual('Signing in');

    // Wait for's are used due to render side effects causing state changes with auth asychronously
    // Test the getAuthState behaviour here.
    await expect(keyChainFunctions.getGenericPassword()).resolves.toBe(mockKeychain);
    await waitFor(() => expect(keyChainFunctions.getGenericPassword).toHaveBeenCalledWith({ service: 'netscapes' }));
    await waitFor(() => expect(setTokenHeaders).toHaveBeenCalledWith(mockToken));

    // In the future: Test home component seperately and use Enzyme for
    // better component tree testing, in regards to snapshots.
    expect(request.get).toHaveBeenNthCalledWith(1, '/products/most-popular');

    // Expect from 3rd due to focus callback recalling API.
    expect(request.get).toHaveBeenNthCalledWith(3, '/products/most-sustainable');
    expect(request.get).toHaveNthReturnedWith(1, { data: mockProducts });
    expect(request.get).toHaveNthReturnedWith(3, { data: mockSustainableProducts });
  });

  it('No credentials: Login page rendered', async () => {
    const noCredentials = {
      service: 'netscapes',
      storage: 'keychain',
      username: 'ryanweston@cool.com',
    };

    // Mock keychain to return no tokens
    keyChainFunctions.getGenericPassword.mockImplementation(
      () => new Promise((resolve) => resolve(noCredentials)),
    );

    const app = render(<App />);

    // Signing in / fetching keychain (token) data
    expect(app.toJSON().children[1].children[0]).toEqual('Signing in');

    // Wait for's are used due to render side effects causing state changes with auth asychronously
    // Test the getAuthState behaviour here.
    await expect(keyChainFunctions.getGenericPassword()).resolves.toBe(noCredentials);
    await waitFor(() => expect(keyChainFunctions.getGenericPassword).toHaveBeenCalledWith({ service: 'netscapes' }));

    // Login page has rendered
    expect(app.toJSON().children[1].type).toEqual('RNGoogleSigninButton');
  });

  // Find a better way to test inside context provider for this
  // Unreliable with complex asynchronous nature of handleUnauthorized

  // it('Expired refresh token: Reauthenticating', async () => {
  //   keyChainFunctions.getGenericPassword.mockImplementation(
  //     () => new Promise((resolve) => resolve(mockKeychain)),
  //   );

  //   request.get.mockImplementation(
  //     () => new Promise((resolve, reject) => reject({ response: { status: 401 } })),
  //   );

  //   const app = render(<App />);

  //   // Signing in / fetching keychain (token) data
  //   expect(app.toJSON().children[1].children[0]).toEqual('Signing in');

  //   // Wait for's are used due to render side effects causing state changes with auth asychronously
  //   // Test the getAuthState behaviour here.
  //   await expect(keyChainFunctions.getGenericPassword()).resolves.toBe(mockKeychain);
  //   await waitFor(() => expect(keyChainFunctions.getGenericPassword).toHaveBeenCalledWith({ service: 'netscapes' }));
  //   await waitFor(() => expect(setTokenHeaders).toHaveBeenCalledWith(mockToken));

  //   // Return a 401 unauthorized to trigger handleUnauthorized
  //   await waitFor(() => expect(request.get).toHaveBeenNthCalledWith(1, '/products/most-popular'));
  //   await waitFor(() => expect(request.get).rejects.toStrictEqual({ response: { status: 401 } }));

  //   // Check that we're inside the handleUnauthorized function as state would have changed
  //   // by the time this function has been
  //   await waitFor(() => expect(keyChainFunctions.getGenericPassword).toHaveBeenCalledWith({ service: 'netscapes' }));

  //   // Loading page rendered with 'Reauthenticating' message
  //   await waitFor(() => expect(app.toJSON().children[1].children[0]).toEqual('Reauthenticating'));
  // });
});
