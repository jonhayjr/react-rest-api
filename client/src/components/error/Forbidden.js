import { NavLink} from 'react-router-dom';

const Forbidden = () => {
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Oh oh! You can't access this page.</p>
            <NavLink to="/">Go Home</NavLink>
        </div>
    )
}

export default Forbidden
