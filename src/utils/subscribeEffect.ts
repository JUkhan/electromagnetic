import { EffectHandler2 as EffectHandler } from '../typeHelper';
import { store } from '../store';

/**
 * Orbit is a redux middleware that allows you to subscribe to effects based on action, and
 * it also works like a redux-thunk for the effects inside the creatReducer() function.
 *
 */

export function subscribeEffect(
  actionTypes: string[],
  callback: EffectHandler
) {
  let key = Number(new Date()).toString() + Math.random();
  let notifyCallback = (dispatch: any, getData: any, action: any) => {
    if (actionTypes.includes(action.type)) {
      callback(action, getData, dispatch);
    }
  };
  store.effectMap.set(key, notifyCallback);

  return {
    unsubscribe: () => {
      store.effectMap.delete(key);
    },
  };
}
