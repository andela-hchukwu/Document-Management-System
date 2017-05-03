import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/HomePage/index';
import AboutPage from './components/AboutPage/index';
import SignupPage from './components/SignupPage/index';
import LoginPage from './components/LoginPage/index';
import DocumentPage from './components/Documents/index';
import DashboardPage from './components/DashBoard/index';
import ManangeRolePage from './components/AdminComponent/manageRolePage';
import HandleUsersPage from './components/AdminComponent/handleUsersPage';
import ProfilePage from './components/ProfilePage/index';
import requireAuth from './components/Util/requireAuthentication';
import requireAdminAuth from './components/Util/requireAdminAuthentication';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={requireAuth(DashboardPage)} />
    <Route path="signup" component={SignupPage} />
    <Route path="login" component={LoginPage} />
    <Route path="thedocuments" component={requireAuth(DocumentPage)} />
    <Route path="profilepages" component={requireAuth(ProfilePage)} />
    <Route path="about" component={AboutPage} />
    <Route path="admin/manageroles"
      component={requireAdminAuth(ManangeRolePage)} />
    <Route path="admin/handleusers"
      component={requireAdminAuth(HandleUsersPage)} />
  </Route>
);
