let tempProdData = [];
let cart = [];
let searchresult = [];

fetchData();
getCart();
//DONE
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
//DONE
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
//DONE
//adds product HTML to page
function prodHTML(index, item = tempProdData, element = "prodCard"){
    if(element == "viewItem"){
        let newHTML =   '<div class="row p-2 bg-white border rounded">'
                            +'<div class="col-md-12 mt-1"><img class="img-fluid img-responsive rounded product-image" src="images/'+item[index].img_url+'"></div>'
                            +'<div class="col-md-12 mt-1">'
                                +'<h2>'+item[index].name+'</h2>'
                                +'<p class="text-justify text-truncate para mb-0">'+item[index].description+'<br><br></p>'
                            +'</div>'
                            +'<div class="align-items-center align-content-center col-md-12 border-left mt-1">'
                                +'<div class="d-flex flex-row align-items-center">'
                                    +'<h4 class="mr-1">$'+item[index].price+'</h4>'
                                +'</div>'
                                +'<h6 class="text-success">Free shipping</h6>'
                                +'<div class="d-flex flex-column mt-4"><button class="btn btn-primary btn-sm" type="button" id="'+item[index].product_id+'" onclick="cartAdd(this.id)">Add to Cart</button>'
                                +'<button class="btn btn-outline-primary btn-sm mt-2" type="button" id="'+item[index].product_id+'" onclick="viewItem(this.id)">View Item</button></div>'
                            +'</div>'
                        +'</div>';

        document.getElementById(element).innerHTML += newHTML;
    }else{
        let newHTML =   '<div class="row p-2 bg-white border rounded">'
                            +'<div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src="images/'+item[index].img_url+'"></div>'
                            +'<div class="col-md-6 mt-1">'
                                +'<h5>'+item[index].name+'</h5>'
                                +'<p class="text-justify text-truncate para mb-0">'+item[index].description+'<br><br></p>'
                            +'</div>'
                            +'<div class="align-items-center align-content-center col-md-3 border-left mt-1">'
                                +'<div class="d-flex flex-row align-items-center">'
                                    +'<h4 class="mr-1">$'+item[index].price+'</h4>'
                                +'</div>'
                                +'<h6 class="text-success">Free shipping</h6>'
                                +'<div class="d-flex flex-column mt-4"><button class="btn btn-primary btn-sm" type="button" id="'+item[index].product_id+'" onclick="cartAdd(this.id)">Add to Cart</button>'
                                +'<button class="btn btn-outline-primary btn-sm mt-2" type="button" id="'+item[index].product_id+'" onclick="viewItem(this.id)">View Item</button></div>'
                            +'</div>'
                        +'</div>';

        document.getElementById(element).innerHTML += newHTML;
    }       
};
//DONE
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

//gets the cart content from the server
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
                cart.price = 0;
                console.log(cart);
                for(let i = 0; i <= cart.length; i++){
                    let newPrice = cart.price + + cart[i].price;
                    cart.price = newPrice;
                    document.getElementById("cartInventory").innerHTML +=   '<li class="list-group-item d-flex justify-content-between lh-condensed">'
                                                                                    +'<div>'
                                                                                        +'<h6 class="my-0">'+cart[i].name+'</h6>'
                                                                                        +'<small class="text-muted">'+cart[i].description+'</small>'
                                                                                    +'</div>'
                                                                                    +'<span class="text-muted">$'+cart[i].price+'</span>'
                                                                                    +'<a href="" onclick="cartRemove('+i+')">Remove</a>'
                                                                              +'</li>';
                    document.getElementById("finalTotal").innerHTML = "$"+cart.price;
                    document.getElementById("cartAmount").innerHTML = cart.length;
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
    
function stringSearch(){
    searchString = document.getElementById("searchbar").value;
    startSearch(searchString);
    window.alert("yes");
}
document.getElementById("searchButton").addEventListener("click", function(){
    searchString = document.getElementById("searchbar").value;
    startSearch(searchString);
    window.alert("yes");
});