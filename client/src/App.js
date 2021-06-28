import { Switch, Route, BrowserRouter} from 'react-router-dom';

//Imports components
import Header from './components/Header';
import Courses from './components/course/Courses';
import CourseDetail from './components/course/CourseDetail';
import UpdateCourse from './components/course/UpdateCourse';
import CreateCourse from './components/course/CreateCourse'
import UserSignUp from './components/user/UserSignUp';
import UserSignIn from './components/user/UserSignIn';
import UserSignOut from './components/user/UserSignOut';
import Forbidden from './components/error/Forbidden';
import NotFound from './components/error/NotFound';
import UnhandledError from './components/error/UnhandledError';

//Imports withContext function from Context
import {withContext} from './Context';

//Imports private route script
import PrivateRoute from './PrivateRoute';

//Create withContext components
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
            <PrivateRoute path="/courses/create" component={CreateCourseWithContext}/>
            <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext}/>
            <Route path="/courses/:id" component={CourseDetailWithContext}/>
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
            <Route path="/notfound" component={NotFound}/>
            <Route path="/forbidden" component={Forbidden}/>
            <Route path="/error" component={UnhandledError}/>
            <Route component={NotFound}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
