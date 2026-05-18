import React from 'react';
import DataResourcePage from './DataResourcePage';

function Workouts() {
  return React.createElement(DataResourcePage, {
    title: 'Workouts',
    resource: 'workouts',
  });
}

export default Workouts;
