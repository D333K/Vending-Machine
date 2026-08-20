// Variables Scoope:

// Containers.
const product_container = document.querySelector(".product-container");
const footer_container = document.querySelector("footer");
const money_machine = document.querySelector(".money-machine-style");
const product_list_content = document.createElement("div");
const info_buy = document.querySelector(".info-buy-style");
const message_box = document.querySelector(".message-box");



// Input Elements.
const product_name = document.getElementById("product-name");
const product_quantity = document.getElementById("product-quantity");
const product_price = document.getElementById("product-price");
const final_price = document.getElementById("final-price");
const money_display = document.getElementById("money-disply");

// Button Elements.
const buy_btn = document.getElementById("buy-btn");
const ok_btn = document.getElementById("ok-btn");
const backspace_btn = document.getElementById("backspace-btn");
const ok_message_btn = document.getElementById("ok-message");

const message = document.querySelector("h3");

// Products Information List.
let products = [
    {

        id: 0,
        name: "Water",
        price: 50,
        quantity: 100,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Juice",
        price: 75,
        quantity: 8,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Chocolate",
        price: 100,
        quantity: 5,
        state: false,
        product_btn: document.createElement("button"),

    },
    {

        id: 0,
        name: "Chips",
        price: 150,
        quantity: 7,
        state: false,
        product_btn: document.createElement("button"),

    }

];

// Normal Variables.
let quantity_left = 0;
let total_money = 0;
let arr_products_info = [
    {
    
        "productID": 0,
        "quantityToken": 0,
        "finalPrice": 0,
        "state": true,
    
    },
    {}
];

// Preparing The Products Part
products.forEach((pro, index) => {

    pro.id = index + 1;
    pro.product_btn.innerText = `${pro.id}: ${pro.name} ${pro.quantity} $${pro.price}`;
    
    pro.product_btn.classList.add("pro-btn-style");
    
    product_list_content.appendChild(pro.product_btn);
    product_list_content.classList.add("pro-list-content");
    
    info_buy.before(product_list_content);

});

// Click Money Number Event
function click_number(number){

    money_display.value += number;

}

// OK Event
ok_btn.addEventListener("click", () => {

    total_money = Number(money_display.value.slice(1));
    money_display.value = '$';

});

// Backspace Event
backspace_btn.addEventListener("click", () => {

    let arr_backspace = [];

    for(let counter = 0; counter < money_display.value.length; counter++){

        if(money_display.value[counter] == '$'){

            continue;

        }else{

            arr_backspace.push(money_display.value[counter]);

        }

    }

    arr_backspace.pop();
    money_display.value = `$${arr_backspace.join('')}`;
    
    if(arr_backspace[0] == null){
    
        money_display.value = '$';
    
    }

});

ok_message_btn.addEventListener("click", () => {

    footer_container.style.filter = "blur(0px)";
    money_machine.style.filter = "blur(0px)";
    product_container.style.filter = "blur(0px)";

    message_box.style.display = "none";

});

// Products List Event
// Working Abt That Tomorrow Inshallah You Will Find The Solution🤲.
products.forEach((product) => {

    product.product_btn.addEventListener("click", () => {

        arr_products_info[1]["productID"] = product.id;

        if(arr_products_info[0]["productID"] == product.id){

            if(product.quantity > arr_products_info[0]["quantityToken"]){

                arr_products_info[0]["quantityToken"]++;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product.price;

                product_name.value = `Product: ${product.name}`;
                product_quantity.value = `Quantity: ${arr_products_info[0]["quantityToken"]}`;

                product_price.value = `Price: $${product.price}`;
                final_price.value = `Final Peice: $${arr_products_info[0]["finalPrice"]}`;

            }else{

                message_box.style.display = "flex";
                message.innerText = `The Quantity Of ${product.name} Is Zero:(\nCome Back Later:)`;

            }
        
        }else if(arr_products_info[0]["productID"] != product.id){

            arr_products_info[0]["quantityToken"] = 0;

            arr_products_info[0]["productID"] = arr_products_info[1]["productID"];

            if(product.quantity >= arr_products_info[0]["quantityToken"]){
                
                arr_products_info[0]["quantityToken"]++;
                arr_products_info[0]["finalPrice"] = arr_products_info[0]["quantityToken"] * product.price;

                product_name.value = `Product: ${product.name}`;
                product_quantity.value = `Quantity: ${arr_products_info[0]["quantityToken"]}`;

                product_price.value = `Price: $${product.price}`;
                final_price.value = `Final Peice: $${arr_products_info[0]["finalPrice"]}`;

            }else{

                message_box.style.display = "flex";
                message.innerText = `The Quantity Of ${product.name} Is Zero:(\nCome Back Later:)`;

            }

        }
        
    });
    
});

// Buy Event
buy_btn.addEventListener("click", () => {
    
    products.forEach((product, index) => {

        if(product.id == arr_products_info[0]["productID"]){

            if(total_money >= arr_products_info[0]["finalPrice"]){

                product_name.value = `Product: `;
                product_quantity.value = `Quantity: 0`;
            
                product_price.value = `Price: $0`;
                final_price.value = `Final Peice: $0`;
                
                quantity_left = product.quantity - arr_products_info[0]["quantityToken"];
                product.product_btn.innerText = `${product.id}: ${product.name} ${quantity_left} $${product.price}`;
                
                if(total_money > arr_products_info[0]["finalPrice"]){
            
                    message_box.style.display = "flex";

                    footer_container.style.filter = "blur(5px)";
                    money_machine.style.filter = "blur(5px)";
                    product_container.style.filter = "blur(5px)";

                    message.innerText = `You Have $${total_money - arr_products_info[0]["finalPrice"]} Left \nThank You For Using Our Machine:)`;
                
                }else{
                 
                    message_box.style.display = "flex";

                    footer_container.style.filter = "blur(5px)";
                    money_machine.style.filter = "blur(5px)";
                    product_container.style.filter = "blur(5px)";

                    message.innerText = `Thank You For Using Our Machine:)`;
                
                }
                    
                total_money = 0;
                
            }else if(total_money < arr_products_info[0]["finalPrice"]){

                footer_container.style.filter = "blur(5px)";
                money_machine.style.filter = "blur(5px)";
                product_container.style.filter = "blur(5px)";
         
                message_box.style.display = "flex";
                message.innerText = `Your Money Is Not Enough To Buy This Product:( \nYou Just Have $${total_money}`;
            
                product_name.value = `Product: `;
                product_quantity.value = `Quantity: 0`;
            
                product_price.value = `Price: $0`;
                final_price.value = `Final Peice: $0`;
            
            }

        }

    });

    arr_products_info[0]["productID"] = 0;
    arr_products_info[0]["quantityToken"] = 0;

});

// Created By Dark Knight:-