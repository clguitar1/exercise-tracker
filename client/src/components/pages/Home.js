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
