import { useEmEffect } from './hooks/useEmEffect';
import { useSelector } from './hooks/useSelector';
import { useSelectorByActions } from './hooks/useSelectorByActions';
import { createReducer } from './createReducer';
export * from './typeHelper';
import { createEffect, on } from './effect';
import { createAction } from './createAction';
import { addReducer } from './store';

export {
  addReducer,
  useSelector,
  useSelectorByActions,
  createReducer,
  useEmEffect,
  createAction,
  createEffect,
  on,
};
export type Data<T> = {
  loading?: boolean;
  data?: T;
  error?: string;
};
