import React, { useState, useContext, useEffect } from 'react';
import './ExerciseForm.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ExerciseContext from '../../context/exercise/exerciseContext';
import AlertContext from '../../context/alert/alertContext';

const ExerciseForm = () => {
  const alertContext = useContext(AlertContext);
  const exerciseContext = useContext(ExerciseContext);

  const { setAlert } = alertContext;

  const {
    addExercise,
    clearCurrent,
    current,
    updateExercise
  } = exerciseContext;

  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    duration: ''
  });

  useEffect(() => {
    if (current !== null) {
      setExercise(current);
    } else {
      setExercise({
        name: '',
        sets: '',
        reps: '',
        duration: ''
      });
    }
  }, [exerciseContext, current]);

  const { name, sets, reps, duration } = exercise;

  // set state with input data
  const onChange = e =>
    setExercise({ ...exercise, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // if current is null, run addExercise
    if (current === null) {
      addExercise(exercise);
      setAlert('Exercise Added!', 'success');
    } else {
      updateExercise(exercise);
      setAlert('Exercise Updated!', 'success');
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <Form onSubmit={onSubmit} className='ExerciseForm p-4'>
      <h2>{current ? 'Edit Exercise' : 'Add Exercise'}</h2>
      <FormGroup>
        <Label for='name'>Name</Label>
        <Input
          type='text'
          name='name'
          value={name}
          placeholder='name'
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='sets'>Sets</Label>
        <Input
          type='text'
          name='sets'
          value={sets}
          placeholder='sets'
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='reps'>Reps</Label>
        <Input
          type='text'
          name='reps'
          value={reps}
          placeholder='reps'
          onChange={onChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for='duration'>Duration</Label>
        <Input
          type='text'
          name='duration'
          value={duration}
          placeholder='duration'
          onChange={onChange}
        />
      </FormGroup>
      <Button color='primary' type='submit' block>
        {current ? 'Update Exercise' : 'Add Exercise'}
      </Button>
      {current && (
        <div>
          <Button className='mt-2' onClick={clearAll} block>
            Clear
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ExerciseForm;
