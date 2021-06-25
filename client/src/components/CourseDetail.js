import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';

//Import axios 
import axios from 'axios';

const CourseDetail = (props) => {
       //Create State
       const [course, setCourse] = useState([]);
       const [user, setUser] = useState([]);
       const [description, setDescription] = useState([]);

       //Function to grab API data
       const getCourse = (id) => {
       //Gets data from courses api
         axios.get(`http://localhost:5000/api/courses/${id}`)
         .then(res => {
           //Store course in state
           setCourse(res.data);
           //Store user in state
           setUser(res.data.User);

        //Create description paragraphs
        let description = res.data.description.split(/\r?\n/)
       .filter(desc => desc !== '')
           setDescription(description)
       });
       }
       
       //Gets data on page render
       useEffect(() => {
        //Get id from url parameter
        const id = props.match.params.id


        //Get course data based on id
         getCourse(id);
       }, [])


    return (
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>{user.firstName} {user.lastName}</p>
                        {
                        description.map(desc => <p>{desc}</p>)
                        }
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul>
                        </div>
                </div>
            </form>     
        </div>
    )
}

export default CourseDetail
