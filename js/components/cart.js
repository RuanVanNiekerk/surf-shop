app.component('cart-component',{
    props: {
        cartUpdate: {
            type: Boolean
        }
    },
    data: function(){
        return{
            tempProdData: null,
            cart_total: 0,
            cart: []
        };
    },
    created(){
        this.getCart();
    },
    watch: {
        'cartUpdate': () =>{
            console.log("catch");
            this.getCart();
        }
    },
    template:
    /*html*/
    `<div>
        <span>Total (USD)</span>
        <strong id="finalTotal">\${{cart_total}}</strong>
        <span v-for="item in cart">
            <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                    <span>{{item.name}}</span><br/>
                    <small class="text-muted">{{item.description}}</small>
                </div>
                <span class="text-muted">\${{item.price}}</span>
                <a href="" v-on:click="cartRemove(item.product_id)">Remove</a>
            </li>
        </span>
        
    </div>`,
    methods:{
        //get product Data from producAPI and searchAPI and saves relevant item
        getProd: function(){
            
            try{
                fetch("php/getProductsAPI.php/products")
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
        //shows cart html
        openCart(){
            if(document.getElementById("cartDrop").style.display === "none"){
                document.getElementById("cartDrop").style.display = "initial";
            }else{
                document.getElementById("cartDrop").style.display = "none";
            }
            this.getCart();
        },
        //gets the cart content from the server
        getCart(){
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'php/cart.php?query=getCart');
            xhr.send(null);
            xhr.onreadystatechange = () => {
                var DONE = 4; // readyState 4 means the request is done.
                var OK = 200; // status 200 is a successful return.
                if (xhr.readyState === DONE) {
                    if (xhr.status === OK) {
                        let result = JSON.parse(xhr.responseText);
                        this.cart = result;
                        console.log(this.cart);
                        this.cart_total = 0;
                        for(let i = 0; i <= this.cart.length; i++){
                            let newPrice = this.cart_total + + this.cart[i].price;
                            this.cart_total = newPrice;
                        }
                    } else {
                    console.log('Error: ' + xhr.status); // An error occurred during the request.
                    }
                }
            };
        },
        //remove item from cart
        cartRemove: function(ID){
            for(let i=0; i< this.cart.length; i++){
                if(this.cart[i].product_id === ID){
                    this.cart.splice(i, 1);
                }
            }

            //send updated cart to server session
            let data = {
                cartInv: this.cart,
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
        addCart: function(){
            console.log("test");
        }
    }
});

