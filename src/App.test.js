import React from 'react';
import App from './App';
import { render } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';
import Router from 'react-router-dom'; 
import { Route } from 'react-router-dom';

test('calls history.push for an internal route', async () => { 
  // Arrange 
  const mockHistoryPush = jest.fn();
  const { container } = render(
    <Router history={mockHistoryPush}> 
      {/* Your Route component with all necessary props */}
      <Route 
        path="/profile"
        render={({ location, match, history }) => {
          // ... your route rendering logic
        }} 
      />
    </Router>
  );

  // Act
  const internalRouteLink = container.querySelector('a[href="/some-internal-route"]'); // Find an internal link 
  userEvent.click(internalRouteLink);

  // Assert
  expect(mockHistoryPush).toHaveBeenCalledWith('/some-internal-route');
});