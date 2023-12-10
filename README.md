1. Project Initialization:
   1.1 Creating GitHub Repository:
   Action: Create a new repository on GitHub for your project.
   1.2 Clone Your Repository:
   Action: Clone the newly created repository to your local machine.
   1.3 Installing Vite for Frontend Setup:
   Steps:
   Open your project folder in the terminal.
   Use npm create vite@latest frontend to install Vite. Assign 'frontend' as the folder name.
   Navigate to the created folder: cd my-project/frontend
   Install dependencies and start the development server: npm install, then npm run dev.
   1.4 Installing Additional Dependencies:
   Steps:
   Install necessary project dependencies like axios, redux-toolkit, react-router-dom, and react-icons using npm.
   Verify the installed dependencies in the package.json file.
   1.5 Cleaning Up Frontend Files:
   Action: Perform required cleanup tasks in your frontend files.

    1.6 Now we can move on backend. We create new folder with name backend. Then we open new terminal and write npm init
    Now we have package.json file
    After that in the terminal we write :
    npm i bcrypt cors dotenv express jsonwebtoken mongoose
    to install dependencies which we will need
    We need one more but it will be in devDependencies. We write in the terminal :
    npm install --save-dev nodemon

    We are ready with Project Initialization
