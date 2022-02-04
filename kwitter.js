function adduser() {
    user_name = document.getElementById("user_name").value;
    localStorage.setItem("user_name", user_name);
    window.location = "kwitter_room.html";
}
function checkUser(){
    user_name = document.getElementById("user_name").value;
    if(user_name.indexOf("<") > -1 || user_name.indexOf(">") > -1){
        console.log("It has <> Hacker!")
        document.getElementById("error_alert").innerHTML = "<strong>Hacker!</strong> Don't use <> That would mess with our code.";
        document.getElementById("error_alert").style.display = "block"; 
    }
    else{
        document.getElementById("error_alert").style.display = "none"; 
        console.log("It does not have <> So not a Hacker!");
        adduser();
    }
}
