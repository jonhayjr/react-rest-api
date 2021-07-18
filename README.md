# React REST API App
This API will provides a way for users to interact with a school database that contains user and course information.  Users can create new courses, retrieve data on existing courses and update or delete existing course.  To make changes to the databases, users need to login with valid credentials.  Users can also request their account information or create a new account.

## Getting Started
1. Download or clone repository.
2. In the terminal, change the directory to the api folder using the command `cd api`.
3. In this folder, run `npm install` to install the necessary dependencies and then run the command `npm start` to start the app.
4. If needed, you can run the command `npm run seed` in this same folder to refresh the database content and populate with seed data.
5. Next, change the directory to the client folder using the command `cd client`.
6. In this folder, run `npm install` to install the necessary dependencies and then run the command `npm start` to start the app.
7. The React app will be open up in your browser with [`localhost:3000`](http://localhost:3000/).
8. Click [`here`](https://react-course-directory.netlify.app/) for a live preview.

## Customizations
1. Changed color theme to a medium dark red.
2. Changed font to Roboto.
3. Added validation on Sign Up to validation password and confirmed password fields and confirm that they match.
4. Added 'Go Home' link to error components so that user can easily get back to index route.