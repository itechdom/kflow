import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { CrudContainerFP } from './crud-container';

describe('CrudContainerFP', () => {
  const props = {
    modelName: 'testModel',
    children: <div>Test</div>,
    offlineStorage: {},
    SERVER: 'http://localhost:3000',
    query: {},
    render: null,
  };

  it('renders children', () => {
    const { view, util } = render(<CrudContainerFP {...props} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});