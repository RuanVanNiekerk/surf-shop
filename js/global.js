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
            if(document.getElementById("login_button")!== null){
                this.sendLoginDetails();
            };
            document.addEventListener("scroll", function(){
                document.getElementById("homeNav").style.display = "initial";
            });
       },
        //Sends the LOG IN form data to be processed on server
        sendLoginDetails(){
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
                                 document.location.href = "index.html";
                                 } else {
                                 console.log('Error: ' + xhr.status); // An error occurred during the request.
                                 }
                             }
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

                            returnText += "<a class = 'searchOption' onclick = 'startSearch("+submittedEntry+")'>"+returnedData[index].name+"</a><br/>";
                            document.getElementById("livesearch").innerHTML = returnText;
                        });

                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };
            }
        },
        //sends a query to the server
        sendQuery(){
            let query = {
                name: document.getElementById("name").innerHTML,
                email: document.getElementById("email").innerHTML,
                subject: document.getElementById("subject").innerHTML,
                message: document.getElementById("message").innerHTML,
                request_name: 'query' 
            };

            var xhr = new XMLHttpRequest();
                xhr.open('POST', 'php/server.php');
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(query));

                xhr.onreadystatechange = function () {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        let returnedData = [];
                        let returnText = "";

                        console.log(JSON.parse(this.responseText));
                        };

                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                };
        }
   }
});