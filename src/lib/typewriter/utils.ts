export type IActionType = 'SPEED' | 'TYPE' | 'DELETE' | 'COUNT';
type State = {
  speed: number;
  text: string;
  isDeleting: boolean;
  count: number;
};
export type Action<T extends IActionType> = (T extends 'SPEED'
  ? {
      payload: number;
    }
  : T extends 'TYPE' | 'DELETE'
  ? {
      speed: number;
      payload: string;
    }
  : {}) & {
  type: T;
};

const isActionOfType = <T extends IActionType>(
  action: Action<IActionType>,
  type: T
): action is Action<T> => {
  return action.type === type;
};

export const exec = <K extends IActionType>(
  state: State,
  action: Action<K>
): State => {
  if (isActionOfType(action, 'SPEED')) {
    return {
      ...state,
      isDeleting: true,
      speed: action.payload,
    };
  } else if (isActionOfType(action, 'TYPE')) {
    return {
      ...state,
      speed: action.speed,
      text: action.payload.substring(0, state.text.length + 1),
    };
  } else if (isActionOfType(action, 'DELETE')) {
    return {
      ...state,
      speed: action.speed,
      text: action.payload.substring(0, state.text.length - 1),
    };
  } else if (isActionOfType(action, 'COUNT')) {
    return {
      ...state,
      isDeleting: false,
      count: state.count + 1,
    };
  } else {
    return state;
  }
};
