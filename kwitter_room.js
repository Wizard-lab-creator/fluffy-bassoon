
var firebaseConfig = {
      apiKey: "AIzaSyDyeG0qxHvwtJclIrI6qR9OYTIyb675cPI",
      authDomain: "kwitter-f69db.firebaseapp.com",
      databaseURL: "https://kwitter-f69db-default-rtdb.firebaseio.com",
      projectId: "kwitter-f69db",
      storageBucket: "kwitter-f69db.appspot.com",
      messagingSenderId: "570370107002",
      appId: "1:570370107002:web:ada4bb25c65c2d6a2ffdc3",
      measurementId: "G-KMKTV2PKEK"
    };
    firebase.initializeApp(firebaseConfig);

    userName=localStorage.getItem("userName");
    document.getElementById("userName").innerHTML="Welcome " + userName + "!";

    function addRoom(){
          roomName=document.getElementById("roomName").value;
          firebase.database().ref("/").child(roomName).update({
                purpose:"adding room name"
          });
          localStorage.setItem("roomName", roomName);
          window.location="kwitter_page.html";
    }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name){
      localStorage.setItem("roomName", name);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location="index.html";
}
