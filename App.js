import React, { useState } from 'react';
import UserContext from './UserContext';
import AppNavigator from './src/screens/navigation/AppNavigator';

export default function App() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('test@gmail.com');

  return (
    <UserContext.Provider value={{ nickname, setNickname, email, setEmail }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
