import React from 'react';
import ReactDOM from 'react-dom';

import { Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store, { history } from './store/store';

import Base from './layouts/base/Base';
import NonAuth from './layouts/nonAuth/NonAuth';

import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Classroom from './pages/classroom/Classroom';
import EditAuditory from './pages/editClassroom/EditClassroom';
import Classrooms from './pages/classrooms/Classrooms';
import Schedule from './pages/schedule/Schedule';

import paths from './constants/paths';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route
          path={paths.login}
          render={() => (
            <NonAuth>
              <Route path={paths.login} component={Login} />
            </NonAuth>
          )}
        />

        <Route
          path={paths.register}
          render={() => (
            <NonAuth>
              <Route path={paths.register} component={Register} />
            </NonAuth>
          )}
        />

        <Route
          path={paths.root}
          render={() => (
            <Base>
              <Route exact path={paths.root} component={Classrooms} />
              <Route path={paths.classrooms} component={Classrooms} />
              <Route path={paths.classroom} component={Classroom} />
              <Route path={paths.editClassroom} component={EditAuditory} />
              <Route path={paths.schedule} component={Schedule} />
            </Base>
          )}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
