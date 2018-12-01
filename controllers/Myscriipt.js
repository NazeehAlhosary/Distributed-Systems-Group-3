window.onload = console.log(localStorage.getItem("storageName"));
var config = {
  apiKey: "AIzaSyA1uXkc8gQTjysEtyWBhcc1dnbgRlTciEw",
  authDomain: "distributed-system-group-3.firebaseapp.com",
  databaseURL: "https://distributed-system-group-3.firebaseio.com",
  projectId: "distributed-system-group-3",
  storageBucket: "distributed-system-group-3.appspot.com",
  messagingSenderId: "788433805630"
};
firebase.initializeApp(config);

  var projectRef = firebase.database().ref(localStorage.getItem("storageName"));


//String to save XML String
var StringXML = "";

/* Project Template (JSON objects) to save all interfaces + all classes + all relations
for one project as one JSON object */

var myProject = {
  Interfaces: [],
  Relations: [],
  Classes: []
};
//Function that can be called in HTML input tag which takes the input file (XML)

var MyFilter = function(event) {
  var input = event.target;

  /* FileReader is used to read the contents of a File
check this https://www.javascripture.com/FileReader */

  var reader = new FileReader();
  var onload = function(event) {

    //reader has many objects and we want the result object which has string (our xml string)
    StringXML = reader.result;
    //we use xmlToJSON library that we included as xmlToJSON.js in our script in HTML code ans use it here
    var result = xmlToJSON.parseString(StringXML);
    //Acording to srcML documentaion we extraxt first the array that has the objects that we need
    myObject = result.unit[0].unit;
    //loop in our object array to extract intefaces + classes + realtions
    for (var i = 0; i < myObject.length; i++) {
      /* Try and catch importatnt to catch the error when we loop on an objec and there will be no object
          with the name interface or class or extends (acording to srcML documentation) */
      try {
        /* save interface name into string (extract it from intreface.name.text ) and then add it to interface
            array inside our myProject object that we created and same for realtions and classes */
        myinterface = myObject[i].interface[0].name[0]._text;
        myProject.Interfaces[i] = {
          "InterfaceName": myinterface
        }
        
      } catch (e) {}
      try {
        myclass = myObject[i].class[0].name[0]._text;
        mysuper = myObject[i].class[0].super[0].extends[0].name[0]._text;
        myProject.Relations[i] = {
          "ClassName": myclass,
          "SuperClass": mysuper
        }

      } catch (e) {}

      try {
        myclass = myObject[i].class[0].name[0]._text;
        myProject.Classes[i] = {
          "ClassName": myclass
        }

      } catch (e) {}

    }
  
    var projectData = [];
    projectData.push(myProject);

    console.log(myProject);
    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ JSON ARRAY ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓"); 
    console.log(projectData); 
    saveProject(projectData);
  //  var testObj = JSON.parse(myProject).getJSONArray(); 
   // var values = json.getJSONArray(myProject);
   // console.log(values);
    //console.log(testObj);
   
  };

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
  reader.onload = onload;
  reader.readAsText(input.files[0]);
};

function saveProject (Project){
  //var newMessagesRef = messagesRef.push();
  projectRef.push(Project)
}

//Function to print all project interfaces + classes + relations
/*
function PrintProject() {
  console.log("Project Interfaces are :");
  for (var i = 0; i < myProject.Interfaces.length; i++) {
    var interface = myProject.Interfaces[i].InterfaceName;
    console.log(interface);
  }
  console.log("Project Classes are :");
  for (var i = 0; i < myProject.Classes.length; i++) {
    var cname = myProject.Classes[i].ClassName;
    console.log(cname);
  }
  console.log("Project Relations are :");
  for (var i = 0; i < myProject.Relations.length; i++) {
    var crname = myProject.Relations[i].ClassName;
    var srname = myProject.Relations[i].SuperClass;
    console.log(crname + " extends " + srname);
  }

}
*/