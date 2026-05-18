import React from 'react';
import DataResourcePage from './DataResourcePage';

function Teams() {
  return React.createElement(DataResourcePage, {
    title: 'Teams',
    resource: 'teams',
  });
}

export default Teams;
