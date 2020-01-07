import React, { useReducer } from 'react';
import axios from 'axios';
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
    exercises: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // Get all exercises and add them to state
  const getExercises = async () => {
    try {
      const res = await axios.get('/api/exercises');

      dispatch({ type: GET_EXERCISES, payload: res.data });
    } catch (error) {
      dispatch({ type: EXERCISE_ERROR, payload: error.response.msg });
    }
  };

  // Add exercise
  const addExercise = async exercise => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/exercises', exercise, config);

      dispatch({ type: ADD_EXERCISE, payload: res.data });
    } catch (error) {
      dispatch({ type: EXERCISE_ERROR, payload: error.response.msg });
    }
  };

  // Delete exercise
  const deleteExercise = async id => {
    try {
      await axios.delete(`api/exercises/${id}`);

      dispatch({
        type: DELETE_EXERCISE,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Update exercise
  const updateExercise = async exercise => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/exercises/${exercise._id}`,
        exercise,
        config
      );

      dispatch({
        type: UPDATE_EXERCISE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Clear exercises - clears the exercises array on logout
  const clearExercises = () => {
    dispatch({ type: CLEAR_EXERCISES });
  };

  // Set current exercise
  const setCurrent = exercise => {
    dispatch({ type: SET_CURRENT, payload: exercise });
  };

  // Clear current exercise - clear the form and set current back to null
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        error: state.error,
        addExercise,
        deleteExercise,
        setCurrent,
        clearCurrent,
        updateExercise,
        filterExercises,
        clearFilter,
        getExercises,
        clearExercises
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
