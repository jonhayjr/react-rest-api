const Header = (props) => {
    //Get context from props
    const {context} = props;
    //Get Authenticated user from context
    const authUser = context.authenticatedUser;
  
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="/">Courses</a></h1>
                {/*If there is an authenticated user, a welcome message and sign out button appear.  In all other scenarios, sign up and sign out buttons appear */}
                {   
                    authUser
                    ? <nav>
                        <ul className="header--signedout">
                            <li><span>Welcome, {authUser.firstName} {authUser.lastName}!</span></li>
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
