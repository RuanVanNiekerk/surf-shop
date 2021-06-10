app.component('search-component',{
    data: function(){
        return{
            searchResults: null
        };
    },
    created(){
        this.getSearch();
    },
    template:
    /*html*/
    `<div v-for="item in searchResults">
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
                <a class="my-0" v-on:click="startSearch('click', item.product_id)">{{item.name}}</a>
            </div>
        </li>
    </div>`,
    methods:{
        //fetches search options form API
        getSearch: function(){
            try{
                fetch("php/searchOptionsAPI.php/searchOptions")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //save json response to vue data
                    this.searchResults = data;
                });
            }catch(error){
                console.log(error);
            };
        },
        //returns suggestions when typing in search bar
        searchOptions: function(){
            item = document.getElementById("searchBar").value;
            //Will not show unless something is typed in the search bar
            if(item === "" || item === null){
                document.getElementById("livesearch").style.display = "none";
                this.searchResults = null;
            }else{
                document.getElementById("livesearch").style.display = "initial";
                let search = {
                    search_input: item,
                    request_name: 'searchData' 
                };
                
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'php/server.php');
                xhr.setRequestHeader("Content-type", "application/json");
                xhr.send(JSON.stringify(search));

                xhr.onreadystatechange = () => {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        this.getSearch();
                        console.log(this.searchResults);
                        } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                        }
                    }
                };
            }
        },
        //starts search for selected/entered item
        startSearch: function(type, value = document.getElementById("searchBar").value){
            let searchParam = {
                search_type: type,
                search_val: value,
                request_name: 'searchitem' 
            };

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/server.php');
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(searchParam));

            xhr.onreadystatechange = function() {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        console.log(this.responseText);
                        document.location.href = "gallery.html";
                    } else {
                        console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };
        },
        //resets product gallery to default
        resetSearch: function(){
            let searchParam = {
                request_name: 'resetSearch' 
            };
            
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/server.php');
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(searchParam));

            xhr.onreadystatechange = function() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    console.log(this.responseText);
                    } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };
        }
    }
});