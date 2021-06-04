app.component('items-component',{
    data: function(){
        return{
            tempProdData: null,
            ViewItem: null,
            searchResults: null,
            cart: null,
            selectedItem: false
        };
    },
    created(){
        this.getProd();
    },
    template:
    /*html*/
    `<div>
        <span v-if="tempProdData != null && selectedItem === false" v-for="item in tempProdData">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" v-bind:src="'images/'+item.img_url"></div>
                <div class="col-md-6 mt-1">
                    <h2>{{item.name}}</h2>
                    <p class="text-justify text-truncate para mb-0">{{item.description}}<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">\${{item.price}}</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4"><button class="btn-custom my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="cartAdd(item.product_id)">Add to Cart</button>
                    <button class="btn-custom-inverse my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="viewItem(item.product_id)">View Item</button></div>
                </div>
            </div>
        </span>
        <span v-else v-for="item in ViewItem">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-12 mt-1"><img class="img-fluid img-responsive rounded product-image" v-bind:src="'images/'+item.img_url"></div>
                <div class="col-md-12 mt-1">
                    <h2>{{item.name}}</h2>
                    <p class="text-justify text-truncate para mb-0">{{item.description}}<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-12 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">\${{item.price}}</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4"><button class="btn-custom my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="cartAdd(item.product_id)">Add to Cart</button>
                    <button class="btn-custom-inverse my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="viewItem(item.product_id)">View Item</button></div>
                </div>
            </div>
        </span>
    </div>`,
    methods:{
        //get product Data from API
        getProd: function(){
            try{
                fetch("php/getProducts.php/products")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //save json response to vue data
                    this.tempProdData = data;
                });
            }catch(error){
                console.log(error);
            };
        },
        //fetches search options form API
        getSearch: function(){
            try{
                fetch("php/searchAPI.php/searchResults")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //save json response to vue data
                    this.searchresult = data;
                    console.log(data);
                });
            }catch(error){
                console.log(error);
            };
        },
        //adds item to cart
        cartAdd: function(prodID){
            for(let i = 0; i <= this.tempProdData.length; i++){
                let curItem = this.tempProdData[i];
                let curItemID = this.tempProdData[i].product_id;
                if(curItemID === prodID){
                    this.cart.push(curItem);
                    break;
                }
            };

            //send updated cart to server session
            let data = {
                cartInv: cart,
                request_name: 'updateCart' 
            };

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "php/cart.php");
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(JSON.stringify(data));

            xhr.onreadystatechange = function () {
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
        },
        //View selected Item
        viewItem(item){
            for(let i = 0; i <= this.tempProdData.length; i++){
                if(this.tempProdData[i].product_id === item){
                    this.viewItem = this.tempProdData[i];
                    this.selectedItem = true;
                    break;
                }
                console.log(this.viewItem);
            }
        }
    }
});

