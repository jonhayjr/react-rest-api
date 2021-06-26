import {useContext} from 'react';
import Context from '../Context'


const Header = () => {
    const context = useContext(Context.Context);
    const authUser = context.authenticatedUser;
  
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                {
                    authUser
                    ? <nav>
                        <ul className="header--signedout">
                            <li><span>Welcome, {authUser.firstName}!</span></li>
                            <li><a href="/signout">Sign Out</a></li>
                        </ul>
                      </nav>
                     
                    :
                <nav>
                    <ul className="header--signedout">
                        <li><a href="/signup">Sign Up</a></li>
                        <li><a href="/signin">Sign In</a></li>
                    </ul>
                </nav>
                }
            </div>
        </header>
    )
}

export default Header
