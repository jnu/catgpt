import React from 'react';
import {useState, useContext, createContext} from 'react';

/**
 * Props for the store context provider.
 */
export type ContextProps = {
  children: React.ReactNode;
};

/**
 * Simple global app state store.
 */
export class Store<T extends Record<string, any>> {
  /**
   * Context that provides the global state to children.
   */
  public Context: React.FunctionComponent<ContextProps>;

  /**
   * Underlying context object. Not exposed directly.
   */
  private ctx: React.Context<T>;

  /**
   * Current state. Don't set this directly.
   */
  private state: T;

  /**
   * Update the global state. Not exposed directly.
   */
  private setState: React.Dispatch<React.SetStateAction<T>> | undefined;

  /**
   * Instantiate a new app store with the given values.
   */
  constructor(defaultState: T) {
    this.ctx = createContext(defaultState);
    this.state = defaultState;

    // Wrap the context provider to integrate with a state hook with which we
    // can update the global state object and re-render.
    this.Context = ({children}: ContextProps) => {
      const [state, setState] = useState(defaultState);
      this.setState = setState;
      this.state = state;
      return <this.ctx.Provider value={state}>{children}</this.ctx.Provider>;
    };
  }

  /**
   * Get the current value of a state key.
   */
  public getValue<K extends keyof T>(k: K): T[K] {
    return this.state[k];
  }

  /**
   * Hook to use a value from the store.
   *
   * Use this in lieu of a simple `useState` hook.
   */
  public use<K extends keyof T>(k: K): [T[K], (v: T[K]) => void] {
    const appState = useContext(this.ctx);

    const val = appState[k];
    return [val, (v) => this.setState!({...appState, [k]: v})];
  }
}
