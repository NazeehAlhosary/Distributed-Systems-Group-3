window.onload = console.log(localStorage.getItem("storageName"));

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

    // To print all values
    /*messagesRef.on('value', gotData, errData);

    function gotData(data){
        console.log(data.val());
    }
    function errData(err){
        console.log("Error! : " + err);
    }
    */

//var messagesRef = firebase.database().ref('messages');
//var messagesRefTest = firebase.database().ref('messages/'+newName);



// Listen for form submit
document.getElementById('formSubmit').addEventListener('submit', submitForm);

    function submitForm (submitForm){
        submitForm.preventDefault();
    
        // Get the input values
        var name = getInputValues('name');
        var email = getInputValues('email');
        var phone = getInputValues('phone');
        var company = getInputValues('company');
        var message = getInputValues('message');

        console.log("The name is "+name);
        console.log("The email is "+email);
        console.log("The phone is "+phone);
        console.log("The company is "+company);
        console.log("The message is "+message);
        
        // Save message
        saveMessage(name, company, email, phone,message);
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
    function saveMessage (name, company, email, phone,message){
        var newMessagesRef = messagesRef.push();
        newMessagesRef.set({
            name:name,
            company:company,
            email:email,
            phone: phone,
            message:message
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