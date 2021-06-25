import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

//Import axios 
import axios from 'axios';

const Courses = () => {
    //Create State
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Function to grab API data
    const getCourses = () => {
    //Set isLoading state to true
    setIsLoading(true);

    //Gets data from courses api
      axios.get('http://localhost:5000/api/courses')
      .then(res => {
        //Stores data in state
        setCourses(res.data);
    })
      .finally(() => {
        //Set isLoading to false
        setIsLoading(false);
      })
    }
    
    //Gets course data on page render
    useEffect(() => {
      getCourses();
    }, [])

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
        ? (<p>Loading...</p>)
        :
        <>
          {courseLinks}
          <NavLink className="course--module course--add--module" to="/course/create">
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
