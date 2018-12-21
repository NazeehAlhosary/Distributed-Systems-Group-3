var app = require('express')();
var express = require('express');
var path = require("path");
// Create server
var server = require('http').Server(app);
// All knowledge sources have to connect to the save Master node which is the io in this case
var io = require('socket.io')(server);
// The server has to listen to the port 300
server.listen(3001);
//globalVar is variable to save the data inside it as a string
var globalVar;
//globalObjectVar is variable to save the data inside it as an object
var globalObjectVar;
//counter is variable to count how many times all knowledge sources did deletion
var counter = 0;

// When any knowledge sources connect to the master
io.sockets.on('connection', function (socket) {
    console.log('A knowledge source has been connected with id of: ', socket.id  );
    // Check if there is any changes on delete.
    if (counter>0){
    console.log('The counter is: '+ counter + " , send the object data the all knowledge sources");
    io.sockets.emit('fromMasterDelete', JSON.stringify(globalObjectVar) ,counter  );
    }else{
    console.log('The counter is: '+ counter + " send the string data the all knowledge sources");
    io.sockets.emit('fromMaster',  globalVar, counter ); 
    }
    // fromSlave: is an Event from the first connected knowledge source who will uploade the .json file
    socket.on('fromSlave', function (dataString,dataObject) {
        // to check the type of the received
        console.log(typeof dataString);
        console.log(typeof dataObject);
        //Save the received data in the global variables
        globalVar = dataString;
        globalObjectVar = dataObject;
        // fromMaster: is an Event from the master node to all connected knowledge sources to get the data and run the visualization
        io.sockets.emit('fromMaster',  globalVar ); 
    });

    // deleteClass: is an Event from any knowledge source when he/she delete any clasee
    socket.on('deleteClass', function (data) {
    // Increase the number of deletion (counter)
        counter++;
        console.log('The number of deletion is: ' + counter);
    //Save the received data in the global variables
        var parseDeletedData = JSON.stringify(data);
        var parseTheObjectData = JSON.stringify(globalObjectVar);
    //Initialize variables to be able to use them in the event 
        var tempString;
        var finalString;
    /*
     * Try & Catch to avoid any error while deleting class or child of any class
     * First try: if the selected class is a class in the middle of the file
     * Second try whihc is inside the catch: if the selected class at the end of the file.
     * Last catch: if the selected class is the last child of a superclass
     */
        try {
        // Replace the deleted data from the main object by * to fetch the comma and delete it in the next step if there is no errors
            tempString = parseTheObjectData.replace(parseDeletedData,'*');
        // Replace the *, by the main object by nothing  
            finalString = tempString.replace('*,','');
        // Save the new data to the global variables, first to the string one, second to the Object one
            globalVar = finalString;
            globalObjectVar = JSON.parse(finalString);
        // fromMasterDelete: is an Event to send the new changes to all knowledge sources to be able to run the visualization with the new data
            io.sockets.emit('fromMasterDelete',  finalString ); 
        }catch (error1) {
                try {
            // Same as the first try
                var tempString = parseTheObjectData.replace(parseDeletedData,'*****');
                var tempStringCatch = tempString.replace('},*****]','}]');
                globalVar = tempStringCatch;
                globalObjectVar = JSON.parse(tempStringCatch);
                io.sockets.emit('fromMasterDelete',  tempStringCatch ); 
                }catch (error2) {		
                var tempString = parseTheObjectData.replace(parseDeletedData,'*****');
                var tempStringCatch = tempString.replace('[*****]','[]');
                console.log(tempStringCatch);
                globalVar = tempStringCatch;
                globalObjectVar = JSON.parse(tempStringCatch);
                io.sockets.emit('fromMasterDelete',  tempStringCatch ); 			  
                }
            }
    });

});