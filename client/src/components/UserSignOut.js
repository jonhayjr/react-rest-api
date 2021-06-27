import {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const UserSignOut = ({context}) => {
    const history = useHistory();

    //Triggered on page render
    useEffect(() => {
        //Sign Out User
        context.actions.signOut()
        //Change to index url
        history.push('/');
    })

    return (
        null
    )
}

export default UserSignOut
