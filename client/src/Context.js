import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

export const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
    unhashedPassword: Cookies.getJSON('unhashedPassword') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, unhashedPassword } = this.state;
    const value = {
      authenticatedUser,
      unhashedPassword,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //Function that signs in user
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    //If user sign in is successful, store authenticatedUser and unhashedPassword in state
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
          unhashedPassword: password
        };
      });
      //Stores authenticatedUser and unhashedPassword in cookies.  Cookies expire in 1 day.
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
      Cookies.set('unhashedPassword', JSON.stringify(password), {expires: 1});
    }
    return user;
  }

  //Function that signs out user
  signOut = () => {
    //Removes authenticatedUser and unhashedPassword from state.  
    this.setState({ authenticatedUser: null, unhashedPassword: null });
    //Removes cookies
    Cookies.remove('authenticatedUser');
    Cookies.remove('unhashedPassword');
  }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

 export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

const ContextObject = {
  withContext,
  Context
}
export default ContextObject
