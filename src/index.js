import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ResetStyle from './style/ResetStyle';
import GlobalStyle from './style/GlobalStyle';
import { UserProvider } from './ContextAPI/ContextUser';
import { LogoutProvider } from './ContextAPI/ContextLogout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <LogoutProvider>
    <ResetStyle />
    <GlobalStyle />
    <App />
    </LogoutProvider>
    </UserProvider>
  </React.StrictMode>
);

