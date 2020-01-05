import React from 'react';
import Exercises from '../exercises/Exercises';
import ExerciseForm from '../exercises/ExerciseForm';
import ExerciseFilter from '../exercises/ExerciseFilter';

const Home = () => {
  return (
    <div className='Home'>
      <div>
        <ExerciseForm />
      </div>
      <div>
        <ExerciseFilter />
        <Exercises />
      </div>
    </div>
  );
};

export default Home;
