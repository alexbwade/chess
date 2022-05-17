global.simpleMock = (mockName) => {
  return eval(`const ${mockName} = props => { return props.children || null }; ${mockName}`); // eslint-disable-line no-eval
};

global.componentMock = (mockName) => {
  return (props) => <div data-testid={mockName}>{props.children}</div>; // eslint-disable-line
};
