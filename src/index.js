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
              <Route path={paths.classrooms} component={Classrooms} />
              <Route path={paths.classroom} component={Classroom} />
              <Route path={paths.editClassroom} component={EditAuditory} />
              <Route path={paths.schedule} component={Schedule} />
              <Route path={paths.event} component={Event} />
              <Route path={paths.scheduleEditor} component={ScheduleEditor} />
              <Redirect to={paths.classrooms} />
            </Base>
          )}
        />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
