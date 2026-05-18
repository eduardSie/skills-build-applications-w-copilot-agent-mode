import React from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  const h = React.createElement;

  return h(
    BrowserRouter,
    null,
    h('div', { className: 'min-vh-100 app-shell' }, [
      h('nav', { className: 'navbar navbar-expand-lg app-nav shadow-sm', key: 'nav' },
        h('div', { className: 'container' }, [
          h('a', { className: 'navbar-brand fw-bold fs-4', href: '/' }, 'OctoFit Tracker'),
          h('div', { className: 'navbar-nav gap-1 flex-wrap', key: 'links' }, [
            h(NavLink, { className: 'nav-link nav-pill-link', to: '/activities', key: 'activities' }, 'Activities'),
            h(NavLink, { className: 'nav-link nav-pill-link', to: '/leaderboard', key: 'leaderboard' }, 'Leaderboard'),
            h(NavLink, { className: 'nav-link nav-pill-link', to: '/teams', key: 'teams' }, 'Teams'),
            h(NavLink, { className: 'nav-link nav-pill-link', to: '/users', key: 'users' }, 'Users'),
            h(NavLink, { className: 'nav-link nav-pill-link', to: '/workouts', key: 'workouts' }, 'Workouts'),
          ]),
        ])
      ),
      h('main', { className: 'py-3', key: 'main' },
        h(Routes, null, [
          h(Route, { path: '/', element: h(Navigate, { to: '/activities', replace: true }), key: 'home' }),
          h(Route, { path: '/activities', element: h(Activities), key: 'activities' }),
          h(Route, { path: '/leaderboard', element: h(Leaderboard), key: 'leaderboard' }),
          h(Route, { path: '/teams', element: h(Teams), key: 'teams' }),
          h(Route, { path: '/users', element: h(Users), key: 'users' }),
          h(Route, { path: '/workouts', element: h(Workouts), key: 'workouts' }),
        ])
      ),
    ])
  );
}

export default App;
