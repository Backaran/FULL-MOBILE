import '@testing-library/jest-native/extend-expect';

globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;