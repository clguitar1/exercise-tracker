import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const RegisterForm = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    // redirect to home page after registration
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      // reset error state to null
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      // setAlert(msg, type)
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (password.length < 6 || password2.length < 6) {
      setAlert('Please use a password with at least 6 characters', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  const clearAll = () => {};

  return (
    <div className='RegisterForm'>
      <Form onSubmit={onSubmit} className='ExerciseForm p-4'>
        <h2>Register</h2>
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
          <Label for='sets'>Email</Label>
          <Input
            type='email'
            name='email'
            value={email}
            placeholder='email'
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='reps'>Password</Label>
          <Input
            type='password'
            name='password'
            value={password}
            placeholder='password'
            onChange={onChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='duration'>Verify Password</Label>
          <Input
            type='password'
            name='password2'
            value={password2}
            placeholder='password'
            onChange={onChange}
          />
        </FormGroup>
        <Button color='primary' type='submit' block>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
