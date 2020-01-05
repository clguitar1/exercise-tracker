import React, { useContext } from 'react';
import './ExerciseItem.css';
import PropTypes from 'prop-types';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import ExerciseContext from '../../context/exercise/exerciseContext';

// destructure exercise from exercises since each one is given the prop name 'exercise' when they are created in ExerciseForm.js with onSubmit -> addExercise(exercise)
const ExerciseItem = ({ exercise }) => {
  const exerciseContext = useContext(ExerciseContext);
  const { deleteExercise, setCurrent, clearCurrent } = exerciseContext;

  const { id, name, sets, reps, duration } = exercise;

  const onDelete = () => {
    deleteExercise(id);
    clearCurrent();
  };

  return (
    <div className='ExerciseItem mb-4 float-right'>
      <Card style={{ width: '18rem' }}>
        <CardBody>
          <CardTitle>{name.charAt(0).toUpperCase() + name.slice(1)}</CardTitle>
        </CardBody>
        <ListGroup>
          <ListGroupItem>
            Sets: <Badge pill>{sets}</Badge>
          </ListGroupItem>
          <ListGroupItem>
            Reps: <Badge pill>{reps}</Badge>
          </ListGroupItem>
          <ListGroupItem>
            Duration: <Badge pill>{duration}</Badge>
          </ListGroupItem>
        </ListGroup>
        <CardBody>
          <ButtonGroup>
            <Button color='dark' onClick={() => setCurrent(exercise)}>
              Edit
            </Button>
            <Button color='danger' onClick={onDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </div>
  );
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired
};

export default ExerciseItem;
