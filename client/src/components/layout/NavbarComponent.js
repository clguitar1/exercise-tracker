import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavbarComponent.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import AuthContext from '../../context/auth/authContext';
import ExerciseContext from '../../context/exercise/exerciseContext';

const NavbarComponent = ({ title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authContext = useContext(AuthContext);
  const exerciseContext = useContext(ExerciseContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearExercises } = exerciseContext;

  const onLogout = () => {
    logout();
    clearExercises();
  };

  const guestLinks = (
    <Fragment>
      <NavItem>
        <NavLink tag={Link} to='/register'>
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to='/login'>
          Login
        </NavLink>
      </NavItem>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <NavItem>
        <NavLink tag={Link} to='#'>
          Hello {user && user.name}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={onLogout} tag={Link} to='#'>
          <i className='fas fa-sign-out-alt'></i>
          <span>Logout</span>
        </NavLink>
      </NavItem>
    </Fragment>
  );

  return (
    <div className='NavbarComponent'>
      <Navbar color='primary' dark expand='md'>
        <NavbarBrand href='/'>{title}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

NavbarComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

NavbarComponent.defaultProps = {
  title: 'Exercise Tracker',
  icon: 'fas fa-id-card-alt'
};

export default NavbarComponent;
