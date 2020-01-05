import React, { Fragment, useContext } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';
import ExerciseItem from './ExerciseItem';
import { Container, Row, Col } from 'reactstrap';

const Exercises = props => {
  const exerciseContext = useContext(ExerciseContext);

  const { exercises, filtered } = exerciseContext;

  if (!exercises.length === 0) {
    return <h4>Please add an exercise</h4>;
  }

  // if filtered is populated, map through it and show the ExerciseItem. if filtered is not populated, map through all the exercises and show them all
  return (
    <Container className='Exercises'>
      <Row>
        {filtered !== null
          ? filtered.map(exercise => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))
          : exercises.map(exercise => (
              <ExerciseItem key={exercise.id} exercise={exercise} />
            ))}
      </Row>
    </Container>
  );
};

export default Exercises;
