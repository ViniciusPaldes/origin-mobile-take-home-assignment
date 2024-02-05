import React from 'react';
import AppNavigator from './navigation';
import {FilterProvider} from './context/filter';

const App = () => {
  return (
    <FilterProvider>
      <AppNavigator />
    </FilterProvider>
  );
};

export default App;
