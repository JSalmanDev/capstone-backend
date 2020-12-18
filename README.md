# capstone-backend

Host for the Capstone React APP source code 

# Prerequisite For running node app locally

- Node.js (version v10.16.3 or above)
- npm (version 6.11.3 or above)
- MySQL (version 5 or above)


After installing these we need to install the node modules using below command 

- npm install --save

# Run Backend
- node server.js
Or
- nodemon

# Projects/Categories adding
You can create new projects using the postman. You need to do the post request on the below api endpoint
- http://localhost:8081/api/category/create
- body params { "title": "Petland" }

Moreover, if your mysql user credentials are 
- user: root
- password: ''

Then you just need to create the db with name given below all the tables would be automatically created when you the server
- capstone_db

Otherwise you can change the credentials from the file in the given below directory
- config/config.js
