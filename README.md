# CS319-Project
## Please Follow these instructions to start the server on your OS.

- First, install `node` globally on your OS.
- Then, install `npm` globally on your OS.
- Then come to this project's `root dir`, and run `npm install`. This will install all required packages on your OS.

- Install `MongoDB` on your machiene and make a `Database` called `internship-system`. This should make the database ready on your system. (You can use MongoDB Atlas. It provides a GUI for modifying the database manually etc. https://www.mongodb.com/atlas/database)
- Then run `node server` to start the server locally and make it handle API requests. This starts the server at `localhost`.

- All Front End Pages should be in `.html` extensions.
- You can see the example page by clicking the `Student` page in the menu on the homepage.
- There is a complete API usage example at the url `localhost/student` also called (`Student`) page, after you have set up the enviroment and server is running with mongoDB ready.


- By making sure the above tests are correctly working, it is now a common belief that with the current state of the project and technologies being used, we can make the front-end, communicate with the back-end using the end points given, start the server, add/remove/change api end point logic from related files for now and modify the database.


## Important file notes and their content
- All new pages that will be accessed by any user will be included in the `publicrouter.js` file to make it accessible for global broadcast and be in the local web cluster.
- PLEASE MAKE SURE ADD ANY NEW PAGES IN THE `publicrouter.js` file to make them live.
- All API endpoints for database logic will be in `apirouter.js` file.
- The server details are in the `server.js` file.
- The database details are in the `apirouter.js` file.
- the database model is in the `/routes/dbmodel.js` file.


## API Logic for serving other files (Images / CSS Files / JS Files)
- The images serving structure is as follows using the url. `/assets/(FILE NAME HERE)`, for example `/assets/logo.png` and this will go in the `src` of the `img` element.
- The CSS file serving structure is as follows using the url. `/css/(FOLDER NAME HERE)/(FILENAME HERE`, for example `/css/home/StyleHome.css` and this would go in the `href` of the `link` element.
- The JS file serving structure is as follows using the url. `/js/(FOLDER NAME HERE)/(FILENAME HERE`, for example `/css/home/HomePageJS.js` and this would go in the `src` of the `script` element.
- 
# Making new API's that are needed for the front-end
- The process is simple.
- You can add all the required data you need in the ajax post script function given in the sample file, and come up with a api endpoint name of your choice that you need for that specific task and use it as a place holder for everything. The backend version of this new end point will be ready when we know that the front-end people want a new api endpoint and the request skeleton is ready,
