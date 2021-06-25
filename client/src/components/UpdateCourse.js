import {useEffect, useState} from 'react';

//Import axios 
import axios from 'axios';

const UpdateCourse = (props) => {
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Function to grab API data
    const getCourse = (id) => {
        //Set isLoading to true
        setIsLoading(true);
       //Gets data from courses api
         axios.get(`http://localhost:5000/api/courses/${id}`)
         .then(res => {
           //Store course in state
           setCourse(res.data);
        })
        .finally(() => {
            //Set isLoading to False
            setIsLoading(false);
        })
       }

    //Gets data on page render
    useEffect(() => {
        //Get course data based on id
        getCourse(props.match.params.id);
    }, [props.match.params.id])

    return (
             <div className="wrap">
                <h2>Update Course</h2>
                {
                isLoading
                ? <p>Loading...</p>
                :
                (<form>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title}/>

                            <p>By {course.User.firstName} {course.User.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription">{course.description}</textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime}/>

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded">{course.materialsNeeded}</textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>)
                }
            </div>
    )
}

export default UpdateCourse
