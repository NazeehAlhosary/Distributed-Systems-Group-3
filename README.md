# Distributed System

# 1. Requirements
* [Git](https://git-scm.com/) 
* [Nodejs](https://nodejs.org/en/) (v10) with [NPM](https://www.npmjs.com/)
* Everything else is installed through npm
* [Google Chrome](https://www.google.com/chrome/) Browser


# 2. Cloning the Repository

```bash
# Without GitHub Registration
git clone https://github.com/NazeehAlhosary/Distributed-Systems-Group-3.git

# With GitHub Registration
git@github.com:NazeehAlhosary/Distributed-Systems-Group-3.git
```
# 3. Run the ```npm``` server:

   ## 3.1 Run Git Bash at the directory of ```Master_node``` file  
   * Type in ```npm install```
   * Type in ```npm install socket.io --save```
   * Type in ```node MasterApp.js```
   ## 3.2 Run Git Bash at the directory of ```Slave_node``` file  
   * Type in ```npm install```
   * Type in ```npm install socket.io --save```
   * Type in ```npm install socket.io-client --save```
   * Type in ```node app.js```
   * Open your browser and go to the link: ```http://localhost:4000/```
