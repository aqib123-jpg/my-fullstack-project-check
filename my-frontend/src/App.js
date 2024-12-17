import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

const App = () => {
  return (
    <div>
      <h1>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
