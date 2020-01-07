import React, { useContext, useEffect } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';
import AuthContext from '../../context/auth/authContext';
import ExerciseItem from './ExerciseItem';
import Spinner from '../layout/Spinner';
import { Container, Row } from 'reactstrap';

const Exercises = props => {
  const exerciseContext = useContext(ExerciseContext);
  const authContext = useContext(AuthContext);

  const { exercises, filtered, getExercises } = exerciseContext;
  const { loading } = authContext;

  // get all the exercises and put them in state
  useEffect(() => {
    getExercises();
    // eslint-disable-next-line
  }, []);

  if (exercises !== null && exercises.length === 0 && !loading) {
    return <h4>Please add an exercise...</h4>;
  }

  // if filtered is populated, map through it and show the ExerciseItem. if filtered is not populated, map through all the exercises and show them all
  return (
    <Container className='Exercises'>
      {exercises !== null && !loading ? (
        <Row>
          {filtered !== null
            ? filtered.map(exercise => (
                <ExerciseItem key={exercise._id} exercise={exercise} />
              ))
            : exercises.map(exercise => (
                <ExerciseItem key={exercise._id} exercise={exercise} />
              ))}
        </Row>
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

export default Exercises;
