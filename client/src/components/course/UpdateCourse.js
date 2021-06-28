import {useEffect, useState, useRef} from 'react';
import { useHistory} from 'react-router-dom';

//Import axios 
import axios from 'axios';

const UpdateCourse = (props) => {
    //Creates state
    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //Stores previous course id
    const previousId = useRef(props.match.params.id);

    //Creates history variable
    const history = useHistory();

     //Context Variable
     const {context} = props;

    //Get Authenticated User
    const authUser = context.authenticatedUser;
    //Get User Password
    const password = context.unhashedPassword;
    //Get Authenticated User ID
    const authUserId = authUser ? authUser.id : null;


    //Gets data on page render
    useEffect(() => {
        //Get current id from params
        const id = props.match.params.id;
        if (previousId !== id) {
        //Set isLoading to true
         setIsLoading(true);
        //Gets data from courses api
          axios.get(`http://localhost:5000/api/courses/${id}`)
          .then(res => {
            //Store course in state
            setCourse(res.data);
 
            //Set Title State
            setTitle(res.data.title);
 
            //Set Description State
            setDescription(res.data.description);
 
            //Set Estimated Time State   
            setEstimatedTime(res.data.estimatedTime);
 
            //Set Materials Needed State   
            setMaterialsNeeded(res.data.materialsNeeded);
 
            //Set isLoading to False
            setIsLoading(false);
         })
         .catch(err => {
             //If error status is 404, redirect to /notfound route.  Redirect all errors to error page.
             if (err.response.status === 404) {
                 history.push('/notfound')
             } else {
                 history.push('/error')
             }
         })
        }
    }, [props.match.params.id, history])

    //Function that is used to cancel update
    const cancelUpdate = (e) => {
        //redirects to course detail
        history.push(`/courses/${course.id}`);
    }

    //Handle change to input
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        //Updates state depending on input field that is updated
        if (name === 'courseTitle') {
            setTitle(value);
        } else if (name === 'courseDescription') {
            setDescription(value)
        } else if (name === 'estimatedTime') {
            setEstimatedTime(value);
        } else if (name === 'materialsNeeded') {
            setMaterialsNeeded(value)
        }
      }

       //Handles course update
       const updateCourse = (e) => {
        //Prevents default form behaviour
        e.preventDefault();

        //Stores update course data in object
        const updatedCourse = {title, description, estimatedTime, materialsNeeded};

        //Calls updateCourse function from Context
        context.data.updateCourse(course.id, updatedCourse, authUser.emailAddress, password)
        .then( errors => {
        if (errors.length) {
            setErrors(errors)
        //If authorized user doesn't match course user, redirects to /forbidden route
        } else if (authUserId !== course.userId) {
            history.push('/forbidden');
        } else {
            history.push('/');
        }
        })
        .catch((err) => {
        console.log(err);
        history.push('/error');
        });

   }

    //Handle errors display
  const ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;
  
    if (errors.length) {
      errorsDisplay = (
        <div className="validation--errors">
          <h3>Validation errors</h3>
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
      );
    }
  
    return errorsDisplay;
  }

    return (
             <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors} />
                {
                isLoading
                ? <p>Loading...</p>
                :
                (<form onSubmit={updateCourse}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => {handleChange(e)}}/>

                            <p>By {course.User.firstName} {course.User.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={description} onChange={handleChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={handleChange}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick={cancelUpdate}>Cancel</button>
                </form>)
                }
            </div>
    )
}

export default UpdateCourse
