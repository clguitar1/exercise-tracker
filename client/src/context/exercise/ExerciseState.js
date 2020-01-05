import React, { useReducer } from 'react';
import uuid from 'uuid';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';
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

const ExerciseState = props => {
  const initialState = {
    exercises: [
      {
        id: 1,
        name: 'push ups',
        sets: 3,
        reps: 15,
        duration: '00:10:00'
      },
      {
        id: 2,
        name: 'walking',
        sets: 1,
        reps: 1,
        duration: '00:20:00'
      },
      {
        id: 3,
        name: 'running',
        sets: 1,
        reps: 1,
        duration: '00:30:00'
      }
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // Add exercise
  const addExercise = exercise => {
    // give it an id
    exercise.id = uuid.v4();
    dispatch({ type: ADD_EXERCISE, payload: exercise });
  };

  // Delete exercise
  const deleteExercise = id => {
    dispatch({ type: DELETE_EXERCISE, payload: id });
  };

  // Set current exercise
  const setCurrent = exercise => {
    dispatch({ type: SET_CURRENT, payload: exercise });
  };

  // Clear current exercise - clear the form and set current back to null
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update exercise
  const updateExercise = exercise => {
    dispatch({ type: UPDATE_EXERCISE, payload: exercise });
  };

  // Filter exercises
  const filterExercises = text => {
    dispatch({ type: FILTER_EXERCISES, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises: state.exercises,
        current: state.current,
        filtered: state.filtered,
        addExercise,
        deleteExercise,
        setCurrent,
        clearCurrent,
        updateExercise,
        filterExercises,
        clearFilter
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
