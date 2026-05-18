import React from 'react';
import DataResourcePage from './DataResourcePage';

function Activities() {
  return React.createElement(DataResourcePage, {
    title: 'Activities',
    resource: 'activities',
  });
}

export default Activities;
