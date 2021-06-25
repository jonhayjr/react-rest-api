import './App.css';

import { Switch, Route, BrowserRouter} from 'react-router-dom';

//Import components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

const App = () => {


  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Courses}/>
            <Route exact path="/Courses" component={Courses}/>
            <Route path="/Courses/:id" component={CourseDetail}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
