document.addEventListener("scroll", function(){
    document.getElementById("homeNav").style.display = "initial";
});

//check login status and display relevent HTML login options
window.addEventListener("load", function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/server.php?query=check session');

    // Track the state changes of the request.
    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.
      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
            document.getElementById("accountOptions").innerHTML = this.responseText; // 'This is the output.'
          } else {
            console.log('Error: ' + xhr.status); // An error occurred during the request
          }
        }
    };
    // Send the request
    xhr.send(null);
});

function logOut(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/server.php?query=log out');
    xhr.send(null);
};

//Sends the SIGN UP form data to be processed on server
if(document.getElementById("signup_button")!= null){
    document.getElementById("signup_button").addEventListener("click", function() {
    let formData = {
        signup_name: document.getElementById("signup_name").value,
        signup_surname: document.getElementById("signup_surname").value,
        signup_email: document.getElementById("signup_email").value,
        signup_password: document.getElementById("signup_password").value,
        request_name: 'signUp' 
    };
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/server.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(formData));

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log('status good'); // No errors occurred during the request.
                } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
    };

    xhr.onload = function(){
        window.alert(this.responseText);
    };
});
};

//Sends the LOG IN form data to be processed on server
if(document.getElementById("login_button")!= null){
    document.getElementById("login_button").addEventListener("click", function() {
    let formData = {
        login_email: document.getElementById("login_email").value,
        login_password: document.getElementById("login_password").value,
        request_name: 'logIn' 
    };
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "php/server.php");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(formData));

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                console.log('status good'); // No errors occurred during the request.
                } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
    };

    xhr.onload = function(){
        window.alert(this.responseText);
    };
});
};

// google maps script
initMap();
function initMap() {
    // The location
    const port_elizabeth = { lat: -33.91799, lng: 25.57007 };
    // The map, centered
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: port_elizabeth
    });
    // The marker, positioned
    const marker = new google.maps.Marker({
        position: port_elizabeth,
        map: map
    });
};