import {useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';

//Import axios 
import axios from 'axios';

const UpdateCourse = (props) => {
    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();


     //Context Variable
     const {context} = props;

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

           //Set Title State
           setTitle(res.data.title);

           //Set Description State
           setDescription(res.data.description);

           //Set Estimated Time State   
           setEstimatedTime(res.data.estimatedTime);

           //Set Materials Needed State   
           setMaterialsNeeded(res.data.materialsNeeded);
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

    //Function that is used to cancel update
    const cancelUpdate = (e) => {
        //prevents default form behavior
        e.preventDefault();
        //redirects to course detail
        history.push(`/courses/${course.id}`);
    }

    //Handle change input
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
        e.preventDefault();
        const updatedCourse = {title, description, estimatedTime, materialsNeeded};

        context.data.updateCourse(course.id, updatedCourse, authUser.emailAddress, password)
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
                <h2>Update Course</h2>
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
