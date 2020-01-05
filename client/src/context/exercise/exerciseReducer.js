import {
  GET_EXERCISES,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EXERCISE,
  FILTER_EXERCISES,
  CLEAR_EXERCISES,
  CLEAR_FILTER,
  EXERCISE_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.payload]
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map(exercise => {
          return exercise.id === action.payload.id ? action.payload : exercise;
        })
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => {
          return exercise.id !== action.payload;
        })
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_EXERCISES:
      return {
        ...state,
        filtered: state.exercises.filter(exercise => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return exercise.name.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    default:
      return state;
  }
};
