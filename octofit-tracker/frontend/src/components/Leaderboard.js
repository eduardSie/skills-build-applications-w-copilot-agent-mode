import React from 'react';
import DataResourcePage from './DataResourcePage';

function Leaderboard() {
  return React.createElement(DataResourcePage, {
    title: 'Leaderboard',
    resource: 'leaderboard',
  });
}

export default Leaderboard;
