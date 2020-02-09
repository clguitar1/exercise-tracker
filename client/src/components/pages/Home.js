import React, { useContext, useEffect } from 'react';
import Exercises from '../exercises/Exercises';
import ExerciseForm from '../exercises/ExerciseForm';
import ExerciseFilter from '../exercises/ExerciseFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='Home row'>
      <div className='Home-exerciseform col-md-6 mt-4'>
        <ExerciseForm />
      </div>
      <div className='Home-exercisefilter-exercises col-md-6'>
        <ExerciseFilter />
        <Exercises />
      </div>
    </div>
  );
};

export default Home;
