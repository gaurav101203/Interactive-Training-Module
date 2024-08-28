							Interactive Training Module

#Technologies Used:-

   Frontend: ReactJS (react-circular-progressbar , proptypes), CSS, HTML5 Video player
   Backend: NodeJS (ExpressJS, Cors, Mongoose)
   Database: MongoDB


#Procedure:-

  1.Install the following things to get started: react, node.js, MongoDB, express, cors, mongoose, react-circular-progressbar, proptypes.
  2.Start the MongoDB and connect it to the local database at mongodb://localhost:27017. This will start your database which will later be connected to the backend of your application.
  3.Start the "server.js" file present in the backend folder by writing the command "node server.js" in command prompt. This will start your local server which will fetch the data from the database.
  4.Now you can finally start the main react app by writing command "npm start" and the react application will start running.


#Features:- 

	This application contains all the following features:
1. Video Library: A list of video topics, each containing a unique video file.
2. Sequential Video Playback: Employees must watch videos in the specified order
without any option to fast forward or skip ahead.
3. Resume from Last Stop: If a video stops playing at a particular location, it should
resume playback from that exact timeline position.
4. Back Navigation: Users can navigate back to previously watched videos, but cannot
fast-forward.
5. Progress Tracking: Display the employee's progress as a percentage completed on
the dashboard.
