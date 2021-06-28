import { Switch, Route, BrowserRouter} from 'react-router-dom';

//Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse'
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';

import {withContext} from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => {
  return (
    <div>
      <HeaderWithContext />
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Courses}/>
            <Route exact path="/courses" component={Courses}/>
            <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext}/>
            <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext}/>
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/forbidden" component={Forbidden}/>
            <Route path="/notfound" component={NotFound}/>
            <Route path="/error" component={UnhandledError}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
