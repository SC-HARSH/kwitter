//ADD YOUR FIREBASE LINKS HERE
room_name = localStorage.getItem("room_name");
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

function checkMsg() {
    msg = document.getElementById("msg").value;
    if (msg.indexOf("<") > -1 || msg.indexOf(">") > -1) {
        console.log("It has <> Hacker!")
        document.getElementById("error_alert").innerHTML = "<strong>Hacker!</strong> Don't use <> That would mess with our code.";
        document.getElementById("error_alert").style.display = "block";
    }
    else {
        document.getElementById("error_alert").style.display = "none";
        console.log("It does not have <> So not a Hacker!");
        send();
    }
}

function send() {
    room_name = localStorage.getItem("room_name");
    msg = document.getElementById("msg").value;
    user_name = localStorage.getItem("user_name")
    console.log(user_name);
    console.log(room_name);
    database.ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    })
    document.getElementById('msg').value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "Who_Created_This") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                username = message_data["name"];
                like = message_data["like"];
                message = message_data["message"];
                name_with_tag = "<h4>" + username + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 id='message_h4'>"+message+"</h4>";
                like_button = "<button class = 'btn btn-warning' id="+firebase_message_id+" value = "+like+" onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:"+like+"</span></button><hr>";
                row = name_with_tag + message_with_tag +like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button -" + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    update_likes = Number(likes) + 1;
    console.log(update_likes);

    database.ref(room_name).child(message_id).update({
        like: update_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function updateThings() {
    room_name = localStorage.getItem("room_name");
    console.log(room_name);
    console.log("The Room Name Is " + room_name);
    document.getElementById("room_name_01").innerHTML = "Room Name Is " + room_name + "!";
}