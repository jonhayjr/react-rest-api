import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //If authorization is required, encodes credentials and adds to headers.
    if (requiresAuth) {    
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //Function that gets user from API using GET method
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  //Function that creates user using API POST method
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }


  //Function that gets courses from API using GET method
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null, false);

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

   //Function that gets course from API using GET method
   async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null, false);

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 404) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }


  //Function that creates course using API POST method
  async createCourse(course, emailAddress, password) {
    
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //Function that updates course using API PUT method
  async updateCourse(courseId, course, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'PUT', course, true, { emailAddress, password });
    
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

//Function that deletes course using API DELETE method
async deleteCourse(courseId, emailAddress, password) {
  const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, { emailAddress, password });
  if (response.status === 204) {
    return [];
  }
  else if (response.status === 400) {
    return response.json().then(data => {
      return data.errors;
    });
  }
  else {
    throw new Error();
  }
}

}
