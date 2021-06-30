import {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Courses = (props) => {
    //Create State
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Get Context
    const {context} = props;

    //Create history variable 
    const history = useHistory();

    //Gets course data on page render
    useEffect(() => {

     //Set isLoading state to true
     setIsLoading(true);

     //Calls getCourses function from context
     context.data.getCourses()
     .then(res => {     
       //If response status is 200, store data in state
       if (res.status === 200) {
         res.json().then(data => {
            setCourses(data);
         })
          //Set isLoading to false
          setIsLoading(false);
       } else {
         //In all other scenarios, throw error
         history.push('/error');
       }
     })
     .catch((err) => {
       history.push('/error');
     })
    
    }, [context.data, history])

    //Create courses links
    const courseLinks = courses 
          ? courses.map(course => 
            (<NavLink className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
            </NavLink>))
          : '';


    return (
        <div className="wrap main--grid">
        {isLoading
        ? <p className="loading-indicator">Loading...</p>
        :
        <>
          {courseLinks}
          <NavLink className="course--module course--add--module" to="/courses/create">
              <span className="course--add--title">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                  viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                  New Course
                </span>
          </NavLink>
        </>
        }
        </div>
    )
}

export default Courses
