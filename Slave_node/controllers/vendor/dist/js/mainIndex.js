window.onload = console.log(localStorage.getItem("storageName"));
window.onload = document.getElementById('mainBar').innerHTML += " to the project: "+localStorage.getItem("storageName");
// Initialize Firebase
var config = {
apiKey: "AIzaSyA1uXkc8gQTjysEtyWBhcc1dnbgRlTciEw",
authDomain: "distributed-system-group-3.firebaseapp.com",
databaseURL: "https://distributed-system-group-3.firebaseio.com",
projectId: "distributed-system-group-3",
storageBucket: "distributed-system-group-3.appspot.com",
messagingSenderId: "788433805630"
};
firebase.initializeApp(config);

// Reference messages collection

var testBN = getInputValues('name');
var messagesRef = firebase.database().ref(localStorage.getItem("storageName"));


// Listen for form submit
document.getElementById('formSubmit').addEventListener('submit', submitForm);

function submitForm (submitForm){
    submitForm.preventDefault();

    // Get the input values
    var name = getInputValues('name');
    var numMeth = getInputValues('numMeth');
    var numAtr = getInputValues('numAtr');
    var description = getInputValues('description');
    var parent = getInputValues('superClass');
    console.log("The name is "+name);
    console.log("The numMeth is "+numMeth);
    console.log("The numAtr is "+numAtr);
    console.log("The message is "+description);
    console.log("The superClass is "+superClass);
    // Save message
    saveMessage (name,parent ,description, numMeth, numAtr);
   // saveMessageTest (name, company);
    // Show alret
    document.querySelector('.alert').style.display = 'block'
    window.alert("Your data has been submitted to the database :" + localStorage.getItem("storageName"));

    //Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none'
    },3000);

    document.getElementById('formSubmit').reset();
}

// Function to get form values
function getInputValues(id){
    return document.getElementById(id).value;
}
 function test(){
    return " "
}
// Save the message to the firebase
function saveMessage (name,parent, description, numMeth, numAtr){
    var newMessagesRef = messagesRef.push();
    newMessagesRef.set({
        name:name,
        parent:parent,
        description:description,
        numMeth:numMeth,
        numAtr:numAtr
    });
  
}
/*
function saveMessageWithoutPush (name, company, email, phone,message){
    var newMessagesRefTest = {
        name:name,
        company:company,
        email:email,
        phone: phone,
        message:message
    }
    messagesRef.push(newMessagesRefTest)
  
}
*/
/*
// Save the name and company in another path inside the messages to the firebase
function saveMessageTest (name, company){
var newMessagesRefTest = messagesRefTest.push();
newMessagesRefTest.set({
    name:name,
    company:company
});
}

*/


// Get elements
const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
// Create references
  const dbRefObject = firebase.database().ref().child(localStorage.getItem("storageName"));
  const dbRefList = dbRefObject.child('Address');

// Sync objects changes
 // dbRefObject.on('value', snap => console.log(snap.val()) );

 dbRefObject.on('value', snap =>{
     preObject.innerText = JSON.stringify(snap.val(), null , 2); // the number 2 is the spacing 
 } );

// Sync List changes
  //dbRefList.on('child_added', snap => console.log(snap.val()));

  dbRefList.on('child_added', snap => {
      const li = document.createElement('li');
      li.innerText = snap.val();
      li.id = snap.key;
      ulList.appendChild(li);
  });

// update the list 
  dbRefList.on('child_changed', snap => {
      const listChanged = document.getElementById(snap.key);
      listChanged.innerText = snap.val();

  } );

// Delete an item from the list 
dbRefList.on('child_removed', snap => {
  const listremove = document.getElementById(snap.key);
  listremove.remove();

} );


function sendFileName() {
    var x = document.getElementById("myFile").name;
    document.getElementById("demo").innerHTML = x;
}