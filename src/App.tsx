import React from 'react';

import {Sidebar} from './Sidebar';
import {Chat} from './Chat';
import {state} from './state';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <state.Context>
        <Sidebar />
        <Chat />
      </state.Context>
    </div>
  );
};
