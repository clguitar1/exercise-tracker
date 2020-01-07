import React, { useState, useContext, useEffect } from 'react';
import './ExerciseForm.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import ExerciseContext from '../../context/exercise/exerciseContext';

const ExerciseForm = () => {
  const exerciseContext = useContext(ExerciseContext);

  const {
    addExercise,
    clearCurrent,
    current,
    updateExercise
  } = exerciseContext;

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

  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    duration: ''
  });

  const { name, sets, reps, duration } = exercise;

  const onChange = e =>
    setExercise({ ...exercise, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addExercise(exercise);
    } else {
      updateExercise(exercise);
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
