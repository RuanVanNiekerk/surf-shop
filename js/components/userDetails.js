app.component('user-component',{
    data: function(){
        return{
            cur_name: null,
            cur_surname: null,
            cur_email: null,
            cur_address: null,
            cur_country: null,
            cur_state: null,
            cur_zip: null,
            
            user_form: false
        };
    },
    created(){
        this.request();
    },
    template:
    /*html*/
    `<div>
        <span v-if="cur_name != null && user_form === false">
            <p>Name: {{cur_name}}<br>
            Surname: {{cur_surname}}<br>
            Email: {{cur_email}}<br>
            Address: {{cur_address}}<br>
            Country: {{cur_country}}<br>
            State: {{cur_state}}<br>
            Zip Code: {{cur_zip}}<br></p>
            <button class="btn-custom my-2 my-sm-0" id="changeDetails" v-on:click="userUpdateForm">Change Details</button>
        </span>
        <span v-else-if="user_form === true">
            <form>
                <div class="form-row">
                    <div class="col-md-6 form-group">
                        <label for="name">Name:</label>
                        <input type="text" name="name" class="form-control" id="name" v-bind:value="cur_name" required>
                    </div>
                    <div class="col-md-6 form-group">
                        <label for="name">Surname:</label>
                        <input type="text" name="surname" class="form-control" id="surname" v-bind:value="cur_surname" required>
                    </div>
                    <div class="col-12 form-group">
                        <label for="name">Email:</label>
                        <input type="text" name="email" class="form-control" id="email" v-bind:value="cur_email" required>
                    </div>
                    <div class="col-12 form-group">
                        <label for="name">Address:</label>
                        <input type="text" name="address" class="form-control" id="address" v-bind:value="cur_address" required>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="name">Country:</label>
                        <input type="text" name="country" class="form-control" id="country" v-bind:value="cur_country" required>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="name">State:</label>
                        <input type="text" name="state" class="form-control" id="state" v-bind:value="cur_state" required>
                    </div>
                    <div class="col-md-4 form-group">
                        <label for="name">Zip:</label>
                        <input type="text" name="zip" class="form-control" id="zip" v-bind:value="cur_zip" required>
                    </div>
                </div>
            </form>
            <button class="btn-custom my-2 my-sm-0" v-on:click="updateDetails">Update</button>
        </span>
        <span v-else>
            Could Not Find User Details
        </span>
    </div>`,
    methods:{
        request: function(){
            try{
                fetch("php/userAPI.php/user")
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    //save json response to vue data
                    this.cur_name = data["name"];
                    this.cur_surname = data["surname"];
                    this.cur_email = data["email"];
                    this.cur_address = data["address"];
                    this.cur_country = data["country"];
                    this.cur_state = data["state"];
                    this.cur_zip = data["zip"];
                    
                });
            }catch(error){
                console.log(error);
            };
        },
        userUpdateForm: function(){
            this.user_form = true;
            console.log(this.user_form);
        },
        //Sends the UPDATED USER data to be processed on server
        updateDetails(){
             let formData = {
                 new_name: document.getElementById("name").value,
                 new_surname: document.getElementById("surname").value,
                 new_email: document.getElementById("email").value,
                 new_address: document.getElementById("address").value,
                 new_country: document.getElementById("country").value,
                 new_state: document.getElementById("state").value,
                 new_zip: document.getElementById("zip").value,
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
         }
    }
});

