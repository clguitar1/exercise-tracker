import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const LoginForm = props => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    // redirect to home page after registration
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid credentials') {
      setAlert(error, 'danger');
      // reset error state to null
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  const clearAll = () => {};

  return (
    <div className='LoginForm'>
      <Form onSubmit={onSubmit} className='ExerciseForm p-4'>
        <h2>Log In</h2>
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
        <Button color='primary' type='submit' block>
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
