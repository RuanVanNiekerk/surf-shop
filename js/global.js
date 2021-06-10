const app = Vue.createApp({
    data: function(){
       return{
            cart: [],
            cartUpdate: false
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
                document.getElementById("btn-back-to-top").style.display = "initial";
            });
       },
        //scrolls to destination
        scrollTo(location){
            document.getElementById(location).scrollIntoView({behavior: 'smooth'});
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
        //sends a query to the server
        sendQuery(){
            let query = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                subject: document.getElementById("subject").value,
                message: document.getElementById("message").value,
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
                        
                        console.log(query);
                        console.log(this.responseText);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    };
                };
        },
        //updates cart when a new item is added
        updateCart(curItem){
            let item = curItem;
            if(this.cart === null){
                this.cart = item;
            }else{
                this.cart.push(item);
            }
            
            console.log(this.cart);
            
            //send updated cart to server session
            let data = {
                cartInv: this.cart,
                request_name: 'updateCart' 
            };

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/cart.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = () => {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        console.log(xhr.responseText);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
            };
            
                        this.cartUpdate = true;
        },
        submitCart(){
            //send updated cart to server session
            let data = {
                request_name: 'submitCart' 
            };

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/cart.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = () => {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        console.log(xhr.responseText);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
            };
        }
        
   }
});