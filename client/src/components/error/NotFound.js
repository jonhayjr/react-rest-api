import { NavLink} from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="wrap">
            <h2>Not Found</h2>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <NavLink to="/">Go Home</NavLink>
        </div>
    )
}

export default NotFound
