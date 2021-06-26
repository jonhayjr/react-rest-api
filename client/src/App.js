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

import {withContext,Context} from './Context';
import PrivateRoute from './PrivateRoute';

const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

const App = () => {
  return (
    <div>
      <Header context={Context}/>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Courses}/>
            <Route exact path="/courses" component={Courses}/>
            <Route exact path="/courses/create" component={CreateCourseWithContext}/>
            <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
            <Route exact path="/courses/:id/update" component={UpdateCourse}/>
            <Route path="/signin" component={UserSignInWithContext} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOutWithContext} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
