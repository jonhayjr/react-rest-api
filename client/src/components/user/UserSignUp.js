import {useState} from 'react';
import { useHistory, NavLink } from 'react-router-dom';

const UserSignUp = (props) => {
    //Create state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [errors, setErrors] = useState([]);

    //Create history variable
    const history = useHistory();

    //Function to handle change to input
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    //Checks to see which input field was changed and adds to state
    if (name === 'firstName') {
        setFirstName(value);
    } else if (name === 'lastName'){
        setLastName(value);
    } else if (name === 'emailAddress') {
        setEmailAddress(value);
    } else if (name === 'password') {
        setPassword(value);
    } else if (name === 'confirmPassword') {
        setConfirmedPassword(value);
    }
  }

  //Function to handle form cancel
  const handleCancel = (e) => {
    //Prevent Default form behaviour
      e.preventDefault();
      
    //Redirects to index route
      history.push('/');
    }

  //Handles form validation and only submits form is passwords match.
  const formValidation = (e) => {
    //Prevent default form behavior
      e.preventDefault();
      //If both password don't match, add error message to state
      if (password !== confirmedPassword) {
        setErrors(['Both password must match.'])
      //In all other scenarios, run submit function
      } else {
        handleSubmit(e);
      }
  }
 
//Function to handle submitted form
  const handleSubmit = (e) => {
    //Prevents default behavior on form submit
    e.preventDefault();

    //Gets context from props
    const {context} = props;

    //Sets from object that is used for redirect after sign in
    const { from } = props.location.state || { from: { pathname: '/' } };

    //Creates user object
    const user = {firstName, lastName, emailAddress, password};


      //Calls createUser function from context
      context.data.createUser(user)
      .then( res => {
        //If status is 201, sign user in.
        if (res.status === 201) {   
          //if sign up is successful, user is logged in
          context.actions.signIn(emailAddress, password)
            .then(() => {
              history.push(from);    
            });
        //If status is 400, set errors
        } else if (res.status === 400 ) { 
          res.json().then(errors => {
            setErrors(errors.errors);
          })
        //All other errors re-route to error page
        } else {
          history.push('/error');
        }
      })
      .catch((err) => {
        history.push('/error');
      });
    }
  

  //Handle errors display
  const ErrorsDisplay = ({ errors}) => {
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
        <div className="form--centered">
        <h2>Sign Up</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={formValidation}>
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" value={firstName} onChange={(e) => {handleChange(e)}}/>
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" value={lastName} onChange={(e) => {handleChange(e)}}/>
            <label htmlFor="emailAddress">Email Address</label>
            <input id="emailAddress" name="emailAddress" type="email" value={emailAddress} onChange={(e) => {handleChange(e)}}/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={(e) => {handleChange(e)}}/>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={confirmedPassword} onChange={(e) => {handleChange(e)}}/>
            <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
    </div>
    )
}

export default UserSignUp
