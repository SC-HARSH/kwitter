
//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyDK4QTLtN5EyS5GhF6UQTWVtb_ZN4ohKPE",
      authDomain: "kwitter-9dd6c.firebaseapp.com",
      databaseURL: "https://kwitter-9dd6c-default-rtdb.firebaseio.com",
      projectId: "kwitter-9dd6c",
      storageBucket: "kwitter-9dd6c.appspot.com",
      messagingSenderId: "318428254663",
      appId: "1:318428254663:web:5fee54e4351d5bbd6e89e2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Make stuff easy
var database = firebase.database()

function updateThings() {
      user_name = localStorage.getItem("user_name");
      document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";
}

function checkRoomName() {
      room_name = document.getElementById("room_name").value;
      if (room_name.indexOf("<") > -1 || room_name.indexOf(">") > -1){
            console.log("It has <> Hacker!")
            document.getElementById("error_alert").innerHTML = "<strong>Hacker!</strong> Don't use <> That would mess with our code.";
            document.getElementById("error_alert").style.display = "block";
      }
      else {
            document.getElementById("error_alert").style.display = "none";
            console.log("It does not have <> So not a Hacker!");
            addRoom();
      }
}

function addRoom() {
      room_name = document.getElementById("room_name").value;
      database.ref("/").child(room_name).update({ Who_Created_This: "The Person Who Created This group Is " + localStorage.getItem("user_name") });
      localStorage.setItem("room_name", room_name)
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name -" + Room_names);
                  var row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}