import {useState} from 'react';
import { useHistory, NavLink } from 'react-router-dom';

const CreateCourse = (props) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');
    const [errors, setErrors] = useState('');

    const history = useHistory();

    //Context Variable
    const {context} = props;


     //Get Authenticated User
    const authUser = context.authenticatedUser;
     //Get Authenticated User First Name
    const firstName = authUser ? authUser.firstName : '';
    //Get Authenticated User Last Name
    const lastName = authUser ? authUser.lastName : '';
    //Get Authenticated User ID
    const userId = authUser ? authUser.id : null;

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

     //Handle errors display
     const ErrorsDisplay = ({ errors }) => {
        let errorsDisplay = null;
      
        if (errors.length) {
          errorsDisplay = (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
              </div>
            </div>
          );
        }
      
        return errorsDisplay;
      }

    //Function to handle cancel
    const handleCancel = (e) => {
        //prevents default form behavior
        //redirects to index route
        history.push('/');
    }

  //Function to handle submitted form
  const handleSubmit = (e) => {
    e.preventDefault();
   
  }  
    return (
        <div className="wrap">
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" value={title} onChange={(e) => {handleChange(e)}}/>

                    <p>By {firstName} {lastName}</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription" value={description} onChange={(e) => {handleChange(e)}}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={(e) => {handleChange(e)}}/>

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" value={materialsNeeded} onChange={(e) => {handleChange(e)}}></textarea>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    </div>
    )
}

export default CreateCourse
