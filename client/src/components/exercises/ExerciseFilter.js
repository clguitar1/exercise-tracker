import React, { useContext, useRef, useEffect } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';

const ExerciseFilter = () => {
  const exerciseContext = useContext(ExerciseContext);
  const text = useRef('');
  const { filterExercises, clearFilter, filtered } = exerciseContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterExercises(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className='pt-4'>
      <div className='form-group'>
        <input
          className='form-control'
          ref={text}
          type='text'
          placeholder='Filter Exercises...'
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default ExerciseFilter;
