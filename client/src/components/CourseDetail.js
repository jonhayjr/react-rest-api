import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink, useHistory, Redirect } from 'react-router-dom';

//Import axios 
import axios from 'axios';

const CourseDetail = (props) => {
       //Create State
       const [course, setCourse] = useState([]);
       const [userFirstName, setUserFirstName] = useState('');
       const [userLastName, setUserLastName] = useState('');
       const [errors, setErrors] = useState([]);
       const [isLoading, setIsLoading] = useState(true);

        //Context Variable
        const {context} = props;

        const history = useHistory();

        //Get Authenticated User
        const authUser = context.authenticatedUser;
        //Get User Password
        const password = context.unhashedPassword;
        //Get Authenticated User ID
        const authUserId = authUser ? authUser.id : null;
   

       //Function to grab API data
       const getCourse = (id) => {
        //Set isLoading to true
        setIsLoading(true);
       //Gets data from courses api
         axios.get(`http://localhost:5000/api/courses/${id}`)
         .then(res => {
           //Store course in state
           setCourse(res.data);

           //Store course user firstName
           setUserFirstName(res.data.User.firstName);

            //Store course user lastName
            setUserLastName(res.data.User.lastName);
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

       //Handles course deletion
       const deleteCourse = () => {
            
            context.data.deleteCourse(course.id, authUser.emailAddress, password)
            .then( errors => {
            if (errors.length) {
                setErrors({errors})
            } else {
                history.push('/');
            }
            })
            .catch((err) => {
            console.log(err);
            history.push('/error');
            });

       }

     
    return (
        <div className="wrap">
            <h2>Course Detail</h2>
            {
                isLoading
                ? <p>Loading...</p>
                :
                (
                <form>
                    <div className="wrap">
                    {   authUser && authUserId === course.userId 
                        ?
                        <>
                            <NavLink className="button" to={`/courses/${course.id}/update`}>Update Course</NavLink>
                            <a className="button" onClick={deleteCourse} href='/' >Delete Course</a>
                        </>
                        : ''
                    }
                        <NavLink className="button button-secondary" to="/">Return to List</NavLink>
                    </div>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                    
                            <p>By {userFirstName} {userLastName}</p>
    
                            
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                                </ul>
                        </div>
                    </div>
                </form> )
            }
                    
        </div>
    )
}

export default CourseDetail
