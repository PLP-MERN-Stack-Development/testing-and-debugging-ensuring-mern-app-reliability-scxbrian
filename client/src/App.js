import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Button from './components/Button';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Button />
      </ErrorBoundary>
    </div>
  );
}

export default App;
