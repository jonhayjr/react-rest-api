
const Header = () => {
    return (
        <header>
            <div class="wrap header--flex">
                <h1 class="header--logo"><a href="/">Courses</a></h1>
                <nav>
                    <ul class="header--signedout">
                        <li><a href="/signup">Sign Up</a></li>
                        <li><a href="/signin">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header
