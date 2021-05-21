let vue_fashion = new Vue({
    el: '#vue_container',
    
    data: {
        products:[]
    }
});

//I dont know how i did it. But it works
fetch("php/getProducts.php/products")
.then((response)=>{
    return response.json();
}).then((data)=>{
    vue_fashion.products = data;
});