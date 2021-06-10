app.component('items-component',{
    data: function(){
        return{
            tempProdData: null,
            ViewItem: null,
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
            <div class="row p-4 bg-white border rounded">
                <div class="col-md-3 mt-1"><img id="prod-img" class="img-fluid img-responsive rounded product-image" v-bind:src="'images/'+item.img_url" v-on:click="viewItem(item.product_id)" alt="product Image"></div>
                <div class="col-md-6 mt-1">
                    <h2 v-on:click="viewItem(item.product_id)">{{item.name}}</h2>
                    <p class="text-justify text-truncate para mb-0">{{item.description}}<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">\${{item.price}}</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4"><button class="btn-custom my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="addCart(item.product_id)">Add to Cart</button>
                    <button class="btn-custom-inverse my-2 my-sm-0" type="button" v-bind:id="item.product_id" v-on:click="viewItem(item.product_id)">View Item</button></div>
                </div>
            </div>
        </span>
        <span v-else-if="selectedItem === true">
            <div class="row p-2 bg-white border rounded">
                <div class="col-md-12 mt-1 img-magnifier-container">
                    <img id="prod-img" class="img-fluid img-responsive rounded product-image" v-bind:src="'images/'+ViewItem.img_url" alt="product Image"/>
                </div>
                <div class="col-md-12 mt-1">
                    <h2>{{ViewItem.name}}</h2>
                    <p class="text-justify text-truncate para mb-0">{{ViewItem.description}}<br><br></p>
                </div>
                <div class="align-items-center align-content-center col-md-12 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                        <h4 class="mr-1">\${{ViewItem.price}}</h4>
                    </div>
                    <h6 class="text-success">Free shipping</h6>
                    <div class="d-flex flex-column mt-4"><button class="btn-custom my-2 my-sm-0" type="button" v-bind:id="ViewItem.product_id" v-on:click="addCart(ViewItem.product_id) v-on:click="addCart(item.product_id)"">Add to Cart</button>
                </div>
            </div>
        </span>
    </div>`,
    methods:{
        //get product Data from producAPI and searchAPI and saves relevant item
        getProd: function(){
            let searchItem;
            let prodItem;            
            
            try{
                fetch("php/searchAPI.php/searchResults")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //save json response to vue data
                    searchItem = data;
                });
            }catch(error){
                console.log(error);
            };
            try{
                fetch("php/getProductsAPI.php/products")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    //save json response to vue data
                    prodItem = data;
                    if(searchItem !== undefined){
                        this.tempProdData = searchItem;
                        if(searchItem.length === 1){
                            this.ViewItem = searchItem;
                            this.selectedItem = true;
                        }
                    }else{
                        this.tempProdData = prodItem;
                    }
                });
            }catch(error){
                console.log(error);
            };
        },
        //View selected Item
        viewItem: function(item){
            this.tempProdData.every(option => {
                if(option.product_id === item){
                    this.ViewItem = option;
                    return false;
                }
                return true;
            });
            
            this.selectedItem = true;
            
        },
        //sends add item request to server where cart will get update
        addCart: function(prodID){
            let cart;
            
            //find product item by id
            for(let i = 0; i <= this.tempProdData.length; i++){
                let curItem = this.tempProdData[i];
                let curItemID = this.tempProdData[i].product_id;
                if(curItemID === prodID){
                    cart = curItem;
                    break;
                }
            };
            
            this.$emit('add-to-cart', cart);
        }
    }
});

