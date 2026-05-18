import React from 'react';
import DataResourcePage from './DataResourcePage';

function Users() {
  return React.createElement(DataResourcePage, {
    title: 'Users',
    resource: 'users',
  });
}

export default Users;
