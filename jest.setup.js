import "@testing-library/jest-dom/extend-expect";

global.simpleMock = (mockName) => {
  return eval(`const ${mockName} = props => { return props.children || null }; ${mockName}`); // eslint-disable-line no-eval
};

global.componentMock = (mockName) => {
  return (props) => <div data-testid={mockName}>{props.children}</div>; // eslint-disable-line
};

// Fail on prop type errors
const originalConsoleError = global.console.error;

beforeEach(() => {
  global.console.error = (...args) => {
    const propTypeFailures = /\sprop\s/g.test(args.join(" "));

    if (propTypeFailures) {
      throw new Error(`Failed prop type: ${args[2]}`);
    }

    originalConsoleError(...args);
  };
});

afterEach(() => {
  global.console.error = originalConsoleError;
});

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line
    return <img {...props} />;
  },
}));
