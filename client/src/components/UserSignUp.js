import {useState} from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import axios from 'axios';

const UserSignUp = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [errors, setErrors] = useState([]);
  
    const history = useHistory();

    //Function to handle change to input
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

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
    e.preventDefault();
      history.push('/');
    }

//Function to handle submitted form
  const handleSubmit = (e) => {
    e.preventDefault();

    const {context} = props;
    const { from } = props.location.state || { from: { pathname: '/' } };

    //Creates user object
    const user = {firstName, lastName, emailAddress, password};
    context.data.createUser(user)
    .then( errors => {
      if (errors.length || password !== confirmedPassword) {
        //Checks to see if password matches confirmed password and throws error is they don't
        if (password !== confirmedPassword) {
          errors.push('Both passwords must match.')
        }
        setErrors(errors);
      } else {
        //if sign up is successful, user is logged in
        context.actions.signIn(emailAddress, password)
          .then(() => {
            history.push('/');    
          });
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
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
            <ul className="validation-errors">
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
        <form onSubmit={handleSubmit}>
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
