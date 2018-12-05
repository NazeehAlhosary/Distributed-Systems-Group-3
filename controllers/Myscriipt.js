//String to save XML String
var StringXML = "";

/* Project Template (JSON objects) to save all interfaces + all classes + all relations
for one project as one JSON object */

var myProject = {
  name: "Group3",
  children: []
};

var myTempObj = {
Relations : []
};

//Function that can be called in HTML input tag which takes the input file (XML)

var MyFilter = function (event) {
  var input = event.target;

  /* FileReader is used to read the contents of a File
check this https://www.javascripture.com/FileReader */

  var reader = new FileReader();
  var onload = function (event) {

    //reader has many objects and we want the result object which has string (our xml string)
    StringXML = reader.result;
    //we use xmlToJSON library that we included as xmlToJSON.js in our script in HTML code ans use it here
    var result = xmlToJSON.parseString(StringXML);

    myObject = result.unit[0].unit

    for (var i = 0; i < myObject.length; i++) {
      try {
        myclass = myObject[i].class[0].name[0]._text;
        mysuper = myObject[i].class[0].super[0].extends[0].name[0]._text;

        myProject.children[i] = {
          "name": mysuper,
          "children": [
            {
              "name": myclass,
              "Size": 1
            }
          ]
        }

      } catch (e) { }

    }

    console.log(myProject);

  };

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
  reader.onload = onload;
  reader.readAsText(input.files[0]);
};

/*
//Function to print all project interfaces + classes + relations

function PrintProject() {

  var obj = JSON.parse(myObject);

  console.log("Project Interfaces are :");
  for (var i = 0; i < obj.getJSONArray("Relations").length; i++) {
    var interface = "";
    interface = obj.getJSONArray("Relations")[i].ClassName;
    console.log(interface);
  }
}

  console.log("Project Classes are :");
  for (var i = 0; i < obj.Classes.length; i++) {
    var cname = "";
    cname = obj.Classes[i].ClassName;
    console.log(cname);

  }
  console.log("Project Relations are :");
  for (var i = 0; i < obj.Relations.length; i++) {

    var crname = obj.Relations[i].ClassName;
    var srname = obj.Relations[i].SuperClass;
    console.log(crname + " extends " + srname);

  }
*/
