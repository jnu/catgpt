import React from 'react';
import {FiRefreshCcw} from 'react-icons/fi';

import {state} from './state';

export const Sidebar = () => {
  const [_, setThread] = state.use('thread');

  const resetThread = () => setThread([]);

  return (
    <div className="Sidebar">
      <ul>
        <li onClick={resetThread}>
          <a>
            <FiRefreshCcw />
            <span className="label">Reset Thread</span>
          </a>
        </li>
        {/*<li>Dark Mode</li>*/}
      </ul>
    </div>
  );
};
