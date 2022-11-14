import {
  EffectHandler2 as EffectHandler,
  ActionParam,
  ActionFn,
} from './typeHelper';
import { subscribeEffect } from './utils/subscribeEffect';

function debounce(func: any, timeout = 300) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

/**
 * A function that allows you to manage side effects from outside of the components.
 * @param actions An array of action functions or a single action function - `generated from createAction()`.
 * @param handlerFn A function that accepts the dispatch, getState and action.
 * @returns cleanup function
 */
export function createEffect(actions: ActionParam, handlerFn: EffectHandler) {
  let _actions: ActionFn[] = Array.isArray(actions) ? actions : [actions];
  return subscribeEffect(
    _actions.map((actionFn: any) => actionFn._$atype),
    handlerFn
  );
}

export function on(...actions: ActionFn[]) {
  let _actions: string[] = actions.map((actionFn: any) => actionFn._$atype);

  return {
    debounce(milliseconds: number) {
      return {
        effect(handlerFn: EffectHandler) {
          return subscribeEffect(_actions, debounce(handlerFn, milliseconds));
        },
      };
    },
    effect(handlerFn: EffectHandler) {
      return subscribeEffect(_actions, handlerFn);
    },
  };
}
