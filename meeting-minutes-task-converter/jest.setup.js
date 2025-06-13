// Import jest-dom extensions
import '@testing-library/jest-dom';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock environment variables
process.env = {
  ...process.env,
  OPENAI_API_KEY: 'test-api-key',
}; 