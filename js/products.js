let tempProdData = [];
let cart = [];
let searchresult = [];

fetchData();
getCart();
//fetch product data from api endpoint
async function fetchData(){
    try{
        await fetch("php/getProducts.php/products")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //save json response to vue data
            tempProdData = data;
            for(let i = 0; i <= tempProdData.length; i++){
                prodHTML(i);
            };
        });
    }catch(error){
        console.log(error);
    };
};

//fetches searched item at endpoint
try{
    fetch("php/searchAPI.php/searchResults")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //save json response to vue data
        searchresult = data;
        console.log(data);
        for(let i = 0; i <= searchresult.length; i++){
            prodHTML(i, searchresult, "viewItem");
        };
    });
}catch(error){
    console.log(error);
};

//adds product HTML to page
function prodHTML(index, item = tempProdData, element = "prodCard"){
                let newHTML = '<div class="card mb-4 box-shadow">'
                                            +'<div>'
                                                +'<img class="card-img-top card-top-zoom" id="view_img" src="images/'+item[index].img_url+'" alt="Thumbnail [100%x225]">'
                                            +'</div>'
                                            +'<div class="card-body card-body-zoom">'
                                                +'<h3 id="view_name">'+item[index].name+'</h3>'
                                                +'<p class="card-text" id="view_desc">'+item[index].description+'</p>'
                                            +'</div>'
                                            +'<div class="card-footer">'
                                                +'<div class="d-flex justify-content-between align-items-center">'
                                                    +'<div class="btn-group">'
                                                        +'<button type="button" class="btn btn-sm btn-outline-custom" id="'+item[index].product_id+'" onclick="cartAdd(this.id)">Buy</button>'
                                                        +'<button type="button" class="btn-2 btn-sm btn-outline-custom" id="'+item[index].product_id+'" onclick="viewItem(this.id)">View</button>'
                                                    +'</div>'
                                                    +'<small class="text-muted price" id="view_price">$'+item[index].price+'</small>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>';

                document.getElementById(element).innerHTML += newHTML;
            };

//add item to cart
function cartAdd(prodID){
    for(let i = 0; i <= tempProdData.length; i++){
        let curItem = tempProdData[i];
        let curItemID = tempProdData[i].product_id;
        if(curItemID === prodID){
            cart.push(curItem);
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
}

//remove item from cart
function cartRemove(ID){
    cart.splice(ID, 1);
    
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
}

//closes session, logging the current user out
function getCart(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'php/cart.php?query=getCart');
    xhr.send(null);
    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                let result = JSON.parse(this.responseText);
                cart = result;
                console.log(cart);
                for(let i = 0; i <= cart.length; i++){
                    document.getElementById("cartInventory").innerHTML += "<p>"+cart[i].name+"</p><button onclick=\"cartRemove("+i+")\">Remove</button><br/>";
                }
                } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
                }
            }
    };
};

//runs when item view button press
function viewItem(item){
    let submittedEntry = {
        searchInput: item,
        request_name: "viewItem"
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/viewProduct.php');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(submittedEntry));

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                //save json response to vue data
                    searchresult = JSON.parse(this.responseText);
                    document.location.href = "product.html";
                };
                
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            }
        };
    };

//search for item that was clicked on
function startSearch(item){
    let submittedEntry = {
        searchInput: item,
        request_name: "searchDataRetrieve"
    };
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/productSearch.php');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(submittedEntry));

    xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
            if (xhr.status === OK) {
                //save json response to vue data
                    searchresult = JSON.parse(this.responseText);
                    document.location.href = "product.html";
                };
                
            } else {
                console.log('Error: ' + xhr.status); // An error occurred during the request.
            };
        };
    };