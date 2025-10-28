import React from 'react';

const UserContext = React.createContext({
  nickname: '',
  setNickname: () => {},
  email: '',
  setEmail: () => {},
});

export default UserContext;
