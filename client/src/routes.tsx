import React from 'react';
import AuthForm from './AuthForm';
import RegistrationForm from './RegistrationForm';
import { Route } from 'react-router-dom';

const routes = [
  {
    path: '/login',
    element: <AuthForm />,
  },
  {
    path: '/register',
    element: <RegistrationForm />,
  },
  // Добавьте другие роуты по необходимости
];

export default routes;