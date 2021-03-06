export default {
  getAuthCookie: jest.fn(() => undefined),
  getAccessToken: jest.fn(() => ({ givenName: 'Dan', familyName: 'Smith' })),
  getParsedAuthCookie: jest.fn(() => ({ accessToken: 'accessToken' })),
  getRefreshToken: jest.fn(() => undefined),
  isUserLoggedIn: jest.fn(() => false),
  hasAccessTokenExpired: jest.fn(() => false),
  setServerSideAuthCookie: jest.fn(() => undefined),
  getServerSideAuthCookie: jest.fn(() => null),
  refreshAccessTokenIfExpired: jest.fn(async () => ({})),
  getActivePermission: jest.fn(() => undefined),
  hasGroup: jest.fn(() => false),
  hasGroupRole: jest.fn(() => false),
  isCharity: jest.fn(() => false),
  isConsumer: jest.fn(() => false),
};
