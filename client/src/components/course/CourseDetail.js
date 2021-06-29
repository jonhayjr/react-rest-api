import {useEffect, useState, useRef} from 'react';
import ReactMarkdown from 'react-markdown';
import { NavLink, useHistory} from 'react-router-dom';


const CourseDetail = (props) => {
       //Creates state
       const [course, setCourse] = useState([]);
       const [userFirstName, setUserFirstName] = useState('');
       const [userLastName, setUserLastName] = useState('');
       const [isLoading, setIsLoading] = useState(true);
    
       //Stores previous course id
       const previousId = useRef(props.match.params.id);

        //Context Variable
        const {context} = props;

        //History variable
        const history = useHistory();

        //Get Authenticated User
        const authUser = context.authenticatedUser;
        //Get User Password
        const password = context.unhashedPassword;
        //Get Authenticated User ID
        const authUserId = authUser ? authUser.id : null;
   
       
       //Gets data on page render
       useEffect(() => {
        //Get current id from url parameters
        const id = props.match.params.id;


        //If previous id doesn't equal the current id, new data is fetched
        if (previousId !== id) {
            
        //Set isLoading to true
        setIsLoading(true);
        //Call getCourse function from Context
          context.data.getCourse(id)
          .then(res => {
            //If response is not defined, store in state.  In all other circumstances, send to notfound route
            if (res !== undefined) {
                //Store course in state
                setCourse(res);

                //Store course user firstName
                setUserFirstName(res.User.firstName);
    
                //Store course user lastName
                setUserLastName(res.User.lastName);
                
                //Set isLoading to false
                setIsLoading(false);
            } else {
                history.push('/notfound')
            }
         })
         .catch(err => {
            console.log(err);
            history.push('/error');
         })
        }
      
       }, [props.match.params.id, history, context.data])

       //Handles course deletion
       const deleteCourse = (e) => {
           //Prevent default
            e.preventDefault();
            context.data.deleteCourse(course.id, authUser.emailAddress, password)
            .then( errors => {
               history.push('/');
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
                            <NavLink className="button" onClick={deleteCourse} to='/' >Delete Course</NavLink>
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
