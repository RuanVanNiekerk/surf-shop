const app = Vue.createApp({
    data: function(){
       return{
           
       };
    },
    created(){
       this.onLoad();
    },
    methods: {
       onLoad(){
            this.loginStatus();
            if(document.getElementById("accountOptions") !== null){
                this.checkStatus();
            };
            if(document.getElementById("changeDetails") !== null){
                this.userUdateForm();
            };
            if(document.getElementById("login_button")!== null){
                this.sendLoginDetails();
            };
            document.addEventListener("scroll", function(){
                document.getElementById("homeNav").style.display = "initial";
            });
       },
       //check login status and display relevent HTML login options
       loginStatus(){
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
       },
       //check login status and display relevent HTML login options
       checkStatus(){
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
       },
       //closes session, logging the current user out
       logOut(){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'php/server.php?query=log out');
            xhr.send(null);
       },
       //fetches user Details from endpoint
       fetchUserDetails(){
            try{
                fetch("php/userAPI.php/user")
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    //save json response to vue data
                    searchresult = JSON.stringify(data);
                    for(let i = 0; i <= searchresult.length; i++){
                        document.getElementById("detailsResponse").innerHTML = 'Name: '+data["name"]+'<br/>\n\
                            Surname: '+data["surname"]+'<br/>\n\
                            Email: '+data["email"]+'<br/>\n\
                            Address: '+data["address"]+'<br/>\n\
                            Country: '+data["country"]+'<br/>\n\
                            State: '+data["state"]+'<br/>\n\
                            Zip Code: '+data["zip"]+'';
                    };
                });
            }catch(error){
                console.log(error);
            };
       },
       //Changes profile data into update form
       userUpdateForm(){
            document.getElementById("changeDetails").addEventListener("click", function(){
                var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'php/server.php?query=user details');
                    xhr.send(null);

                    xhr.onreadystatechange = function () {
                    var DONE = 4; // readyState 4 means the request is done.
                    var OK = 200; // status 200 is a successful return.
                    if (xhr.readyState === DONE) {
                        if (xhr.status === OK) {
                            let response = this.responseText;
                            let values = response.split("/");
                            document.getElementById("detailsBody").innerHTML = ' Sign Up Form \n\
                            <form name="update_form"> \n\
                            <label for="update_name">Name:</label><input id="update_name" type="text" name="update_name" value="'+values[0]+'"/><br/> \n\
                            <label for="update_surname">Surname:</label><input id="update_surname" type="text" name="update_surname" value="'+values[1]+'"/><br/> \n\
                            <label for="update_email">Email:</label><input id="update_email" type="text" name="update_email" value="'+values[2]+'"/><br/> \n\
                            <button id="update_button" v-bind:click="updateDetails()">Update Details</button> \n\
                            </form>';
                            } else {
                            console.log('Error: ' + xhr.status); // An error occurred during the request.
                            }
                        }
                };
            });
       },
       //Sends the UPDATED USER data to be processed on server
       updateDetails(){
            let formData = {
                new_name: document.getElementById("update_name").value,
                new_surname: document.getElementById("update_surname").value,
                new_email: document.getElementById("update_email").value,
                request_name: 'userUpdate' 
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
                        window.alert(this.responseText);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
            };
        },
        //Sends the LOG IN form data to be processed on server
        sendLoginDetails(){
             console.log("test");
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
        },
        //Sends the SIGN UP form data to be processed on server
        sendSignUpData(){
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
                        window.alert(this.responseText);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
            };
        },
        //returns suggestions when typing in search bar
        searchOptions(){
            //Will not show unless something is typed in the search bar
            if(document.getElementById("searchBar").value === ""){
                document.getElementById("livesearch").style.display = "none";
                document.getElementById("livesearch").innerHTML = "";
            }else{
                let search = {
                    search_input: document.getElementById("searchBar").value,
                    request_name: 'searchData' 
                };

                        console.log(search);
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'php/server.php');
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(search));

                xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        let returnedData = [];
                        let returnText = "";

                        returnedData = JSON.parse(this.responseText);
                        for (i = 0; i <= 5; i++) {
                            console.log(returnedData[i]);
                        } 
                        returnedData.forEach(function(item, index){
                            let submittedEntry = returnedData[index].product_id;
                            //submittedEntry = submittedEntry.replace("'", "\\&apos;");
                            //submittedEntry = submittedEntry.replace('"', '\\&quot;');

                            returnText += "<a class = 'searchOption' onclick = 'startSearch("+submittedEntry+")'>"+returnedData[index].name+"</a><br/>";
                            document.getElementById("livesearch").innerHTML = returnText;
                        });

                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };
            }
        }
   }
});