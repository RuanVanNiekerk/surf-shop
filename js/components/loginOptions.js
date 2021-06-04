app.component('login-component',{
    data: function(){
        return{
            name: null,
            surname: null
        };
    },
    created(){
        this.request();
    },
    template:
    /*html*/
    `<div>
        <span v-if="name != null">
            <a href="userProfile.html">{{name}} {{surname}}</a><a href="index.html" v-on:click="logOut">Log Out</a>
        </span>
        <span v-else>
            <a href="signUp.html">Sign Up</a><a href="logIn.html">Log In</a>
        </span>
    </div>`,
    methods:{
        request: function(){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'php/server.php?query=check session');

            // Track the state changes of the request.
            xhr.onreadystatechange = () => {
              var DONE = 4; // readyState 4 means the request is done.
              var OK = 200; // status 200 is a successful return.
              if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    let result = JSON.parse(xhr.responseText);
                    this.name = result[0]; // 'This is the output.'
                    this.surname = result[1];
                  } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request
                  }
                }
            };
            // Send the request
            xhr.send(null);
        },
        //closes session, logging the current user out
        logOut(){
            console.log("out");
             var xhr = new XMLHttpRequest();
             xhr.open('GET', 'php/server.php?query=logOut');
             xhr.send(null);
        }
    }
});

