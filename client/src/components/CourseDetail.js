import {useEffect, useState} from 'react';

//Import axios 
import axios from 'axios';

const CourseDetail = (props) => {
       //Create State
       const [course, setCourse] = useState([]);
       const [isLoading, setIsLoading] = useState(true);
   

       //Function to grab API data
       const getCourse = (id) => {
        //Set isLoading to true
        setIsLoading(true);
       //Gets data from courses api
         axios.get(`http://localhost:5000/api/courses/${id}`)
         .then(res => {
           //Store course in state
           setCourse(res.data);
        })
        .finally(() => {
            //Set isLoading to False
            setIsLoading(false);
        })
       }
       
       //Gets data on page render
       useEffect(() => {
        //Get course data based on id
         getCourse(props.match.params.id);
       }, [props.match.params.id])

       //Parse description element and create separate paragraphs
       const description = course.description 
                ? course.description.split(/\r?\n/)
                    .filter(desc => desc !== '')
                    .map((desc, index) => <p key={index}>{desc}</p>)
                : '';
       
       //Parse materialsNeeded and created separate list items
       const materialsNeeded =   course.materialsNeeded
       ? course.materialsNeeded.split(/\r?\n/)
           .filter(material => material !== '')
           .map((material, index) => <li key={index}>{material.replaceAll('* ', '')}</li>)
       : '';

    return (
        <div className="wrap">
            <h2>Course Detail</h2>
            <form>
            {
                isLoading
                ? <p>Loading...</p>
                :
                (<div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{course.title}</h4>
                        <p>By {course.User.firstName} {course.User.lastName}</p>
                        { 
                            description
                        }
                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {
                                    materialsNeeded
                                }
                            </ul>
                        </div>
                </div>)
            }
                
            </form>     
        </div>
    )
}

export default CourseDetail
