import { Switch, Route, BrowserRouter} from 'react-router-dom';

//Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';

const App = () => {


  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Courses}/>
            <Route exact path="/courses" component={Courses}/>
            <Route exact path="/courses/:id" component={CourseDetail}/>
            <Route path="/courses/:id/update" component={UpdateCourse}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
