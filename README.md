# umbc-447-team-5-sp2021
This is a node.js application. This applicaiton development has been completed entirely
with the npm package manager. Please refer to existing guides to learn how to install
npm and node.js on your machine.

For this project, the root directory is `./covid19-map`. All commands assume you are 
inside this folder already.

After cloning the repository simply run `npm install` from the command line / terminal
at `./covid19-map`, `.` being the location you cloned the repo into. This should read 
and install all dependencies.

To get the app running do `npm start` from the same location. After a few seconds the 
webpage should be available on `http://localhost:3000` and your default browser should 
open to that page automatically. Any python code you see here is currenly deprecated.

To get started make sure you have created and added a key pair to your github account,
then go ahead and clone the repo to an empty folder on your workstation.

VS Code has lots of built in tools to make using git very simple. I highly encourage 
you use them. If you need help, the official git documentation (and info on how to 
install git) is available at https://git-scm.com/


Whenever working on changes please be sure NOT to work on the main branch. 
Create and use a different branch, and when complete ask at least 1 other group 
member to review your changes before merging your branch with master - ESPECIALLY
if there are conflicting merge issues.

Do NOT push binary files to this repo. Please add folders or files containing binaries
to a new line in .gitignore (see how `venv` is already there?)


# To get started with this project:

1. Clone the repository:
`git clone git@github.com:cvieson1/umbc-447-team-5-sp2021.git .`

2. Go into the root folder and install dependencies: 
`cd covid19-map/`

`npm install`

3. Run the server: 
`npm start`
