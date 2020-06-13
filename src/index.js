import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import store, { history } from 'src/store/store';
import paths from 'src/constants/paths';

import Base from 'src/layouts/base/Base';
import NonAuth from 'src/layouts/nonAuth/NonAuth';

import Register from 'src/pages/register/Register';
import Login from 'src/pages/login/Login';
import Classroom from 'src/pages/classroom/Classroom';
import EditAuditory from 'src/pages/editClassroom/EditClassroom';
import Classrooms from 'src/pages/classrooms/Classrooms';
import Schedule from 'src/pages/schedule/Schedule';
import Event from 'src/pages/event/Event';
import ScheduleEditor from 'src/pages/scheduleEditor/ScheduleEditor';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route
          exact
          path={paths.login}
          render={props => (
            <NonAuth>
              <Login {...props} />
            </NonAuth>
          )}
        />
        <Route
          exact
          path={paths.register}
          render={props => (
            <NonAuth>
              <Register {...props} />
            </NonAuth>
          )}
        />
        <Route
          exact
          path={paths.classrooms}
          render={props => (
            <Base>
              <Classrooms {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.classrooms}
          render={props => (
            <Base>
              <Classrooms {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.classroom}
          render={props => (
            <Base>
              <Classroom {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.editClassroom}
          render={props => (
            <Base>
              <EditAuditory {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.schedule}
          render={props => (
            <Base>
              <Schedule {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.event}
          render={props => (
            <Base>
              <Event {...props} />
            </Base>
          )}
        />
        <Route
          exact
          path={paths.scheduleEditor}
          render={props => (
            <Base>
              <ScheduleEditor {...props} />
            </Base>
          )}
        />
        <Redirect to={paths.classrooms} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
