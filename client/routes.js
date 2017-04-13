import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
// import HomePage from './components/HomePage/index';
// import AboutPage from './components/aboutPage/index';
import SignupPage from './components/SignupPage/index';
import LoginPage from './components/LoginPage/index';
// import DashboardPage from './components/dashboard/dashboard';
// import requireAuth from './components/Util/RequireAuth';

export default (
  <Route path="/" component={App}>
    {/* <Route path="/app/login" component={LoginPage} />*/}
    <Route path="/signup" component={SignupPage} />
   <Route path="/login" component={LoginPage} />
  </Route>
);
