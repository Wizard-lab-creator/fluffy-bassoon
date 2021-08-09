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

userName = localStorage.getItem("userName");
roomName = localStorage.getItem("roomName");

window.addEventListener("keydown", mykeydown);

function mykeydown(e) {
      keypressed = e.keyCode;
      if (keypressed == 13) {
            msg = document.getElementById("msg").value;
            firebase.database().ref(roomName).push({
                  name: userName,
                  message: msg,
                  like: 0
            });
            document.getElementById("msg").value = "";
      }
}

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name: userName,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        name=message_data["name"];
                        message=message_data["message"];
                        like=message_data["like"];
                        name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row=name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML+=row;
                  }
            });
      });
}
getData();

function updateLike(firebase_message_id){
      buttonId=firebase_message_id;
      console.log(name);
      likes=document.getElementById(buttonId).value;
      updated_likes = Number(likes) + 1;
      if(userName != name){
            firebase.database().ref(roomName).child(firebase_message_id).update({
                  like: updated_likes
            });
      }
      
}

function logout(){
      localStorage.removeItem("userName");
      localStorage.removeItem("roomName");
      window.location="index.html";
}